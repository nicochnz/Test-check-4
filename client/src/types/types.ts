export type Recipe = {
  id: number;
  name: string;
  description: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  servings: number;
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
