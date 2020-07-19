<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TenantRepository")
 *   @UniqueEntity(
 *              fields={"id", "user"},
 *              errorPath="id",
 *              message="Un profil locataire existe déjà pour l\'utilisateur")
 */
class Tenant
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=App\Entity\User::class, cascade={"persist", "remove"})
     */
    private $user;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $tenantSalary;

    /**
     * @ORM\Column(type="integer",nullable=true)
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $guarantorSalary;

    /**
     * @ORM\Column(type="boolean",nullable=false)
     * @Assert\Type(
     *     type="boolean",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $firstLocation;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     *   @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="boolean",nullable=false)
     * @Assert\Type(
     *     type="boolean",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $showOpinion;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     */
    private $modifiedAt;

    public function __construct(User $user)
    {
        $this->createdAt = new \DateTime();
        $this->modifiedAt = new \DateTime();
        $this->user = $user;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTenantSalary(): ?int
    {
        return $this->tenantSalary;
    }

    public function setTenantSalary(?int $tenantSalary): self
    {
        $this->tenantSalary = $tenantSalary;

        return $this;
    }

    public function getGuarantorSalary(): ?int
    {
        return $this->guarantorSalary;
    }

    public function setGuarantorSalary(?int $guarantorSalary): self
    {
        $this->guarantorSalary = $guarantorSalary;

        return $this;
    }

    public function getFirstLocation(): ?bool
    {
        return $this->firstLocation;
    }

    public function setFirstLocation(bool $firstLocation): self
    {
        $this->firstLocation = $firstLocation;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getShowOpinion(): ?bool
    {
        return $this->showOpinion;
    }

    public function setShowOpinion(bool $showOpinion): self
    {
        $this->showOpinion = $showOpinion;

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
     * Get the value of user
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set the value of user
     *
     * @return  self
     */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }
}
