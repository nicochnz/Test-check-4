import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);
import recipeAction from "./modules/recipe/recipeAction";
router.get("/api/recipes", recipeAction.browse);
router.get("/api/recipes/:id", recipeAction.read);
router.post("/api/recipes", recipeAction.add);

/* ************************************************************************* */

export default router;
