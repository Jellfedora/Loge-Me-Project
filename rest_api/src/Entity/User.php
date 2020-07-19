<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Repository\UserRepository;

/**
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Entity()
 * @UniqueEntity(
 *              fields={"email"},
 *              errorPath="email",
 *              message="Cette adresse e-mail est déjà utilisée.")
 */

class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\Email(
     *     message = "'{{ value }}' n'est pas une adresse email valide.",
     *     checkMX = true
     * )
     * @Assert\NotBlank(message="Votre adresse E-mail est requise pour créer un compte.")
     * @Assert\Email
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     */
    private $randomIdentifiant;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(
     *      min = 7,
     *      max = 100,
     *      minMessage = "Votre mot de passe doit faire au moins {{ limit }} caractéres",
     *      maxMessage = "Votre mot de passe ne doit pas dépasser {{ limit }} caractéres"
     * )
     * @Assert\NotBlank(message="Un mot de passe est requis pour créer un compte.")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Assert\NotBlank(message="Ce champ est requis.")
     * @Assert\Length(
     *      min = 2,
     *      max = 50,
     *      minMessage = "Votre prénom doit faire au moins {{ limit }} caractéres",
     *      maxMessage = "Votre prénom ne doit pas dépasser {{ limit }} caractéres"
     * )
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Assert\NotBlank(message="Ce champ est requis.")
     * @Assert\Length(
     *      min = 2,
     *      max = 50,
     *      minMessage = "Votre nom de famille doit faire au moins {{ limit }} caractéres",
     *      maxMessage = "Votre nom de famille ne doit pas dépasser {{ limit }} caractéres"
     * )
     */
    private $lastname;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     */
    private $modifiedAt;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @ORM\OneToOne(targetEntity=App\Entity\Tenant::class, inversedBy="user", cascade={"persist", "remove"})
     */
    private $tenant;

    /**
     * @ORM\OneToOne(targetEntity=App\Entity\Owner::class, inversedBy="user", cascade={"persist", "remove"})
     */
    private $owner;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->modifiedAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getRandomIdentifiant(): ?string
    {
        return $this->randomIdentifiant;
    }

    public function setRandomIdentifiant(string $randomIdentifiant): self
    {
        $this->randomIdentifiant = $randomIdentifiant;
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }
    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;
        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getModifiedAt(): ?\DateTimeInterface
    {
        return $this->modifiedAt;
    }

    public function setModifiedAt(\DateTimeInterface $modifiedAt): self
    {
        $this->modifiedAt = $modifiedAt;
        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';
        return array_unique($roles);
    }
    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        return null;
    }
    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        return null;
    }

    /**
     * Set the value of tenant
     *
     * @return  self
     */
    public function setTenant($tenant)
    {
        $this->tenant = $tenant;

        return $this;
    }

    /**
     * Get the value of tenant
     */
    public function getTenant()
    {
        return $this->tenant;
    }

    /**
     * Get the value of owner
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * Set the value of owner
     *
     * @return  self
     */
    public function setOwner($owner)
    {
        $this->owner = $owner;

        return $this;
    }
}
