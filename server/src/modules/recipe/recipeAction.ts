import type { RequestHandler } from "express";
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
    const newRecipe = {
      name: req.body.name,
      description: req.body.description,
      instructions: req.body.instructions,
      cooking_time: req.body.cooking_time,
      servings: req.body.servings,
    };

    const insertId = await recipeRepository.create(newRecipe);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
const browseFromSpoonacular: RequestHandler = async (req, res, next) => {
  try {
    const query = req.query.query as string; // Paramètre de recherche dans l'URL (par exemple, "pasta")
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
