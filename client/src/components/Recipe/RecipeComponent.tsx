import DOMPurify from "dompurify";
import { useRecipePageLogic } from "../../services/RecipePageLogic";
import "./Recipe.css";
import { useNavigate } from "react-router-dom";

export default function Recipes() {
  const { recipe } = useRecipePageLogic();
  const navigate = useNavigate();

  if (!recipe) {
    return <div className="loading">Loading...</div>;
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
    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    if (!favorites.some((fav: any) => fav.id === recipe.id)) {
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      showFavPopup();
    }
  };

  return (
    <section className="recipe-section">
      <h1 className="recipe-title">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h2 className="recipe-instructions-title">Instruction :</h2>
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
      <p
        className="recipe-instructions"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(recipe.instructions),
        }}
      ></p>
      <h3 className="recipe-cooking-time">
        Cooking time: {recipe.readyInMinutes} minutes
      </h3>

      <button
        className="show-recipe-button"
        type="button"
        onClick={handleAddRecipeToFavorites}
      >
        Add to Favorites
      </button>

      <button
        className="show-recipe-button"
        type="button"
        onClick={() => navigate("/")}
      >
        Return home
      </button>

      {/* Popup de confirmation */}
      <div className="fav-popup">Added to Favorites!</div>
    </section>
  );
}
