<?php

/**
 * Service Layer (Business layer)
 * Couche supplémentaire qui mutualise le code redondant
 */

namespace App\Service;

use App\Controller\DefaultController;
use App\Entity\Tenant;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\Exception\ValidatorErrorException;

class TenantService extends DefaultController
{
    private $validator;
    private $entityManager;

    public function __construct(ValidatorInterface $validator, EntityManagerInterface $entityManager)
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
    }

    /**
     * @param Tenant $tenant
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If tenant saved
     */
    public function addTenant(Tenant $tenant, $decode_postdata, $user)
    {
        $errors = $this->validator->validate($tenant);

        $tenant->setGuarantorSalary($decode_postdata->guarantorSalary);
        $tenant->setTenantSalary($decode_postdata->tenantSalary);
        $tenant->setFirstLocation($decode_postdata->firstLocation);
        $tenant->setPhoneNumber($decode_postdata->phoneNumber);
        $tenant->setShowOpinion($decode_postdata->showOpinion);

        if (count($errors) > 0) {
            // Levons une exception personnalisée
            $e = new ValidatorErrorException();
            $e->setErrors($errors);
            throw $e;
        }

        $this->save($tenant);

        // Enregistrement User
        $user->setTenant($tenant);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return true;
    }

    /**
     * @param Tenant $tenant, $patchData
     * 
     * @throws ValidatorErrorException If validation fails
     * @return true If tenant edited
     */
    public function editTenant(Tenant $tenant, $patchData)
    {
        $errors = $this->validator->validate($tenant);

        var_dump($tenant);
        var_dump($patchData);
        die();
        // Firstname
        // $firstname = $patchData->getFirstname();
        // if ($firstname) {
        //     $user->setFirstname($firstname);
        // }

        // // Lastname
        // $lastname = $patchData->getLastname();
        // if ($lastname) {
        //     $user->setLastname($lastname);
        // }
        // // Password
        // $password = $patchData->getPassword();
        // if ($password) {
        //     $user->setPassword($password);
        // }
        // // Email
        // $email = $patchData->getEmail();
        // if ($email) {
        //     $user->setEmail($email);
        // }

        $errors = $this->validator->validate($tenant);

        if (count($errors) > 0) {
            // Levons une exception personnalisée
            $e = new ValidatorErrorException();
            $e->setErrors($errors);
            throw $e;
        }

        // Si le password a passé les erreurs on l'encode avant de le save
        // if ($password) {
        //     $user->setPassword($this->password->encode($password));
        // }

        $this->save($tenant);

        return true;
    }

    /**
     * @param Tenant $tenant
     */
    public function save(Tenant $tenant)
    {

        // On sauvegarde l'entité
        $this->entityManager->persist($tenant);
        $this->entityManager->flush();
    }
}
