import { log } from "node:console";
import type { RequestHandler } from "express";
import categoryRepository from "../category/categoryRepository"; // Assure-toi que tu importes le repository pour gérer les catégories
import recipeRepository from "./recipeRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const recipes = await recipeRepository.readAll();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number(req.params.id);
    const recipe = await recipeRepository.read(recipeId);

    if (!recipe) {
      res.sendStatus(404);
    } else {
      res.json(recipe);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const {
      name,
      description,
      instructions,
      cooking_time,
      servings,
      user_id,
      category_id,
      ingredients,
    } = req.body;

    if (
      !name ||
      !description ||
      !instructions ||
      !cooking_time ||
      !servings ||
      !user_id
    ) {
      res.status(400).json({
        message: "Tous les champs obligatoires doivent être remplis.",
      });
      return;
    }

    if (category_id) {
      const category = await categoryRepository.read(category_id);
      if (!category) {
        res
          .status(400)
          .json({ message: "La catégorie spécifiée n'existe pas." });
        return;
      }
    }

    const newRecipe = {
      name,
      description,
      instructions,
      cooking_time: Number(cooking_time),
      servings: Number(servings),
      user_id: Number(user_id),
      category_id: category_id ? Number(category_id) : null,
      image: req.file ? req.file.filename : undefined,
    };

    const formattedIngredients = Array.isArray(ingredients)
      ? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        ingredients.map((ingredient: any) => ({
          name: ingredient.name,
          quantity: Number(ingredient.quantity),
        }))
      : [];

    // Création de la recette et insertion des ingrédients
    const insertId = await recipeRepository.create(
      newRecipe,
      formattedIngredients,
    );
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const browseFromSpoonacular: RequestHandler = async (req, res, next) => {
  try {
    const query = req.query.query as string;
    const recipes = await recipeRepository.fetchFromSpoonacular(query);

    if (recipes.length === 0) {
      res.status(404).json({ message: "Aucune recette trouvée" });
    } else {
      res.json(recipes);
    }
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const recipeId = Number(req.params.id);
    const deleted = await recipeRepository.delete(recipeId);

    if (!deleted) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, browseFromSpoonacular, remove };
