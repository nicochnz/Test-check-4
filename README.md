Ce projet est une application web permettant de rechercher des recettes à partir d'une API et d'ajouter ses recettes ainsi qu'ajouter ses préférées aux favoris. L'application est développée en React avec TypeScript et utilise React Router pour la navigation.


API utilisée : API Spoonacular pour récupérer les recettes

Lancer l'application :
npm run dev

US 1 - Recherche de recettes
En tant qu'utilisateur,
je veux pouvoir rechercher une recette en entrant un nom de recette ou un ingrédient
afin de trouver des plats correspondant à mes envies.

Un champ de recherche est disponible sur la page d'accueil.
L'utilisateur peut taper un nom de recette ou un ingrédient.
Une liste de recettes correspondantes s'affiche après validation de la recherche.

US 2 - Ajouter une recette aux favoris
En tant qu'utilisateur,
je veux pouvoir ajouter une recette à mes favoris
afin de retrouver facilement mes plats préférés.

Un bouton "Ajouter aux favoris" est présent sur chaque recette.
Cliquer sur ce bouton ajoute la recette à la liste des favoris.

US 3 - Consulter les détails d'une recette
En tant qu'utilisateur,
je veux pouvoir consulter les détails d'une recette
afin de voir les ingrédients et les étapes de préparation.

L'utilisateur peut cliquer sur une recette pour accéder à sa page détaillée.
La page affiche le titre, l’image, la description, la liste des ingrédients et les instructions.
Deux boutons sont disponibles :
"Retour à l'accueil" pour revenir à la page de recherche.
"Voir mes favoris" pour accéder à la liste des recettes favorites.

US 4 - Accéder à mes recettes favorites
En tant qu'utilisateur,
je veux pouvoir accéder à la liste de mes recettes favorites
afin de retrouver et consulter facilement mes plats préférés.

Une page "Favoris" est accessible depuis l'accueil et la page recette.
La page affiche toutes les recettes mises en favoris.
Chaque recette peut être cliquée pour afficher ses détails.
Un bouton "Retour à l'accueil" permet de revenir à la recherche.

US 5 - Créer une recette personnalisée
En tant qu'utilisateur,
je veux pouvoir créer ma propre recette en ajoutant un titre, une image, une description et les étapes de préparation
afin d’enregistrer et partager mes créations culinaires.
Une page "Création" est accessible depuis l’accueil.
L’utilisateur peut ajouter :
Un titre
Une image
Une description
Une liste d’ingrédients
Les instructions de préparation
Un bouton "Enregistrer" permet d’ajouter la recette à la base de données.
Un message de confirmation s'affiche après l'ajout.
