<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Tenant;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\UserService;
use App\Service\Exception\ValidatorErrorException;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Repository\UserRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;


use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;



/**
 * User controller.
 */
class UserController extends AbstractFOSRestController
{
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("user/create", name="create_user", methods="POST")
     */
    public function createUser(Request $request, SerializerInterface $serializer, UserService $userService, MailerInterface $mailer)
    {
        $postData = $request->getContent();
        $user = $serializer->deserialize($postData, User::class, 'json');

        try {
            // Try to save user
            $userService->addUser($user);
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

        // Envoi un mail à l'utilisateur pour confirmer l'inscription
        // $userEmail = $user->getEmail();
        // $email = (new Email())
        //     ->from('loge-me-support@gmail.com')
        //     ->to($userEmail)
        //     ->subject('Inscription sur Loge Me confirmée')
        //     ->text('Hello ' . $user->getFirstname() . ' ' . $user->getLastname() . ', vous etes bien inscrit sur Loge Me!');

        // $mailer->send($email);
        $data['data'] = array(
            'status'  => '201',
            'message' => 'Utilisateur créé',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
                'randomIdentifiant' => $user->getRandomIdentifiant(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastname(),
                'createdAt' => $user->getCreatedAt(),
                'modifiedAt' => $user->getModifiedAt(),
            ]
        );
        return $this->json($data, 201);
    }

    /**
     * @Route("/api/user/get/{id}", name="get_user", methods="GET")
     */
    public function getUserById($id)
    {
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        if (!$user) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Pas d\'utilisateur connu pour l\'identifiant ' . $id
            );
            return $this->json($data, 401);
        } else {
            $data['data'] = array(
                'status'  => '201',
                'message' => 'Informations sur l\'utilisateur ' . $id . ' récupéré',
                'user' => $user,
            );
            return $this->json($data, 201);
        }
    }

    /**
     * Lists all users.
     * @Rest\Get("/user/get_all", name="_get_users")
     * 
     * @return Response
     */
    public function getAllUsers()
    {
        // Interdit si non admin
        // $this->denyAccessUnlessGranted('ROLE_SUPER_ADMIN');

        // On récupére les utilisateurs
        $users = $this->getDoctrine()
            // TODO utiliser le repository pour enlever le password de la réponse
            // ->getRepository(UserEntityRepository::findAll());
            ->getRepository(User::class)
            ->findAll();

        if (!$users) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Aucun utilisateur enregistré'
            );
            return $this->json($data, 401);
        } else {
            $data['data'] = array(
                'status'  => '201',
                'message' => 'Informations utilisateurs récupérées',
                'users' => $users
            );
            return $this->json($data, 201);
        }
    }

    /**
     * @Route("/api/user/edit/{id}", name="edit_user", methods="PUT")
     */
    public function editUser($id, Request $request, SerializerInterface $serializer, UserService $userService)
    {
        $patchData = $request->getContent();
        $patchUser = $serializer->deserialize($patchData, User::class, 'json');

        // On récupére l'utilisateur
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        // Si null 
        if (!$user) {
            $data['data'] = array(
                'status'  => '401',
                'message' => 'Pas d\'utilisateur connu pour l\'identifiant ' . $id
            );
            return $this->json($data, 404);
        }

        try {
            // Try to edit user
            $userService->editUser($user, $patchUser);
        } catch (ValidatorErrorException $e) {
            $errors = $e->getErrors();
            // If error
            if ($errors == true) {
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
        $data['data'] = array(
            'status'  => '201',
            'message' => 'Utilisateur modifié',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
                'randomIdentifiant' => $user->getRandomIdentifiant(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastname(),
                'createdAt' => $user->getCreatedAt(),
                'modifiedAt' => $user->getModifiedAt(),
            ]
        );
        return $this->json($data, 201);
    }

    /**
     * @Route("/api/user/delete/{id}", name="delete_user", methods="DELETE")
     */
    public function deleteUser($id, UserService $userService)
    {
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
            $tenant_id = $user->getTenant();
            $userService->deleteUser($user, $tenant_id);

            $data['data'] = array(
                'status'  => '201',
                'message' => 'Utilisateur supprimé'
            );

            return $this->json($data, 201);
        }
    }

    /**
     * @Route("/user/passwordForgot", name="password_forgot", methods="POST")
     */
    public function passwordForgot(Request $request, SerializerInterface $serializer, MailerInterface $mailer, UserService $userService)
    {
        $data['data'] = array(
            'status'  => '200',
            'message' => 'Service Temporairement indisponible'
        );
        return $this->json($data, 201);
        // $datas = $request->getContent();
        // $deserializeDatas = $serializer->deserialize($datas, User::class, 'json');

        // $user = $this->userRepository->findByEmail($deserializeDatas); //Requête sql

        // if (!$user) {
        //     $data['data'] = array(
        //         'status'  => '401',
        //         'message' => 'Pas d\'utilisateur pour l\'email: ' . $deserializeDatas->getEmail()
        //     );
        //     return $this->json($data, 401);
        // }

        // $user = $this->getDoctrine()
        //     ->getRepository(User::class)
        //     ->find($user[0]['id']);

        // // Générer le nouveau mot de passe
        // $newPassword = $userService->newPassword($user);

        // $userEmail = $deserializeDatas->getEmail();

        // // Envoi un mail à l'utilisateur avec le nouveau password
        // $email = (new Email())
        //     ->from('loge-me-support@gmail.com')
        //     ->to($userEmail)
        //     ->subject('Loge Me Support: Votre nouveau mot de passe')
        //     ->text('Voici votre nouveau mot de passe: ' . $newPassword . ', penser à le changer une fois de nouveau connecté!');
        // // ->html('Utiliser un template twig pour mettre l'email en forme); //TODO

        // $mailer->send($email);

        // $data['data'] = array(
        //     'status'  => '200',
        //     'message' => 'Email de récupération envoyé à ' . $deserializeDatas->getEmail()
        // );
        // return $this->json($data, 201);
    }
}
