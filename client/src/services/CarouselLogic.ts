import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Recipe {
  id: number;
  title: string;
  image: string;
  sourceUrl: string;
}

export const useCarouselLogic = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [_, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/random?number=5&apiKey=f35c2233c4be4cc6b222f6cfec191abd",
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.recipes) {
          setRecipes(data.recipes);
        } else {
          console.error("No recipes found in the response.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  const goToNext = () => {
    setImgIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const goToPrev = () => {
    setImgIndex((prevIndex) =>
      prevIndex === 0 ? recipes.length - 1 : prevIndex - 1,
    );
  };

  return {
    imgIndex,
    recipes,
    goToNext,
    goToPrev,
    handleRecipeClick,
  };
};
