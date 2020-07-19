<?php

/**
 * Service Layer (Business layer)
 * Couche supplémentaire qui mutualise le code redondant
 */

namespace App\Service;

use App\Controller\DefaultController;
use App\Entity\User;
use App\Entity\Tenant;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Exception\ValidatorErrorException;
use App\Service\Tools\RandomIdentifiantService;
use App\Service\Tools\PasswordService;
use App\Service\Tools\ValidatorService;

class UserService extends DefaultController
{
    private $validator;
    private $entityManager;

    public function __construct(ValidatorService $validator, EntityManagerInterface $entityManager, RandomIdentifiantService $random_identifiant, PasswordService $password)
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
        $this->randomIdentifiant = $random_identifiant;
        $this->password = $password;
    }

    /**
     * @param User $user
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If user saved
     */
    public function addUser(User $user)
    {
        $password = $user->getPassword();
        $password_encode = $this->password->encode($password);
        $user->setPassword($password_encode);

        // Generate random_id 
        $user->setRandomIdentifiant($this->randomIdentifiant->generate());

        // On valide les champs
        $this->validator->validate($user);
        $this->save($user);

        return true;
    }

    /**
     * @param User $user, $patchData
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If user edited
     */
    public function editUser(User $user, $patchData)
    {
        // Firstname
        $firstname = $patchData->getFirstname();
        if ($firstname) {
            $user->setFirstname($firstname);
        }

        // Lastname
        $lastname = $patchData->getLastname();
        if ($lastname) {
            $user->setLastname($lastname);
        }
        // Password
        $password = $patchData->getPassword();
        if ($password) {
            $user->setPassword($password);
        }
        // Email
        $email = $patchData->getEmail();
        if ($email) {
            $user->setEmail($email);
        }

        $random_identifiant = $patchData->getRandomIdentifiant();
        if ($random_identifiant) {
            $user->setRandomIdentifiant($random_identifiant);
        }



        // On valide les champs
        $this->validator->validate($user);

        // Si le password a passé les erreurs on l'encode avant de le save
        if ($password) {
            $user->setPassword($this->password->encode($password));
        }

        $this->save($user);

        return true;
    }

    /**
     * @param User $user
     * 
     * @return true If user deleted
     */
    public function deleteUser(User $user, Tenant $tenant_id = null)
    {
        $user->setTenant(null);
        $this->save($user);
        $this->entityManager->remove($user);

        // Suppression de la fiche locataire associé
        if ($tenant_id != null) {
            $tenant_id->setUser(null);
            $this->entityManager->remove($tenant_id);
        }
        $this->entityManager->flush();
        return true;
    }

    /**
     * @param User $user
     * 
     * @return true If password is good
     */
    public function verifyPassword(User $user, $deserializeDatas)
    {
        $verifyPassword = $this->password->verify($deserializeDatas->getPassword(), $user->getPassword());

        if ($verifyPassword) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param User $user
     * 
     * @return string The new password
     */
    public function newPassword(User $user)
    {
        // Génére un password aléatoire
        $password = $this->password->randomPassword();

        $user->setPassword($this->password->encode($password));

        // On sauvegarde l'entité
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $password;
    }

    /**
     * @param User $user
     */
    public function save(User $user)
    {

        // On sauvegarde l'entité
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
