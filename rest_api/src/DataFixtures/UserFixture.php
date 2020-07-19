<?php

namespace App\DataFixtures;

use App\Entity\Tenant;
use App\Entity\User;
use App\Entity\Owner;
use App\Entity\Housing;
use Doctrine\Common\Persistence\ObjectManager;
use App\Service\Tools\RandomIdentifiantService;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixture extends BaseFixture
{
    private $passwordEncoder;
    public function __construct(RandomIdentifiantService $random_identifiant, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->randomIdentifiant = $random_identifiant;
        $this->passwordEncoder = $passwordEncoder;
    }

    protected function loadData(ObjectManager $manager)
    {
        // Jellfedora User
        $admin_user = new User();
        $admin_user->setEmail('jellfedora@gmail.com');
        $admin_user->setPassword($this->passwordEncoder->encodePassword(
            $admin_user,
            '12345678'
        ));
        $admin_user->setRoles(array('ROLE_SUPER_ADMIN'));
        $admin_user->setRandomIdentifiant($this->randomIdentifiant->generate());
        $admin_user->setFirstName('Jell');
        $admin_user->setLastname('Fedora');
        $manager->persist($admin_user);


        // Example Admin_user and Classic User
        // $admin_user = new User();
        // $admin_user->setEmail('admin@attineos.com');
        // $admin_user->setPassword($this->passwordEncoder->encodePassword(
        //     $admin_user,
        //     'admin'
        // ));
        // $admin_user->setRoles(array('ROLE_SUPER_ADMIN'));
        // $admin_user->setRandomIdentifiant($this->randomIdentifiant->generate());
        // $admin_user->setFirstName($this->faker->firstName);
        // $admin_user->setLastname($this->faker->lastName);
        // $manager->persist($admin_user);


        // $classic_user = new User();
        // $classic_user->setEmail('user@attineos.com');
        // $classic_user->setPassword($this->passwordEncoder->encodePassword(
        //     $classic_user,
        //     'user'
        // ));
        // $classic_user->setFirstName($this->faker->firstName);
        // $classic_user->setLastname($this->faker->lastName);
        // $classic_user->setRoles(array('ROLE_USER'));
        // $classic_user->setRandomIdentifiant($this->randomIdentifiant->generate());
        // $manager->persist($classic_user);

        // create 30 users/tenants
        // $this->createMany(30, 'main_users', function ($i) use ($manager) {
        //     // User
        //     $user = new User();
        //     $user->setEmail($this->faker->freeEmail);
        //     $user->setFirstName($this->faker->firstName);
        //     $user->setLastname($this->faker->lastName);
        //     $user->setPassword($this->passwordEncoder->encodePassword(
        //         $user,
        //         'user'
        //     ));
        //     $user->setRandomIdentifiant($this->randomIdentifiant->generate());
        //     $user->setRoles(['ROLE_USER']);
        //     // Tenant
        //     $tenant = new Tenant($user);
        //     $tenant->setTenantSalary($this->faker->biasedNumberBetween($min = 1000, $max = 3500, $function = 'sqrt'));
        //     $tenant->setGuarantorSalary($this->faker->biasedNumberBetween($min = 1000, $max = 3500, $function = 'sqrt'));
        //     $tenant->setFirstLocation($this->faker->boolean($chanceOfGettingTrue = 50));
        //     $tenant->setPhoneNumber($this->faker->phoneNumber);
        //     $tenant->setShowOpinion($this->faker->boolean($chanceOfGettingTrue = 50));
        //     $tenant->setUser($user);
        //     $user->setTenant($tenant);
        //     $manager->persist($tenant);

        //     return $user;
        // });
        // create 30 users/owners
        $this->createMany(30, 'main_users', function ($i) use ($manager) {
            // User
            $user = new User();
            $user->setEmail($this->faker->freeEmail);
            $user->setFirstName($this->faker->firstName);
            $user->setLastname($this->faker->lastName);
            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'user'
            ));
            $user->setRandomIdentifiant($this->randomIdentifiant->generate());
            $user->setRoles(['ROLE_USER']);

            // Owner
            $owner = new Owner($user);
            $owner->setCivilityType($this->faker->numberBetween($min = 1, $max = 2));
            $owner->setSiret($this->faker->siret());
            $owner->setSocialReason($this->faker->lexify('SAS ???'));
            $owner->setBillingAdress('35 Rue des compotes');
            $owner->setPhone($this->faker->phoneNumber);
            $owner->setPostalCode($this->faker->departmentNumber());
            $owner->setUser($user);
            $manager->persist($owner);

            // Housing
            $housing = new Housing($owner);
            $housing->setArea($this->faker->numberBetween($min = 1, $max = 150));
            $housing->setNumberOfPieces($this->faker->numberBetween($min = 1, $max = 7));
            $housing->setEnergyClass($this->faker->numberBetween($min = 1, $max = 6));
            $housing->setEmissionOfGase($this->faker->numberBetween($min = 1, $max = 6));
            $housing->setMonthlyRent($this->faker->numberBetween($min = 150, $max = 1200));
            $housing->setDescription($this->faker->text($maxNbChars = 200));
            $housing->setLogementType($this->faker->numberBetween($min = 1, $max = 3));
            $housing->setNumberOfBedrooms($this->faker->numberBetween($min = 1, $max = 6));
            $housing->setGeometricCoordinates(["1.46", "43.60"]);
            $housing->setCity($this->faker->city());
            $housing->setCityCode($this->faker->departmentNumber());
            $housing->setStreetName($this->faker->streetName());
            $housing->setRating($this->faker->numberBetween($min = 1, $max = 5));
            $housing->setOwner($owner);
            $manager->persist($housing);

            return $user;
        });
        $manager->flush();
    }
}
