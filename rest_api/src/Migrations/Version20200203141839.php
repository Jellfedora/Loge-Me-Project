<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200203141839 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE tenant (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, tenant_salary INT DEFAULT NULL, guarantor_salary INT DEFAULT NULL, first_location TINYINT(1) NOT NULL, phone_number VARCHAR(50) DEFAULT NULL, show_opinion TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, modified_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_4E59C462A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE housing (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, logement_type INT NOT NULL, area INT NOT NULL, number_of_pieces INT DEFAULT NULL, number_of_bedrooms INT DEFAULT NULL, energy_class INT DEFAULT NULL, emission_of_gase INT DEFAULT NULL, monthly_rent DOUBLE PRECISION NOT NULL, description VARCHAR(255) NOT NULL, geometric_coordinates JSON NOT NULL, city VARCHAR(50) NOT NULL, city_code INT NOT NULL, street_name VARCHAR(50) NOT NULL, rating INT DEFAULT 0 NOT NULL, created_at DATETIME NOT NULL, modified_at DATETIME NOT NULL, INDEX IDX_FB8142C37E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, tenant_id INT DEFAULT NULL, owner_id INT DEFAULT NULL, email VARCHAR(255) NOT NULL, random_identifiant VARCHAR(50) NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(50) DEFAULT NULL, lastname VARCHAR(50) DEFAULT NULL, created_at DATETIME NOT NULL, modified_at DATETIME NOT NULL, roles JSON NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D649F19F0BE5 (random_identifiant), UNIQUE INDEX UNIQ_8D93D6499033212A (tenant_id), UNIQUE INDEX UNIQ_8D93D6497E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE owner (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, civility_type INT DEFAULT NULL, siret VARCHAR(50) NOT NULL, social_reason VARCHAR(50) NOT NULL, phone INT NOT NULL, postal_code INT NOT NULL, billing_adress VARCHAR(50) NOT NULL, UNIQUE INDEX UNIQ_CF60E67CA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE owners_tenants (owner_id INT NOT NULL, tenants_id INT NOT NULL, INDEX IDX_BE91BFB27E3C61F9 (owner_id), INDEX IDX_BE91BFB23C5A47D2 (tenants_id), PRIMARY KEY(owner_id, tenants_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE tenant ADD CONSTRAINT FK_4E59C462A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE housing ADD CONSTRAINT FK_FB8142C37E3C61F9 FOREIGN KEY (owner_id) REFERENCES owner (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6499033212A FOREIGN KEY (tenant_id) REFERENCES tenant (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6497E3C61F9 FOREIGN KEY (owner_id) REFERENCES owner (id)');
        $this->addSql('ALTER TABLE owner ADD CONSTRAINT FK_CF60E67CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE owners_tenants ADD CONSTRAINT FK_BE91BFB27E3C61F9 FOREIGN KEY (owner_id) REFERENCES owner (id)');
        $this->addSql('ALTER TABLE owners_tenants ADD CONSTRAINT FK_BE91BFB23C5A47D2 FOREIGN KEY (tenants_id) REFERENCES tenant (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6499033212A');
        $this->addSql('ALTER TABLE owners_tenants DROP FOREIGN KEY FK_BE91BFB23C5A47D2');
        $this->addSql('ALTER TABLE tenant DROP FOREIGN KEY FK_4E59C462A76ED395');
        $this->addSql('ALTER TABLE owner DROP FOREIGN KEY FK_CF60E67CA76ED395');
        $this->addSql('ALTER TABLE housing DROP FOREIGN KEY FK_FB8142C37E3C61F9');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6497E3C61F9');
        $this->addSql('ALTER TABLE owners_tenants DROP FOREIGN KEY FK_BE91BFB27E3C61F9');
        $this->addSql('DROP TABLE tenant');
        $this->addSql('DROP TABLE housing');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE owner');
        $this->addSql('DROP TABLE owners_tenants');
    }
}
