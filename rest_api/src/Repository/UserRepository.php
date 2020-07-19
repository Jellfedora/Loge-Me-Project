<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\Persistence\ManagerRegistry;


class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    // /**
    //  * @return User[] Returns an array of User
    //  */
    public function findByEmail(User $request)
    {
        $email = $request->getEmail();
        $connexion = $this->getEntityManager()
            ->getConnection();

        $sql = "SELECT * FROM user WHERE email = '$email'";

        $request = $connexion->prepare($sql);
        $request->execute();

        return $request->fetchAll();
    }
}
