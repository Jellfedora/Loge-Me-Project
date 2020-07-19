<?php

/**
 * Service Layer (Business layer)
 * Couche supplémentaire qui mutualise le code redondant
 */

namespace App\Service;

use App\Controller\DefaultController;
use App\Entity\Owner;
use App\Entity\Housing;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Exception\ValidatorErrorException;
use App\Repository\HousingRepository;

class HousingService extends DefaultController
{
    private $validator;
    private $entityManager;

    public function __construct(ValidatorInterface $validator, EntityManagerInterface $entityManager)
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
    }

    /**
     * @param Housing $housing
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If housing saved
     */
    public function addHousing(Housing $housing, Owner $owner)
    {
        $housing->setOwner($owner);
        $housing->setRating(0);

        // On valide les champs
        $this->validator->validate($housing);
        $this->save($housing);

        return true;
    }

    /**
     * @param Housing $housing
     */
    public function addHousingImages($request, Housing $housing)
    {
        $housingId = $housing->getId();

        $file = $request->files->all();
        $status = array('status' => "500", "fileUploaded" => false);
        $file = $file['file'];

        // If a file was uploaded
        if (!is_null($file)) {
            foreach ($file as $key => $value) {
                // generate a random name for the file but keep the extension
                $filename = "housing_" . $housingId . "_images_" . uniqid() . "." . $value->getClientOriginalExtension();
                $path = "../../../loge-me-uploads/housings/" . $housingId;
                $value->move($path, $filename); // move the file to a path

                $imagesNames = array();
                if ($housing->getImages() !== null) {
                    array_push($imagesNames, $housing->getImages());
                    array_push($imagesNames, $filename);
                } else {
                    array_push($imagesNames, $filename);
                }

                $housing->setImages($imagesNames);
            }

            $this->save($housing);
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param Housing $housing
     */
    public function save(Housing $housing)
    {

        // On sauvegarde l'entité
        $this->entityManager->persist($housing);
        $this->entityManager->flush();
    }
}
