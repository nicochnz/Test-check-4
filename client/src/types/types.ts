import type { Key } from "react";
export type Recipe = {
  id: number;
  name: string;
  description: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  servings: number;
  sourceUrl: string;
  readyInMinutes: number;
  source: "spoonacular" | "user";
};

export type RecipeFormData = {
  title: string;
  image: File | null;
  description: string;
  ingredients: string[];
  instructions: string;
};

export type Ingredient = {
  id: Key | null | undefined;
  name: string;
  quantity: string;
};
