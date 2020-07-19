<?php

namespace App\Controller;

use App\Entity\Housing;
use App\Entity\Owner;
use App\Service\HousingService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Exception\ValidatorErrorException;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Entity\Product;
use App\Repository\HousingRepository;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use App\Service\FileUploader;

class HousingController extends AbstractFOSRestController
{
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/api/housing/create/{id}", name="create_housing", methods="POST")
     * params: id de owner
     * return: owner
     */
    public function addLogement($id, HousingService $housingService, Request $request, SerializerInterface $serializer)
    {
        $owner = $this->getDoctrine()
            ->getRepository(Owner::class)
            ->find($id);

        $postData = $request->getContent();
        $housing = $serializer->deserialize($postData, Housing::class, 'json');

        if (!$owner) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Pas de propriétaire connu pour l\'identifiant ' . $id
            );
            return $this->json($data, 401);
        } else {
            $housingService->addHousing($housing, $owner);
            $data['data'] = array(
                'status'  => '201',
                'message' => 'Nouveau Logement créé',
                'housing' => $housing
            );
            return $this->json($data, 201);
        }
    }

    /**
     * @Route("housing/lastApartments", name="last-", methods="GET")
     * params: none
     * return: 4 last apartments
     */
    // TODO Pour chaque requete selectionner les datas à retourner
    public function getLastApartments()
    {
        $apartments = $this->getDoctrine()
            ->getRepository(Housing::class)
            ->findBy(
                ['logementType' => 1],
                array('createdAt' => 'desc'),
                1
            );

        $houses = $this->getDoctrine()
            ->getRepository(Housing::class)
            ->findBy(
                ['logementType' => 2],
                array('createdAt' => 'desc'),
                1
            );

        $grounds = $this->getDoctrine()
            ->getRepository(Housing::class)
            ->findBy(
                ['logementType' => 3],
                array('createdAt' => 'desc'),
                1
            );

        // if (!$housings) {
        //     $data['data'] = array(
        //         'status'  => '418 I’m a teapot',
        //         'message' => 'Aucun Logement trouvés'
        //     );
        //     return $this->json($data, 418);
        // } else {
        $data['data'] = array(
            'status'  => '200',
            'message' => 'Derniers appartements ajoutés',
            'apartments' => $apartments,
            'houses' => $houses,
            'grounds' => $grounds
        );
        return $this->json($data, 200);
        // }
    }

    /**
     * @Route("housing/lastHouses", name="last-houses", methods="GET")
     * params: none
     * return: 4 last houses
     */
    public function getLastHouses()
    {
        $housings = $this->getDoctrine()
            ->getRepository(Housing::class)
            ->findBy(
                ['logementType' => 2],
                array('createdAt' => 'desc'),
                2
            );

        if (!$housings) {
            $data['data'] = array(
                'status'  => '418 I’m a teapot',
                'message' => 'Aucun Logement trouvés'
            );
            return $this->json($data, 418);
        } else {
            $data['data'] = array(
                'status'  => '200',
                'message' => 'Derniéres Maisons ajoutés',
                'housings' => $housings
            );
            return $this->json($data, 200);
        }
    }

    /**
     * @Route("housing/lastGrounds", name="last-grounds", methods="GET")
     * params: none
     * return: 4 last grounds
     */
    public function getLastGrounds()
    {
        $housings = $this->getDoctrine()
            ->getRepository(Housing::class)
            ->findBy(
                ['logementType' => 3],
                array('createdAt' => 'desc'),
                2
            );

        if (!$housings) {
            $data['data'] = array(
                'status'  => '418 I’m a teapot',
                'message' => 'Aucun Logement trouvés'
            );
            return $this->json($data, 418);
        } else {
            $data['data'] = array(
                'status'  => '200',
                'message' => 'Derniers Terrains ajoutés',
                'housings' => $housings
            );
            return $this->json($data, 200);
        }
    }

    /**
     * @Route("housing/get/{id}", name="get_housing", methods="GET")
     */
    public function getHousingById($id)
    {
        $housing = $this->getDoctrine()
            ->getRepository(Housing::class)
            ->find($id);


        if (!$housing) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Pas de logement répertorié pour l\'identifiant ' . $id
            );
            return $this->json($data, 401);
        } else {
            $data['data'] = array(
                'status'  => '201',
                'message' => 'Informations sur le logement ' . $id . ' récupéré',
                'housing' => $housing,
            );
            return $this->json($data, 201);
        }
    }

    /**
     * @Route("housing/gethousings/{maxRent}/{logementType}/{area}/{cityCode}", name="get_housings", methods="GET")
     */
    public function getHousings($maxRent, $logementType, $area, $cityCode, HousingRepository $housingRepository)
    {
        if ($cityCode == 0) {
            $data['data'] = array(
                'status'  => '204',
                'message' => 'Il vous faut choisir une ville'
            );
            return $this->json($data, 204);
        } else {
            $searchHousings = $housingRepository->searchHousingsWithSql($maxRent, $logementType, $area, $cityCode);
            if (empty($searchHousings)) {
                $data['data'] = array(
                    'status'  => '204',
                    'message' => 'Aucun logement trouvé'
                );
            } else {
                $data['data'] = array(
                    'status'  => '200',
                    'message' => 'Logement trouvés',
                    'searchHousings' => $searchHousings
                );
            }
            return $this->json($data, 200);
        }
    }

    /**
     * @Route("housing/uploadImages/{housingId}", name="upload_images", methods="POST")
     */
    public function uploadImages(Request $request, $housingId, HousingService $housingService)
    {
        $housing = $this->getDoctrine()
            ->getRepository(Housing::class)
            ->find($housingId);

        if (!$housing) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Pas de logement connu pour l\'identifiant ' . $housingId
            );
            return $this->json($data, 401);
        } else {
            $save_images = $housingService->addHousingImages($request, $housing);
            if ($save_images == true) {
                $data['data'] = array(
                    'status'  => '201',
                    'message' => 'Images enregistrées'
                );
            } else {
                $data['data'] = array(
                    'status'  => '500',
                    'message' => 'Une erreur est arrivée lors de la sauvegarde de vos photos, veuillez réessayez plus tard.'
                );
            }
            return $this->json($data, 201);
        }
    }
}
