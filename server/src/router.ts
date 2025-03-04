import express from "express";
import categoryAction from "./modules/category/categoryAction";
import recipeAction from "./modules/recipe/recipeAction";
import upload from "./upload";
const router = express.Router();

router.get("/api/recipes", recipeAction.browse);
router.get("/api/recipes/:id", recipeAction.read);
router.post("/api/recipes", upload.single("image"), recipeAction.add);

router.get("/api/recipes/search", recipeAction.browseFromSpoonacular);
router.get("/api/categories", categoryAction.browse);
router.post("/api/categories", categoryAction.add);
export default router;
