<?php

/**
 * Tools
 * Generate a random identifiant for user
 */

namespace App\Service\Tools;

class RandomIdentifiantService
{
    public function generate()
    {
        // Combine random adjectives + random number + random songs for a unique identifiant
        $adjectives = ('Absolu Admirable Agréable Aimable Amusant Apocalyptique Approximatif Attachant Banal Bas Bavarois Bien Bof Bon Bouleversant Boute-en-train Captivant Caractériel Cataclysmique Catastrophique Céleste Charmant Chef-d’œuvre Chouette Commun convenable Convivial Coquet Correct Crédible Croquante Cynique Dégueulasse Délectable Délicieuse Disjoncté Divin Douce Doué Drôle Éblouissant Ébouriffé Efficace Emballant Émouvant Endiablé Ennuyant Enragé Enthousiasmant Épatant Époustouflant Épouvantable Équitable Exaltant Exceptionnel Excusable Exemplaire Extra-moelleux Féru Festif Flamboyante Formidable Grandiose Hardi Honnête Horrible Important Impressionnant Inconnu Incrédule Indépendant Infernal Innommable Insignifiant Insuffisant Insupportable Intenable Intéressant Irrésistible Libidineux Louable Majestueux Magistral Magnifique Médiocre Merdique Merveilleux Mignon Minable Mirobolante Mortel
Moyen Négligeable Nul Ordinaire Original Parfait Passable Passionnant Percutant Persévérant Phénoménal Placide Plaisant Prestant Prodigieux Proverbial Quelconque Ravissant Recyclé Relatif Remarquable Renversant Revendicatrice Révolutionnaire Rocambolesque Rutilant Saint Satisfaisant Séduisant Sexy Somptueux Spiritueux Splendide Suave Sublime Sulfureuse Superbe Suprême Supportable Talentueux Tolérable Tragique Trépidant Troublant Valable Valeureux Vénérable Vitaminés Vivable Vulgaire');
        $adjectives_array = explode(" ", $adjectives);
        $random_adjective = $adjectives_array[rand(0, 139)];

        $songs = ('Sonne Du-Hast Mutter Ich-Will Amerika Mein-Teil Ohne-DIch Links-2-3-4 Rosenrot Deutshland Radio Halloman Weig-Weg');
        $songs_array = explode(" ", $songs);
        $random_song = $songs_array[rand(0, 12)];

        $random_id = $random_adjective . rand(1, 1999) . $random_song;

        return $random_id;
    }
}
