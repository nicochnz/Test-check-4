import { useHomePageLogic } from "../services/HomePageLogic";
import "./Home.css"
export default function Home() {
  const {
    query,
    setQuery,
    recipes,
    loading,
    error,
    navigate,
    handleSearch,
    handleAddToFavorites,
  } = useHomePageLogic();
  return (
    <section className="home-section">
      <h1 className="title-home">Find recipes</h1>

      <form className="form-home" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter an ingredient or dish"
        />
        <button className="button-home" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {recipes.length > 0 && (
        <article>
          <h2 className="title-home">Search results:</h2>
          <div>
            {recipes.map((recipe) => (
              <div key={recipe.id} style={{ marginBottom: "20px" }}>
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
                  More informations
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAddToFavorites(recipe);
                    navigate("/favorites");
                  }}
                >
                  Add to favorites
                </button>
              </div>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
