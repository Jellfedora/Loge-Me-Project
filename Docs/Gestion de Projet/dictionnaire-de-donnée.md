# Dictionnaire de données

 ## User
| Nom                | Description                                        | Type        | Commentaire             | Entité |
| ------------------ | -------------------------------------------------- | ----------- | ----------------------- | ------ |
| Email              | Email de l'utilisateur                             | Texte       | -                       | User   |
| RandomIndentifiant | Identifiant aléatoire de l'utilisateur             | Texte       | Texte + chiffre + Texte | User   |
| Password           | Mot de passe de l'utilisateur                      | Type        | -                       | User   |
| Firstname          | Prénom de l'utilisateur                            | Texte court | -                       | User   |
| Lastname           | Nom de l'utilisateur                               | Texte court | -                       | User   |
| PhoneNumber        | Numéro de téléphone de l'utilisateur               | Texte court | -                       | User   |
| CreatedAt          | Date de création de l'utilisateur                  | Date        | -                       | User   |
| ModifiedAt         | Date de modification de l'utilisateur              | Date        | -                       | User   |
| Role               | Rôle de l'utilisateur                              | Texte court | -                       | User   |
| Tenant             | Identifiant primaire Locataire de l'utilisateur    | Entier      | -                       | User   |
| Owner              | Identifiant primaire Propriétaire de l'utilisateur | Entier      | -                       | User   |


 ## Tenant
| Nom             | Description                                               | Type    | Commentaire | Entité |
| --------------- | --------------------------------------------------------- | ------- | ----------- | ------ |
| TenantSalary    | Salaire du locataire                                      | Entier  | -           | Tenant |
| GuarantorSalary | Salaire du garant du locataire                            | Entier  | -           | Tenant |
| FirstLocation   | Si c'est une premiére location pour le locataire          | Booléen | -           | Tenant |
| ShowOpinion     | Si le locataire accepte de montrer les avis le concernant | Booléen | -           | Tenant |
| CreatedAt       | Date de création du locataire                             | Date    | -           | Tenant |
| ModifiedAt      | Date de modification du locataire                         | Date    | -           | Tenant |
| User            | Identifiant primaire User du locataire                    | Entier  | -           | Tenant |
| NumberOfOwners  | Nombre de propriétaires du locataire                      | Entier  | -           | Tenant |

 ## Owner
| Nom              | Description                                                  | Type        | Commentaire | Entité |
| ---------------- | ------------------------------------------------------------ | ----------- | ----------- | ------ |
| CreatedAt        | Date de création du propriétaire                             | Date        | -           | Owner  |
| ModifiedAt       | Date de modification du propriétaire                         | Date        | -           | Owner  |
| Siret            | Numéro de Siret du propriétaire                              | Texte court | 14 chiffres | Owner  |
| ShowOpinion      | Si le propriétaire accepte de montrer les avis le concernant | Booléen     | -           | Owner  |
| User             | Identifiant primaire User du propriétaire                    | Entier      | -           | Owner  |
| NumberOfTenants  | Nombre de locataires du propriétaire                         | Entier      | -           | Owner  |
| NumberOfHousings | Nombre de logements du propriétaire                          | Entier      | -           | Owner  |

 ## Housing
| Nom             | Description                                                | Type        | Commentaire | Entité  |
| --------------- | ---------------------------------------------------------- | ----------- | ----------- | ------- |
| Title           | Titre du logement                                          | Texte court | -           | Housing |
| Description     | Description du logement                                    | Texte long  | -           | Housing |
| Type            | Type de logement                                           | Texte court | -           | Housing |
| Furnished       | Si le logement est meublé                                  | Booléen     | -           | Housing |
| Area            | Surface du logement                                        | Entier      | -           | Housing |
| NumberOfPieces  | Nombre de piéces du logement                               | Entier      | -           | Housing |
| EnergyClass     | Classe Energie du logement                                 | Texte court | -           | Housing |
| EmissionOfGases | Emission de gaz logement                                   | Texte court | -           | Housing |
| AcceptedAnimals | Si les animaux sont acceptés dans le logement              | Booléen     | -           | Housing |
| MonthlyRent     | Loyer du logement                                          | Entier      | -           | Housing |
| CreatedAt       | Date de création du logement                               | Date        | -           | Housing |
| ModifiedAt      | Date de modification du logement                           | Date        | -           | Housing |
| showOpinion     | Si le propriétaire accepte de montrer les avis du logement | Booléen     | -           | Housing |

 ## OwnersTenants
| Nom       | Description                          | Type   | Commentaire | Entité        |
| --------- | ------------------------------------ | ------ | ----------- | ------------- |
| CreatedAt | Date de création de la liaison       | Date   | -           | OwnersTenants |
| OwnerId   | Identifiant primaire du Propriétaire | Entier | -           | OwnersTenants |
| TenantId  | Identifiant primaire du Locataire    | Entier | -           | OwnersTenants |

 ## OwnersHousings
| Nom       | Description                          | Type   | Commentaire | Entité         |
| --------- | ------------------------------------ | ------ | ----------- | -------------- |
| CreatedAt | Date de création de la liaison       | Date   | -           | OwnersHousings |
| OwnerId   | Identifiant primaire du Propriétaire | Entier | -           | OwnersHousings |
| HousingId | Identifiant primaire du Logement     | Entier | -           | OwnersHousings |

 ## TenantsHousings
| Nom       | Description                       | Type   | Commentaire | Entité          |
| --------- | --------------------------------- | ------ | ----------- | --------------- |
| CreatedAt | Date de création de la liaison    | Date   | -           | TenantsHousings |
| TenantId  | Identifiant primaire du Locataire | Entier | -           | TenantsHousings |
| HousingId | Identifiant primaire du Logement  | Entier | -           | TenantsHousings |


