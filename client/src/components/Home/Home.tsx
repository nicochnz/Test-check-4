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
  const showFavPopup = () => {
    const popup = document.querySelector(".fav-popup");
    if (popup) {
      popup.classList.add("show");
      setTimeout(() => {
        popup.classList.remove("show");
      }, 2000);
    }
  };

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
    handleAddToFavorites(recipe);

    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    showFavPopup();
  };

  return (
    <section className="home-section">
      <h1 className="title-home">Find recipes</h1>

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

      {errorSpoonacular && <p style={{ color: "red" }}>{errorSpoonacular}</p>}

      {recipesSpoonacular.length > 0 && (
        <article>
          <h2 className="title-home">Search result :</h2>
          <div className="recipes-grid">
            {recipesSpoonacular.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <h3 className="">{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.summary}</p>
                <button
                  type="button"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  className="button-home"
                >
                  Show recipe
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

      {queryUserRecipes && recipesUser.length > 0 && (
        <article>
          <h2 className="title-home">User Recipes:</h2>
          <div className="recipes-grid">
            {recipesUser.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <h3>{recipe.name}</h3>
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${recipe.image}`}
                  alt={recipe.name}
                />
                <button
                  type="button"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  className="button-home"
                >
                  Show recipe
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
      <div className="fav-popup">Added to Favorites!</div>
    </section>
  );
}
