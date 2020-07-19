<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Tenant;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\TenantService;
use App\Service\Exception\ValidatorErrorException;

class TenantController extends DefaultController
{
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/api/tenant/create/{id}", name="create_tenant", methods="POST")
     * params: id de l'utilisateur
     * return: tenant
     */
    public function becomeTenant($id, Request $request, SerializerInterface $serializer, TenantService $tenantService)
    {
        $postData = $request->getContent();

        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);




        if (!$user) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Pas d\'utilisateur connu pour l\'identifiant ' . $id
            );
            return $this->json($data, 401);
        } elseif ($user->getTenant()) { // Si l'utilisateur est deja locataire

            $data['data'] = array(
                'status'  => '401',
                'message' => 'Un profil locataire existe déjà pour l\'utilisateur ' . $id
            );
            return $this->json($data, 401);
        } else {
            // Impossible d'utiliser le deserialize symfony quand entité en OneToOne
            $tenant = new Tenant($user);
            $decode_postdata = json_decode($postData);
            try {
                $tenantService->addTenant($tenant, $decode_postdata, $user);
            } catch (ValidatorErrorException $e) {
                $errors = $e->getErrors();
                // If error
                if (count($errors) > 0) {
                    $data['data'] = array(
                        'status'  => '422',
                        'message' => 'Un ou des champs ne sont pas valides',
                    );

                    foreach ($errors as $error) {
                        $data['message_error'][] = $error->getMessage();
                    }
                    return $this->json($data, 422);
                }
            }
        }

        $data['data'] = array(
            'status'  => '201',
            'message' => 'Compte Locataire créé',
            'user' => $user
        );
        return $this->json($data, 201);
    }

    /**
     * @Route("/api/tenant/edit/{id}", name="edit_tenant", methods="PUT")
     */
    public function editTenant($id, Request $request, SerializerInterface $serializer, TenantService $tenantService)
    {
        $patchData = $request->getContent();
        $patchTenant = $serializer->deserialize($patchData, Tenant::class, 'json');
        var_dump($patchTenant);
        die();
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        if (!$user) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Pas d\'utilisateur connu pour l\'identifiant ' . $id
            );
            return $this->json($data, 401);
        } else { // condition si tenant id ou pas
            try {
                // Try to edit tenant
                $tenant = $user->getTenant();
                $tenantService->editTenant($tenant, $patchTenant);
            } catch (ValidatorErrorException $e) {
                $errors = $e->getErrors();
                // If error
                if (count($errors) > 0) {
                    $data['data'] = array(
                        'status'  => '422',
                        'message' => 'Un ou des champs ne sont pas valides',
                    );
                    // $result['errors'] = [];
                    foreach ($errors as $error) {
                        $data['message_error'][] = $error->getMessage();
                    }
                    return $this->json($data, 422);
                }
            }
        }
        $data['data'] = array(
            'status'  => '201',
            'message' => 'Locataire modifié',
            // 'id' => $user->getId(),
            // 'email' => $user->getEmail(),
            // 'roles' => $user->getRoles(),
            // 'randomIdentifiant' => $user->getRandomIdentifiant(),
            // 'firstname' => $user->getFirstname(),
            // 'lastname' => $user->getLastname(),
            // 'createdAt' => $user->getCreatedAt(),
            // 'modifiedAt' => $user->getModifiedAt(),
        );
        return $this->json($data, 201);
    }
}
