import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "../types/types";

export const useHomePageLogic = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [favorites, setFavorites] = useState<any[]>([]);
  const [querySpoonacular, setQuerySpoonacular] = useState<string>("");
  const [queryUserRecipes, setQueryUserRecipes] = useState<string>("");
  const [recipesSpoonacular, setRecipesSpoonacular] = useState<Recipe[]>([]);
  const [recipesUser, setRecipesUser] = useState<Recipe[]>([]);
  const [loadingSpoonacular, setLoadingSpoonacular] = useState<boolean>(false);
  const [errorSpoonacular, setErrorSpoonacular] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleAddToFavorites = (recipe: any) => {
    setFavorites((prevFavorites) => [...prevFavorites, recipe]);
  };

  const fetchUserRecipes = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/recipes");
      const data = await response.json();
      if (response.ok) {
        setRecipesUser(data);
      }
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des recettes utilisateurs:",
        err,
      );
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchUserRecipes();
  }, []);

  const handleSearchSpoonacular = async (query: string) => {
    setLoadingSpoonacular(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=f35c2233c4be4cc6b222f6cfec191abd`,
      );
      const data = await response.json();
      if (response.ok) {
        setRecipesSpoonacular(data.results);
      } else {
        setErrorSpoonacular("No results found from Spoonacular.");
      }
    } catch (err) {
      setErrorSpoonacular("Error fetching Spoonacular data.");
    } finally {
      setLoadingSpoonacular(false);
    }
  };

  const handleSearchUserRecipes = (query: string) => {
    const filteredUserRecipes = recipesUser.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()),
    );
    setRecipesSpoonacular(filteredUserRecipes);
  };

  return {
    favorites,
    setFavorites,
    querySpoonacular,
    setQuerySpoonacular,
    recipesSpoonacular,
    loadingSpoonacular,
    errorSpoonacular,
    handleSearchSpoonacular,
    queryUserRecipes,
    setQueryUserRecipes,
    recipesUser,
    handleSearchUserRecipes,
    handleAddToFavorites,
    navigate,
  };
};
