import "./CarouselRecipes.css";
import { useCarouselLogic } from "../../services/CarouselLogic";
export default function CarouselRecipes() {
  const { recipes, imgIndex, goToNext, goToPrev, handleRecipeClick } =
    useCarouselLogic();
  return (
    <div className="carouselContainer">
      <h2 className="title">Random meal</h2>

      <div className="carousel-content">
        {recipes.length > 0 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              className="carousel-button prev"
            >
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="carousel-image-container">
              <img
                src={recipes[imgIndex].image}
                alt={recipes[imgIndex].title}
                className="carousel-image"
              />
              <h3 className="recipeTitle">{recipes[imgIndex].title}</h3>
              <button
                type="button"
                onClick={() => handleRecipeClick(recipes[imgIndex].id)}
                className="button"
              >
                Show recipe
              </button>
            </div>

            <button
              type="button"
              onClick={goToNext}
              className="carousel-button next"
            >
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
