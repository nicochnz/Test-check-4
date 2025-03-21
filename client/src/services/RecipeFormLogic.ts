import { useState } from "react";
import type { Ingredient } from "../types/types";
// type Category = {
//   id: string;
//   name: string;
// };
export const useRecipeFormLogic = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    category: "",
    ingredients: [{ name: "", quantity: "" }] as Ingredient[],
    image: null as File | null,
  });

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

  // const [categories, setCategories] = useState<Category[]>([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3310/api/categories");
  //       if (!response.ok) {
  //         throw new Error("Erreur lors de la récupération des catégories");
  //       }
  //       const data = await response.json();
  //       setCategories(data);
  //     } catch (error) {
  //       console.error("Erreur:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);
  const handleIngredientChange = (
    index: number,
    name: string,
    value: string,
  ) => {
    if (name === "quantity") {
      if (!/^\d*$/.test(value)) {
        alert("Veuillez entrer uniquement des chiffres pour la quantité");
        return;
      }
    }
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
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert(
          "Veuillez sélectionner uniquement des images au format JPEG ou PNG",
        );
        e.target.value = "";
        return;
      }
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };
  const showSuccessPopup = (message: string) => {
    const popup = document.querySelector(".success-popup");
    if (popup) {
      popup.textContent = message;
      popup.classList.add("show");
      setTimeout(() => {
        popup.classList.remove("show");
      }, 2000);
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

      await response.json();
      showSuccessPopup("Recette créée avec succès !");
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
    // categories,
  };
};
