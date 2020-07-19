<?php

namespace App\Controller;

use App\Entity\Owner;
use App\Entity\User;
use App\Service\OwnerService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\Exception\ValidatorErrorException;

class OwnerController extends DefaultController
{
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/api/owner/create/{id}", name="create_owner", methods="POST")
     * params: id de l'utilisateur
     * return: owner
     */
    public function becomeOwner($id, OwnerService $ownerService, Request $request, SerializerInterface $serializer)
    {
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        $postData = $request->getContent();
        $owner = $serializer->deserialize($postData, Owner::class, 'json');
        // TEST
        // $data['data'] = array(
        //     'status'  => '201',
        //     'message' => 'Compte Propriétaire créé',
        //     'user' => $user,
        //     'owner' => $owner
        // );
        // return $this->json($data, 201);
        // TEST

        if (!$user) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Pas d\'utilisateur connu pour l\'identifiant ' . $id
            );
            return $this->json($data, 401);
        } else {
            // Impossible d'utiliser le deserialize symfony quand entité en OneToOne
            // $owner = new Owner($user);
            // var_dump($owner);
            // die();
            $ownerService->addOwner($owner, $user);
            $data['data'] = array(
                'status'  => '201',
                'message' => 'Compte Propriétaire créé',
                'user' => $user
            );
            return $this->json($data, 201);
        }
    }
}
