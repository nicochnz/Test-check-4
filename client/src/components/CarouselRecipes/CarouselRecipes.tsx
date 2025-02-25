import "./CarouselRecipes.css";
import { useCarouselLogic } from "../../services/CarouselLogic";

export default function CarouselRecipes() {
  const { visibleRecipes, handleRecipeClick } = useCarouselLogic();

  return (
    <div className="carouselContainer">
      <h2 className="title">Random Meals</h2>

      <div className="carousel-content">
        <div className="carousel-cards">
          {visibleRecipes.map((recipe) => (
            <div key={recipe.id} className="carousel-card">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="carousel-image"
              />
              <h3 className="recipeTitle">{recipe.title}</h3>
              <button
                type="button"
                onClick={() => handleRecipeClick(recipe.id)}
                className="card-button"
              >
                Show recipe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
