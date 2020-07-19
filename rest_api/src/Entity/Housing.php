<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\HousingRepository")
 *   @UniqueEntity(
 *              fields={"geometricCoordinates"},
 *              errorPath="geometricCoordinates",
 *              message="Il existe déjà une annonce pour un logement situé à cette adresse")
 */
class Housing
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer",nullable=false)
     * @Assert\NotBlank(message="Ce champ est requis.")
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $logementType;

    /**
     * @ORM\Column(type="integer",nullable=false)
     * @Assert\NotBlank(message="Ce champ est requis.")
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $area;

    /**
     * @ORM\Column(type="integer",nullable=true)
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $numberOfPieces;

    /**
     * @ORM\Column(type="integer",nullable=true)
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $numberOfBedrooms;

    /**
     * @ORM\Column(type="integer",nullable=true)
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $energyClass;

    /**
     * @ORM\Column(type="integer",nullable=true)
     * @Assert\Type(
     *     type="integer",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $emissionOfGase;

    /**
     * @ORM\Column(type="float",nullable=false)
     * @Assert\NotBlank(message="Ce champ est requis.")
     * @Assert\Type(
     *     type="float",
     *     message="Cette valeur {{ value }} n'est pas un {{ type }}."
     * )
     */
    private $monthlyRent;

    /**
     * @ORM\Column(type="text", length=65535, nullable=false)
     * @Assert\NotBlank(message="Ce champ est requis.")
     * @Assert\Length(
     *      min = 100,
     *      max = 65535,
     *      minMessage = "Cette description est trop courte, elle doit faire au minimum {{ limit }} caractéres",
     *      maxMessage = "Cette description est trop longue, elle doit faire au maximum {{ limit }} caractéres"
     * )
     */
    private $description;

    /**
     * @ORM\Column(type="json",nullable=false)
     * @Assert\NotBlank(message="Ce champ est requis.")
     */
    private $geometricCoordinates = [];

    /**
     * @ORM\Column(type="string", length=50, nullable=false)
     * @Assert\NotBlank(message="Ce champ est requis.")
     */
    private $city;

    /**
     * @ORM\Column(type="integer",nullable=false)
     * @Assert\NotBlank(message="Ce champ est requis.")
     */
    private $cityCode;

    /**
     * @ORM\Column(type="string", length=50, nullable=false)
     * @Assert\NotBlank(message="Ce champ est requis.")
     */
    private $streetName;

    /**
     * @ORM\Column(type="integer",nullable=false,options={"default" : 0})
     * @Assert\Length(
     *      min = 1,
     *      max = 5,
     *      minMessage = "La note doit être de {{ limit }} caractéres au minimum",
     *      maxMessage = "La note doit être de {{ limit }} caractéres au maximum"
     * )
     */
    private $rating;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     */
    private $modifiedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Owner", inversedBy="housings",cascade={"remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $owner;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $images = [];

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->modifiedAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getArea(): ?int
    {
        return $this->area;
    }

    public function setArea(int $area): self
    {
        $this->area = $area;

        return $this;
    }

    public function getNumberOfPieces(): ?int
    {
        return $this->numberOfPieces;
    }

    public function setNumberOfPieces(int $numberOfPieces): self
    {
        $this->numberOfPieces = $numberOfPieces;

        return $this;
    }

    public function getEnergyClass(): ?string
    {
        return $this->energyClass;
    }

    public function setEnergyClass(string $energyClass): self
    {
        $this->energyClass = $energyClass;

        return $this;
    }

    public function getEmissionOfGase(): ?string
    {
        return $this->emissionOfGase;
    }

    public function setEmissionOfGase(string $emissionOfGase): self
    {
        $this->emissionOfGase = $emissionOfGase;

        return $this;
    }

    public function getMonthlyRent(): ?float
    {
        return $this->monthlyRent;
    }

    public function setMonthlyRent(float $monthlyRent): self
    {
        $this->monthlyRent = $monthlyRent;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get type="integer",
     */
    public function getLogementType()
    {
        return $this->logementType;
    }

    /**
     * Set type="integer",
     *
     * @return  self
     */
    public function setLogementType($logementType)
    {
        $this->logementType = $logementType;

        return $this;
    }

    /**
     * Get type="integer",
     */
    public function getNumberOfBedrooms()
    {
        return $this->numberOfBedrooms;
    }

    /**
     * Set type="integer",
     *
     * @return  self
     */
    public function setNumberOfBedrooms($numberOfBedrooms)
    {
        $this->numberOfBedrooms = $numberOfBedrooms;

        return $this;
    }

    /**
     * Get the value of geometricCoordinates
     */
    public function getGeometricCoordinates(): array
    {
        return $this->geometricCoordinates;
    }

    /**
     * Set the value of geometricCoordinates
     *
     * @return  self
     */
    public function setGeometricCoordinates(array $geometricCoordinates): self
    {
        $this->geometricCoordinates = $geometricCoordinates;

        return $this;
    }

    /**
     * Get the value of city
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set the value of city
     *
     * @return  self
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get the value of cityCode
     */
    public function getCityCode()
    {
        return $this->cityCode;
    }

    /**
     * Set the value of cityCode
     *
     * @return  self
     */
    public function setCityCode($cityCode)
    {
        $this->cityCode = $cityCode;

        return $this;
    }

    /**
     * Get the value of streetName
     */
    public function getStreetName()
    {
        return $this->streetName;
    }

    /**
     * Set the value of streetName
     *
     * @return  self
     */
    public function setStreetName($streetName)
    {
        $this->streetName = $streetName;

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


    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getOwner(): ?Owner
    {
        return $this->owner;
    }

    public function setOwner(?Owner $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getImages(): ?array
    {
        return $this->images;
    }

    public function setImages(?array $images): self
    {
        $this->images = $images;

        return $this;
    }
}
