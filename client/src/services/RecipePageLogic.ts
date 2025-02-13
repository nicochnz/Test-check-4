import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Recipe } from "../types/types";

export const useRecipePageLogic = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=070d351c3e8b449b97fcd87bb52f1c24 `,
      );
      const data = await response.json();
      setRecipe(data);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  return {
    recipe,
    loading,
    error: !recipe && !loading,
  };
};
