import { Link, useNavigate } from "react-router-dom";

export default function Favorites() {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const favorites: any[] = JSON.parse(
    localStorage.getItem("favorites") || "[]",
  );
  const navigate = useNavigate();
  return (
    <section>
      <h1>Recettes Favoris</h1>
      {favorites.length === 0 ? (
        <p>Aucune recette en favoris.</p>
      ) : (
        <article>
          {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
          {favorites.map((recipe: any) => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{ width: "150px", borderRadius: "8px" }}
              />
              <Link to={`/recipe/${recipe.id}`}>Voir la recette</Link>
            </div>
          ))}
        </article>
      )}
      <button type="button" onClick={() => navigate("/")}>
        Return home
      </button>
    </section>
  );
}
