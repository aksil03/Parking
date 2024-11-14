Bounif Aksil

Aymane Benammar

Romaric Santos

Groupe MTS3

Epic 1 : Initialisation du projet

       User Story 1 : je démarre un projet Hono en typescript sous une structure MVC

       User Story 2 : je créer un dépot Git local et créer des commits a chaque avancé

Epic 2 : Implémentation des fonctions

       User Story 1 : je crée des fonction toSlug et generateRandomNumberId

       User Story 2 : je créer des tests pour ces meme fonctions en essayant de prendre en compte le plus de cas dans lesquels mon code pourrais avoir des erreurs

Epic 2 : Implémentations des classes et de la database

       User Story 1 : je crée les differentes classes  et la database utile a mon code

       User Story 2 : Aprés avoir créer les differentes classes je fait attention a tous les détails et génere les erreurs associée ( vérifier que les nombres soit positif par exemple)

Epic 3 : vérification de mon code

       User Story 1 : j'utilise l'index pour créer une route me permettant d'avoir accees aux données de mes villes et parking que je déploye en JSON

      
Epic 4 : Mise en place de la page principale 

       User Story 1 : Je creer la page du HomeController suivant le modele du template fournis

       User Story 2 : Je creer la route associée qui est la racine du localhost et par la meme occasion la redirection vers le sroutes cities et parking qui sotn pour l'instant indéfinis


Epic 5 : Mise en place des views

       User Story 1 : Création du layout

       User Story 2 : Création d'une view par page qui est utilisée par les controllers ayant besoin de leurs view

       User Story 3 : Pour l'instant nous utilisons la base de données importer via les controllers en attendant de trouver une methodes pour l'utiliser dans l'index

       User Story 4 : Leger probleme lors de la création des filtres, on décide donc d'opter pour une séparation du coté serveur et client pour faire fonctionner nos fonctions

       User Story 5 : Modification du layout afin d'y ajouter une feuille CSS car nous avions des probleme d'affichage quand nous utilisions le css directement dans la view

Epic 6 : Mise en place des sous routes et leurs view

       User Story 1 : Création des routes associées a cities et parkings pour afficher les elements uniques

       User Story 2 : Création de leurs view et associassions via leurs controlleurs ainsi que par leurs view parent pour une redirection vers le slug et l'id

Epic 7 : Gestion des erreurs 

       User Story 1 :utilisation de trailling slash pour eviter les erreurs du a un '/' en trop

       User Story 2 : Pris en charge des Erreurs 404 et sa view associée ainsi que la mise en place de l'erreur 500 pour les erreurs interne

Epic 8 : Amelioration du Code

       User Story 1 : déplacement de l'utililisation de la BDD dans l'index comme voulu dans l'énoncé grace a la création de nouveaux types

       User Story 2 : Amélioration de certaines view en apellant a la fois la table cities et parking afin de récuperer le nom du parking et ne pas mettre l'id, ce qui est plus simple pour l'experience utilisateur
      
Epic 9 : Création de la bdd sqlite
 
       User Story 1 :création du fichier contenant les tables de la bdd qui servira uniquement a la création

Epic 10 : Adaptation du code

       User Story 1 : Modification des classes afin d'utiliser les classes comme de simple moule qui n'ont plus pour but de manipuler les données

       User Story 2 : Legere modification de certaines view pour s'adapter a la nouvelle structure des controller

       User Story 3 : modification de l'index car utilisation de la bdd uniquement dans les controller

       User Story 4 : modification des controller afin d'utiliser la bdd sqlite via les requete SQL

Epic 11 : Bonus

       User Story 1 : La partie bonus du projet concernant l'ajout de certaines option et ayant deja ajouter de notre propre initative certaines option qui sont similaire a celles demandé nous vous les présentons ainsi : 

       1. Trie des parkings par tarifs
       2. Affichage des parkings ouvert
       3. Systeme d'authentification permettant aux administrateur d'ajouter des villes ou des parkings de maniere sécurisé chaque colonnes des tableau est assuréments renseigné

       Ces differentes option ne sont pas exactement celle demandé dans le TD mais puisque nous avions pris l'initiative de les faires avant meme la conaissance du TD nous vous les présentons ainsi, elles se rapproche des fonctionnalité E07 et E08 qui cumule 8 points de difficulté