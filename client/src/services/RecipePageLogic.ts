import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Recipe } from "../types/types";

export const useRecipePageLogic = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=f35c2233c4be4cc6b222f6cfec191abd`,
        );
        if (!response.ok) {
          throw new Error("Recette non trouvée");
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return {
    recipe,
    loading,
    error,
  };
};
