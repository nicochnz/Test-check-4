import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "../types/types";
export const useHomePageLogic = () => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=c5f23b5005084a988447182e2f2140bd`,
      );
      const data = await response.json();

      if (response.ok) {
        setRecipes(data.results);
      } else {
        setError("Aucune recette trouvée.");
      }
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = (recipe: Recipe) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.some((fav: Recipe) => fav.id === recipe.id)) {
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  return {
    query,
    setQuery,
    recipes,
    setRecipes,
    loading,
    setLoading,
    error,
    setError,
    navigate,
    handleSearch,
    handleAddToFavorites,
  };
};
