import { useEffect, useState } from "react";
import "./CarouselRecipes.css";
import { useNavigate } from "react-router-dom";

interface Recipe {
  id: number;
  title: string;
  image: string;
  sourceUrl: string;
}

export default function CarouselRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const navigate = useNavigate();
  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`); // Utilise navigate pour aller à la page de recette
  };
  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/random?number=5&apiKey=c5f23b5005084a988447182e2f2140bd",
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes))
      .catch((error) =>
        console.error("Erreur lors de la récupération des recettes", error),
      );
  }, []);

  const goToNext = () => {
    setImgIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const goToPrev = () => {
    setImgIndex((prevIndex) =>
      prevIndex === 0 ? recipes.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="carouselContainer">
      <h2 className="title">Recettes aléatoires</h2>

      <div className="carousel-content">
        {recipes.length > 0 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              className="carousel-button prev"
            >
              {"<"}
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
                onClick={() => handleRecipeClick(recipes[imgIndex].id)} // Utilise la fonction handleRecipeClick
                className="button"
              >
                Voir la recette
              </button>
            </div>

            <button
              type="button"
              onClick={goToNext}
              className="carousel-button next"
            >
              {">"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
