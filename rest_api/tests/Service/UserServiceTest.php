<?php

namespace App\Tests\Service;

use App\Entity\User;
use App\Service\UserService;
use PHPUnit\Framework\TestCase;

class UserServiceTest extends TestCase
{
    public function testAddUser()
    {
        $user = new User();

        // Créer un bouchon pour la classe UserService.
        $stub = $this->createMock(UserService::class);

        // // Configurer le bouchon.
        // $stub->method('addUser')
        //     ->willReturn(1);

        $stub->expects($this->once())
            ->method('addUser')
            ->willReturn($this->mockProvider());

        $this->assertEquals(null, $this->addUser());

        // Appeler $stub->addUser() va maintenant retourner true



        // Créer un bouchon pour la classe SomeClass.
        $stub = $this->createMock(SomeClass::class);

        // Configurer le bouchon.
        $stub->method('doSomething')
            ->will($this->returnArgument(0));

        // $stub->doSomething('foo') retourn 'foo'
        $this->assertSame('foo', $stub->doSomething('foo'));

        // $stub->doSomething('bar') returns 'bar'
        $this->assertSame('bar', $stub->doSomething('bar'));
    }
}
