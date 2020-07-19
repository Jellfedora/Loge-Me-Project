<?php

namespace App\Repository;

use App\Entity\Housing;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Housing|null find($id, $lockMode = null, $lockVersion = null)
 * @method Housing|null findOneBy(array $criteria, array $orderBy = null)
 * @method Housing[]    findAll()
 * @method Housing[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HousingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Housing::class);
    }

    public function searchHousingsWithSql($maxRent, $logementType, $area, $cityCode)
    {
        // Loyer Max Prix max fixé à 100000 si aucune valeur donnée
        if ($maxRent == 0) {
            $maxRent = 100000;
        }
        // Type de logement
        if ($logementType == 0) {
            $logementTypeCHoiceOne = 1;
            $logementTypeCHoiceTwo = 2;
        } else {
            $logementTypeCHoiceOne = $logementType;
            $logementTypeCHoiceTwo = 0;
        }
        // Surface tel quel
        // Type de logement obligatoirement définit ici

        // On prepare la requete
        $stmt = $this->getEntityManager()->getConnection()->prepare("SELECT * FROM `housing` WHERE `logement_type` IN (?,?) AND `area`>= ? AND `monthly_rent` <= ? AND `city_code` = ?");

        // On éxécute la requete
        $stmt->execute([$logementTypeCHoiceOne, $logementTypeCHoiceTwo, $area, $maxRent, $cityCode]);

        // On récupére le résultat
        $searchHousings = $stmt->fetchAll();

        // On renvoie les informations nécessaire
        $housingsArray = [];
        foreach ($searchHousings as $key => $value) {
            $housingsArray[$key] = array(
                'id'  => $value['id'],
                'logementType' => $value['logement_type'],
                'area' => $value['area'],
                'numberOfPieces' => $value['number_of_pieces'],
                'numberOfBedrooms' => $value['number_of_bedrooms'],
                'monthlyRent' => $value['monthly_rent'],
                'description' => $value['description'],
                'city' => $value['city'],
                'cityCode' => $value['city_code'],
                'rating' => $value['rating'],
                'ownerId' => $value['owner_id']
            );
        }

        return $housingsArray;
    }
}
