import { useEffect, useState } from "react";
import type { Key } from "react";
import { useNavigate } from "react-router-dom";

type Ingredient = {
  id: Key | null | undefined;
  name: string;
  quantity: string;
};
type Category = {
  id: string;
  name: string;
};
export const useRecipeFormLogic = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    category: "",
    ingredients: [{ name: "", quantity: "" }] as Ingredient[],
    image: null as File | null,
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/categories");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleIngredientChange = (
    index: number,
    name: string,
    value: string,
  ) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [name]: value };
    setFormData((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { id: null, name: "", quantity: "" }],
    }));
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files?.[0] ?? null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const USER_ID = "1";
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("instructions", formData.instructions);
    formDataToSend.append("cooking_time", "30");
    formDataToSend.append("servings", "4");
    formDataToSend.append("user_id", USER_ID);

    formData.ingredients.forEach((ingredient, index) => {
      formDataToSend.append(`ingredients[${index}][name]`, ingredient.name);
      formDataToSend.append(
        `ingredients[${index}][quantity]`,
        ingredient.quantity,
      );
    });

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:3310/api/recipes", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      alert("Recette créée avec succès !");
      navigate(`/recipe/${data.recipeId}`);
    } catch (error) {
      console.error("Erreur détaillée:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue",
      );
    }
  };

  return {
    handleChange,
    handleImageChange,
    handleIngredientChange,
    addIngredient,
    removeIngredient,
    handleSubmit,
    formData,
    categories,
  };
};
