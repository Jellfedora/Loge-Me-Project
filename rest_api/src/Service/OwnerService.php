<?php

/**
 * Service Layer (Business layer)
 * Couche supplémentaire qui mutualise le code redondant
 */

namespace App\Service;

use App\Controller\DefaultController;
use App\Entity\Owner;
use App\Entity\User;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Exception\ValidatorErrorException;

class OwnerService extends DefaultController
{
    private $validator;
    private $entityManager;

    public function __construct(ValidatorInterface $validator, EntityManagerInterface $entityManager)
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
    }

    /**
     * @param Owner $owner
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If owner saved
     */
    public function addOwner(Owner $owner, User $user)
    {
        // Civility Type
        // $civility = $owner->getCivilityType();
        // if ($civility) {
        //     $owner->setCivilityType($civility);
        // }


        // $userId = $user->getId();
        // if ($userId) {
        $owner->setUser($user);
        // }
        // var_dump($owner->getUser());
        // die();


        // On valide les champs
        $this->validator->validate($owner);
        $this->save($owner);


        // Enregistrement User
        $user->setOwner($owner);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return true;
    }

    /**
     * @param Owner $owner
     */
    public function save(Owner $owner)
    {

        // On sauvegarde l'entité
        $this->entityManager->persist($owner);
        $this->entityManager->flush();
    }
}
