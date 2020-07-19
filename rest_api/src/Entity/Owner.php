<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * @ORM\Table(name="owner")
 * @ORM\Entity(repositoryClass="App\Repository\OwnerRepository")
 * @ORM\Entity()
 * @UniqueEntity(
 *              fields={"user"},
 *              errorPath="user",
 *              message="Il y a deja un compte propriétaire associé à cet utilisateur")
 */
class Owner
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
     * Many Owners have Many Tenants.
     * @ORM\ManyToMany(targetEntity="Tenant",cascade={"persist", "remove"})
     * @ORM\JoinTable(name="owners_tenants",
     *      joinColumns={@ORM\JoinColumn(name="owner_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="tenants_id", referencedColumnName="id")}
     *      )
     */
    private $tenant;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     * @Assert\Length(
     *      min = 1,
     *      max = 2,
     *      minMessage = "Une erreur est arrivé, votre civilité est Mr ou Mme",
     *      maxMessage = "Une erreur est arrivé, votre civilité est Mr ou Mme"
     * )
     */
    private $civilityType;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     * @Assert\Length(
     *      min = 14,
     *      max = 14,
     *      minMessage = "Votre numéro de Siret doit comporter {{ limit }} caractéres",
     *      maxMessage = "Votre numéro de Siret doit comporter {{ limit }} caractéres"
     * )
     */
    private $siret;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank(message="Ce champ est requis.")
     * @Assert\Length(
     *      min = 2,
     *      max = 50,
     *      minMessage = "Votre raison sociale doit faire au moins {{ limit }} caractéres",
     *      maxMessage = "Votre raison sociale ne doit pas dépasser {{ limit }} caractéres"
     * )
     */
    private $socialReason;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     * @Assert\Length(min = 8, max = 20, minMessage = "Numéro trop court", maxMessage = "Numéro trop long")
     * @Assert\Regex(pattern="/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/", message="Des nombres seulement") 
     */
    private $phone;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     * @Assert\Length(min = 5, max = 5, minMessage = "Numéro trop court", maxMessage = "Numéro trop long")
     */
    private $postalCode;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank(message="Ce champ est requis.")
     * @Assert\Length(
     *      min = 2,
     *      max = 50,
     *      minMessage = "Votre adresse de facturation doit faire au moins {{ limit }} caractéres",
     *      maxMessage = "Votre adresse de facturation ne doit pas dépasser {{ limit }} caractéres"
     * )
     */
    private $billingAdress;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Housing", mappedBy="owner",cascade={"persist", "remove"})
     */
    private $housings;

    public function __construct()
    {
        $this->tenant = new \Doctrine\Common\Collections\ArrayCollection();
        $this->housings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Get many Owners have Many Tenants.
     */
    public function getTenant()
    {
        return $this->tenant;
    }

    /**
     * Set many Owners have Many Tenants.
     *
     * @return  self
     */
    public function setTenant($tenant)
    {
        $this->tenant = $tenant;

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

    /**
     * Get type="integer",
     */
    public function getCivilityType()
    {
        return $this->civilityType;
    }

    /**
     * Set type="integer",
     *
     * @return  self
     */
    public function setCivilityType($civilityType)
    {
        $this->civilityType = $civilityType;

        return $this;
    }

    /**
     * Get type="integer",
     */
    public function getSiret()
    {
        return $this->siret;
    }

    /**
     * Set type="integer",
     *
     * @return  self
     */
    public function setSiret($siret)
    {
        $this->siret = $siret;

        return $this;
    }

    /**
     * Get min = 2,
     */
    public function getSocialReason()
    {
        return $this->socialReason;
    }

    /**
     * Set min = 2,
     *
     * @return  self
     */
    public function setSocialReason($socialReason)
    {
        $this->socialReason = $socialReason;

        return $this;
    }

    /**
     * Get min = 2,
     */
    public function getBillingAdress()
    {
        return $this->billingAdress;
    }

    /**
     * Set min = 2,
     *
     * @return  self
     */
    public function setBillingAdress($billingAdress)
    {
        $this->billingAdress = $billingAdress;

        return $this;
    }

    /**
     * Get type="integer",
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set type="integer",
     *
     * @return  self
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get type="integer",
     */
    public function getPostalCode()
    {
        return $this->postalCode;
    }

    /**
     * Set type="integer",
     *
     * @return  self
     */
    public function setPostalCode($postalCode)
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    /**
     * @return Collection|Housing[]
     */
    public function getHousings(): Collection
    {
        return $this->housings;
    }

    public function addHousing(Housing $housing): self
    {
        if (!$this->housings->contains($housing)) {
            $this->housings[] = $housing;
            $housing->setOwner($this);
        }

        return $this;
    }

    public function removeHousing(Housing $housing): self
    {
        if ($this->housings->contains($housing)) {
            $this->housings->removeElement($housing);
            // set the owning side to null (unless already changed)
            if ($housing->getOwner() === $this) {
                $housing->setOwner(null);
            }
        }

        return $this;
    }
}
