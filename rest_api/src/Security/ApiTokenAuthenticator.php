<?php

namespace App\Security;

use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class ApiTokenAuthenticator
{

    public function __construct()
    {
    }

    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $expiration = new \DateTime('+1 day');
        $expiration->setTime(2, 0, 0);

        $payload        = $event->getData();
        $payload['exp'] = $expiration->getTimestamp();

        $event->setData($payload);
    }

    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $data['data'] = array(
            'status'  => '200 OK',
            'message' => 'Utilisateur connecté',
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

        $event->setData($data);
    }

    /**
     * @param AuthenticationFailureEvent $event
     */
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
    {
        $data = [
            'status'  => '401 Unauthorized',
            'message' => 'Mauvais identifiants, veuillez vérifier que les champs email et mot de passe soient valides',
        ];

        $response = new JWTAuthenticationFailureResponse($data);

        $event->setResponse($response);
    }

    /**
     * @param JWTNotFoundEvent $event
     */
    public function onJWTNotFound(JWTNotFoundEvent $event)
    {
        $data = [
            'status'  => '403 Forbidden',
            'message' => 'Aucun Token trouvé, il en faut un pour effectuer cette action',
        ];

        $response = new JsonResponse($data, 403);

        $event->setResponse($response);
    }

    /**
     * @param JWTExpiredEvent $event
     */
    public function onJWTExpired(JWTExpiredEvent $event)
    {
        /** @var JWTAuthenticationFailureResponse */
        $response = $event->getResponse();

        $response->setMessage('Votre Token est expiré, veuillez le renouveler');
    }

    // public function start(Request $request, AuthenticationException $authException = null)
    // {
    //     // todo
    // }

    // public function supportsRememberMe()
    // {
    //     // todo
    // }
}
