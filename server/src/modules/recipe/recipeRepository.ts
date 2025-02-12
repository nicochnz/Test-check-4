import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Recipe = {
  id: number;
  name: string;
  description: string;
  instructions: string;
  cooking_time: number;
  servings: number;
  user_id?: number;
};

type Ingredient = {
  id: number;
  name: string;
  quantity: number;
};

class RecipeRepository {
  async create(
    recipe: Omit<Recipe, "id">,
    ingredients: Omit<Ingredient, "id">[],
  ) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      // Insertion de la recette
      const [recipeResult] = await connection.query<Result>(
        `INSERT INTO recipes (name, description, instructions, cooking_time, servings, user_id) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          recipe.name,
          recipe.description,
          recipe.instructions,
          recipe.cooking_time,
          recipe.servings,
          recipe.user_id,
        ],
      );

      const recipeId = recipeResult.insertId;

      // Insertion des ingrédients et lien avec la recette
      for (const ingredient of ingredients) {
        const [ingredientResult] = await connection.query<Result>(
          `INSERT INTO ingredients (name, quantity)
           VALUES (?, ?)`,
          [ingredient.name, ingredient.quantity],
        );

        const ingredientId = ingredientResult.insertId;

        await connection.query(
          `INSERT INTO recipe_ingredients (recipe_id, ingredients_id, quantity)
           VALUES (?, ?, ?)`,
          [recipeId, ingredientId, ingredient.quantity],
        );
      }

      await connection.commit();
      return recipeId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM recipes WHERE id = ?",
      [id],
    );

    return rows[0] as Recipe;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM recipes");
    return rows as Recipe[];
  }

  async fetchFromSpoonacular(query: string) {
    const apiKey = "c5f23b5005084a988447182e2f2140bd";
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error fetching from Spoonacular: ${data.message}`);
      }

      return data.results;
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(`Error in fetchFromSpoonacular: ${error.message}`);
    }
  }
}

export default new RecipeRepository();
