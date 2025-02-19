import { useHomePageLogic } from "../services/HomePageLogic";
import "./FavoriteComponent.css";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites, setFavorites } = useHomePageLogic();
  const navigate = useNavigate();

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
  };

  const removeFavorite = (index: number) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="favorites-container">
      <section className="favorites-section">
        <h1 className="favorites-title">Favorites</h1>
        <button
          type="button"
          onClick={clearFavorites}
          className="clear-favorites-btn"
        >
          Clear Favorites
        </button>
        <div className="favorites-grid">
          {favorites.length === 0 ? (
            <p className="no-favorites-message">No favorites yet!</p>
          ) : (
            favorites.map((recipe, index) => (
              <div key={index} className="recipe-card-favorite">
                <h3 className="recipe-title">{recipe.title || recipe.name}</h3>
                <img
                  src={
                    recipe.image.startsWith("http")
                      ? recipe.image
                      : `${import.meta.env.VITE_API_URL}/uploads/${recipe.image}`
                  }
                  alt={recipe.title || recipe.name}
                  className="recipe-image"
                />
                <button
                  type="button"
                  onClick={() => handleRecipeClick(recipe.id)}
                  className="button"
                >
                  Show recipe
                </button>
                <button
                  type="button"
                  onClick={() => removeFavorite(index)}
                  className="remove-favorite-button"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
