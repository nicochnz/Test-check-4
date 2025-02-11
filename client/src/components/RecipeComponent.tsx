import DOMPurify from "dompurify";
import { useRecipePageLogic } from "../services/RecipePageLogic";
import "./Recipe.css";
import { useNavigate } from "react-router-dom";

export default function Recipes() {
  const { recipe } = useRecipePageLogic();
  const navigate = useNavigate();
  if (!recipe) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="recipe-section">
      <h1 className="recipe-title">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h2 className="recipe-instructions-title">Instructions :</h2>
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
      <p
        className="recipe-instructions"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(recipe.instructions),
        }}
      ></p>
      <h3 className="recipe-cooking-time">
        Cooking time: {recipe.readyInMinutes} minutes
      </h3>
      <button type="button" onClick={() => navigate("/")}>
        Return home
      </button>
    </section>
  );
}
