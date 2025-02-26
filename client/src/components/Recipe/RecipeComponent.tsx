import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { useRecipePageLogic } from "../../services/RecipePageLogic";
import "./Recipe.css";

export default function RecipeComponent() {
  const navigate = useNavigate();

  // Utilisation de la logique de recette
  const { recipe, loading, error } = useRecipePageLogic();

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="loading">Recette introuvable.</div>;
  }

  const showFavPopup = () => {
    const popup = document.querySelector(".fav-popup");
    if (popup) {
      popup.classList.add("show");
      setTimeout(() => {
        popup.classList.remove("show");
      }, 2000);
    }
  };

  const handleAddRecipeToFavorites = () => {
    if (!recipe) return;

    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    if (!favorites.some((fav: any) => fav.id === recipe.id)) {
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      showFavPopup();
    }
  };

  return !recipe ? (
    <div className="loading">Recette introuvable.</div>
  ) : (
    <section className="recipe-section">
      <h1 className="recipe-title">{recipe.title || recipe.name}</h1>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title || recipe.name}
          className="recipe-image"
        />
      )}

      {recipe.description && (
        <p className="recipe-description">{recipe.description}</p>
      )}

      {recipe.instructions && (
        <>
          <h2 className="recipe-instructions-title">Instructions :</h2>
          <div className="recipe-instructions">
            {DOMPurify.sanitize(recipe.instructions).replace(/<[^>]*>/g, "")}
          </div>
        </>
      )}

      {recipe.readyInMinutes && (
        <h3 className="recipe-cooking-time">
          Temps de préparation : {recipe.readyInMinutes} minutes
        </h3>
      )}

      <button
        className="show-recipe-button"
        type="button"
        onClick={handleAddRecipeToFavorites}
      >
        Ajouter aux favoris
      </button>

      <button
        className="show-recipe-button"
        type="button"
        onClick={() => navigate("/")}
      >
        Retour à l'accueil
      </button>

      <div className="fav-popup">Ajouté aux favoris !</div>
    </section>
  );
}
