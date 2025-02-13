import express from "express";
import recipeAction from "./modules/recipe/recipeAction";
import upload from "./upload";
const router = express.Router();

router.get("/api/recipes", recipeAction.browse);
router.get("/api/recipes/:id", recipeAction.read);
router.post("/api/recipes", upload.single("image"), recipeAction.add);

router.get("/api/recipes/search", recipeAction.browseFromSpoonacular);

export default router;
