<?php

namespace App\Tests\Entity;

use App\Entity\User;
use App\Entity\Tenant;
use App\Entity\Owner;

use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    //     // User is tenant
    //     $tenant = new Tenant($user);

    //     // Datas Tenant
    //     $dataTenant = array(
    //         "tenantSalary" => 1200,
    //         "guarantySalary" => 1500,
    //         "firstLocation" => true,
    //         "phoneNumber" => '0652364587',
    //         "showOpinion" => false,
    //     );

    //     // Setters
    //     $tenant->setGuarantorSalary($dataTenant["tenantSalary"]);
    //     $tenant->setTenantSalary($dataTenant["guarantySalary"]);
    //     $tenant->setFirstLocation($dataTenant["firstLocation"]);
    //     $tenant->setPhoneNumber($dataTenant["phoneNumber"]);
    //     $tenant->setShowOpinion($dataTenant["showOpinion"]);

    //     // Fields are valids
    //     $this->assertTrue(is_integer($tenant->getGuarantorSalary()), "Ce n'est pas un integer");
    //     $this->assertTrue(is_integer($tenant->getTenantSalary()), "Ce n'est pas un integer");
    //     $this->assertContainsOnly('boolean', [$tenant->getFirstLocation()]);
    //     $this->assertContainsOnly('string', [$tenant->getPhoneNumber()]);
    //     $this->assertLessThanOrEqual(100, strlen($dataTenant["phoneNumber"]), "Trop long");
    //     $this->assertContainsOnly('boolean', [$tenant->getShowOpinion()]);

    //     $user->setTenant($tenant);

    //     $this->assertNotEmpty($user);


    /**
     * Simple User
     */
    public function testUserFirstname()
    {
        $user = new User();
        $user->setFirstname('Paul');
        $this->assertTrue(is_string($user->getFirstname()), "Ce n'est pas une chaine de caractére");
        $this->assertNotNull($user->getFirstname());
    }

    public function testUserLastname()
    {
        $user = new User();
        $user->setLastname('Dupont');
        $this->assertTrue(is_string($user->getLastname()), "Ce n'est pas une chaine de caractére");
        $this->assertNotNull($user->getLastname());
    }

    public function testUserPassword()
    {
        $user = new User();
        $user->setPassword('12345678');
        $this->assertLessThanOrEqual(100, strlen($user->getPassword()), "Trop long");
        $this->assertGreaterThanOrEqual(7, strlen($user->getPassword()), "Trop court");
        $this->assertNotNull($user->getPassword());
    }

    public function testUserRandomIdentifiant()
    {
        $user = new User();
        $user->setRandomIdentifiant('123Youpi456');
        $this->assertTrue(is_string($user->getRandomIdentifiant()), "Ce n'est pas une chaine de caractére");
        $this->assertNotNull($user->getRandomIdentifiant());
    }

    public function testUserEmail()
    {
        $user = new User();
        $user->setEmail('test@live.fr');
        $this->assertRegExp("/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/", $user->getEmail(), "Email non valide");
        $this->assertNotNull($user->getEmail());
    }

    /**
     * User is Tenant
     */
    public function testUserTenant()
    {
        $user = new User();

        $tenant = new Tenant($user);

        $user->setTenant($tenant);

        $this->assertNotNull($user->getTenant());
    }

    /**
     * User is Owner
     */
    public function testUserOwner()
    {
        $user = new User();

        $owner = new Owner($user);

        $user->setOwner($owner);

        $this->assertNotNull($user->getOwner());
    }
}
