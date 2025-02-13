import { log } from "node:console";
import type { RequestHandler } from "express";
import multer from "multer";
import recipeRepository from "./recipeRepository";

const upload = multer({ dest: "uploads/" });

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
    const newRecipe = {
      name: req.body.name,
      description: req.body.description,
      instructions: req.body.instructions,
      cooking_time: Number(req.body.cooking_time),
      servings: Number(req.body.servings),
      user_id: Number(req.body.user_id),
      image: req.body.image ? "toto" : "tata", // Vérification de l'image
    };
    console.log(req.file);

    // Gestion des ingrédients
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const ingredients = req.body.ingredients.map((ingredient: any) => ({
      name: ingredient.name,
      quantity: Number(ingredient.quantity),
    }));

    // Transaction : création de la recette et insertion des ingrédients
    const insertId = await recipeRepository.create(newRecipe, ingredients);
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

export default { browse, read, add, browseFromSpoonacular };
