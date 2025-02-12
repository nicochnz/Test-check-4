import express from "express";
import multer from "multer";
import recipeAction from "./modules/recipe/recipeAction";
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes pour les recettes
router.get("/api/recipes", recipeAction.browse);
router.get("/api/recipes/:id", recipeAction.read);
router.post("/api/recipes", upload.single("image"), recipeAction.add);

// Routes pour les favoris

// Recherche via Spoonacular
router.get("/api/recipes/search", recipeAction.browseFromSpoonacular);

export default router;
