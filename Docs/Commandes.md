# Commandes
------------------------------------------

## Démarrer symfony: 
php bin/console server:start

## Créer la database local

Renseigner .env.local avec:
DATABASE_URL=mysql://user:password@127.0.0.1:3306/dbb-name

Executer la commande (dans app):
php bin/console doctrine:database:create -->

## Yarn
Ajouter Yarn à Symfony: yarn add @symfony/webpack-encore --dev
Lancer le watcher: yarn encore dev --watch -->

## Installer Doctrine
composer require symfony/orm-pack
composer require --dev symfony/maker-bundle

## Doctrine
Créer fichier de migration: php bin/console make:migration
Exécuter les migrations: php bin/console doctrine:migrations:migrate
Editer une entity: php bin/console make:entity
Créer le controller associé à une entité: php bin/console make:controller NomDuController

## Fixtures
Charger les jeux de données: php bin/console doctrine:fixtures:load

## Lancer les test unitaires
 ./bin/phpunit

## Récupérer token
avant tout copier 

"
###> lexik/jwt-authentication-bundle ###
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=fedora12pi
###< lexik/jwt-authentication-bundle ###   
"

dans .env.local


http://127.0.0.1:8000/api/login_check

body:

{
"username":"admin@attineos.com",
"password":"admin"
}

response:

{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjY2NDY4MjcsImV4cCI6MTU2NjY1MDQyNywicm9sZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQGF0dGluZW9zLmNvbSJ9.ApSytieITZyrh3CvJZFN7xPfDLoWtuXYfqih_FeY0KX4o-P-csn6ZNXs4UYdZl0Pbi9VKxiu8CdpWnFntLrpZDqFgAoYO1ii1bdF03z0wbsvWJgVtEPS7hA1RShYbYT-VqACbNeAC7JwqaCqTlZNbg62dv61aCTniIpWVNWHPpfarJszZieYH2JYsiNeMlcxpigdLxXZxEgjLahDQ7vcr1AgOmOZ-Wh3ZR3Fs85KkiwfwUneKCINyOl0J0plyKk-RyNP6_sRLmK7EOOT3zdC2kAtEDKLQrcLZwK-gCHpkxKGLYglhUmtikIFzSocL0OUntzQBSGpko7i5RcdY1yAOe4dwQwGQbPiGWxgzJSZjVJO2DAND66_ib2Gqnndmb2u6Si7Aj71qTMGawe1o2Vksr7jQhDhb0cpxJnwoYiW5HWpF6U4vWQLbX2GRYCYpxc3kD4QBSxbbBXJCL_iYCW8KLno2ws6TQaCqPh5Jl8irTCsUq4bVsu4dBWCbazob7ZJLDwkTXggt-Eo4ToXN6FID32cPmIiwEj59sVz6IThXw91VT4FnFTap7RuphcIrJa-AlGeyvSAuzyRwZSR8N-ZoTvXXlSGtcKwtonBFxoAH0E_S7kpyeGdyYoFTlNZA6nbfogoxjpY8j0oByDweTULg9_Sq9cB1tAG9wMMFe9hTc0"
}

copier le token dans https://jwt.io/

récupérer dans config/jwt/public.pem tout le contenu et l'ajouter dans verify signature

Pour effectuer une action en /api

choisir bearer token dans authorization 
et copier le token obtenu dedans

## Déployer en test
dep test