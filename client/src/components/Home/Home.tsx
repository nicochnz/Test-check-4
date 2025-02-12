import { useNavigate } from "react-router-dom";
import { useHomePageLogic } from "../../services/HomePageLogic";
import "./Home.css";

export default function Home() {
  const {
    querySpoonacular,
    setQuerySpoonacular,
    recipesSpoonacular,
    loadingSpoonacular,
    errorSpoonacular,
    handleSearchSpoonacular,
    queryUserRecipes,
    setQueryUserRecipes,
    recipesUser,
    handleSearchUserRecipes,
    handleAddToFavorites,
  } = useHomePageLogic();

  const navigate = useNavigate();

  const handleSubmitSpoonacular = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearchSpoonacular(querySpoonacular);
  };

  const handleSubmitUserRecipes = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearchUserRecipes(queryUserRecipes);
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleAddRecipeToFavorites = (recipe: Record<string, any>) => {
    // Ajouter la recette aux favoris dans l'état
    handleAddToFavorites(recipe);

    // Ajouter également la recette aux favoris dans le localStorage
    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  return (
    <section className="home-section">
      <button
        type="button"
        className="button-home"
        onClick={() => navigate("/favorites")}
      >
        Go to Favorites
      </button>

      <h1 className="title-home">Find recipes</h1>

      {/* Recherche Spoonacular */}
      <form className="form-home" onSubmit={handleSubmitSpoonacular}>
        <input
          type="text"
          value={querySpoonacular}
          onChange={(e) => setQuerySpoonacular(e.target.value)}
          placeholder="Search Spoonacular recipes"
        />
        <button
          className="button-home"
          type="submit"
          disabled={loadingSpoonacular}
        >
          {loadingSpoonacular ? "Loading..." : "Search Spoonacular"}
        </button>
      </form>

      {/* Recherche Recettes Utilisateurs */}
      <form className="form-home" onSubmit={handleSubmitUserRecipes}>
        <input
          type="text"
          value={queryUserRecipes}
          onChange={(e) => setQueryUserRecipes(e.target.value)}
          placeholder="Search User Recipes"
        />
        <button className="button-home" type="submit">
          Search User Recipes
        </button>
      </form>

      {/* Affichage des erreurs */}
      {errorSpoonacular && <p style={{ color: "red" }}>{errorSpoonacular}</p>}

      {/* Affichage des résultats Spoonacular */}
      {recipesSpoonacular.length > 0 && (
        <article>
          <h2 className="title-home">Spoonacular Recipes:</h2>
          <div className="recipes-grid">
            {recipesSpoonacular.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <h3>{recipe.title}</h3>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: "200px", borderRadius: "8px" }}
                />
                <p>{recipe.summary}</p>
                <button
                  type="button"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  More Information
                </button>
                <button
                  type="button"
                  onClick={() => handleAddRecipeToFavorites(recipe)}
                  className="button-home"
                >
                  Add to Favorites
                </button>
              </div>
            ))}
          </div>
        </article>
      )}

      {/* Affichage des résultats recettes utilisateurs */}
      {queryUserRecipes && recipesUser.length > 0 && (
        <article>
          <h2 className="title-home">User Recipes:</h2>
          <div className="recipes-grid">
            {recipesUser.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <h3>{recipe.name}</h3>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  style={{ width: "200px", borderRadius: "8px" }}
                />
                <p>{recipe.description}</p>
                <button
                  type="button"
                  onClick={() => handleAddRecipeToFavorites(recipe)}
                  className="button-home"
                >
                  Add to Favorites
                </button>
              </div>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
