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
  const [currentIndex, _] = useState<number>(0);
  const navigate = useNavigate();

  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/random?number=9&apiKey=f35c2233c4be4cc6b222f6cfec191abd",
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.recipes) {
          setRecipes(data.recipes);
        } else {
          console.error("No recipes found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  const getVisibleRecipes = () => {
    if (recipes.length === 0) return [];
    const leftIndex = (currentIndex - 1 + recipes.length) % recipes.length;
    const centerIndex = currentIndex;
    const rightIndex = (currentIndex + 1) % recipes.length;
    return [recipes[leftIndex], recipes[centerIndex], recipes[rightIndex]];
  };

  const visibleRecipes = getVisibleRecipes();

  return {
    recipes,
    visibleRecipes,
    handleRecipeClick,
  };
};
