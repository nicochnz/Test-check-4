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
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=c5f23b5005084a988447182e2f2140bd`,
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
