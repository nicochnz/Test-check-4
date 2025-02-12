import { useHomePageLogic } from "../services/HomePageLogic";

export default function FavoritesPage() {
  const { favorites } = useHomePageLogic(); // Récupérer les favoris

  const clearFavorites = () => {
    localStorage.removeItem("favorites"); // Effacer les favoris du localStorage
    // Vous pouvez aussi appeler une fonction pour mettre à jour l'état de vos favoris ici
    // Si vous avez un gestionnaire d'état dans useHomePageLogic, vous pouvez le déclencher.
  };

  return (
    <section>
      <h1>Favorites</h1>
      <button type="button" onClick={clearFavorites}>
        Clear Favorites
      </button>
      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p>No favorites yet!</p>
        ) : (
          favorites.map((recipe, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="recipe-card">
              <h3>{recipe.title || recipe.name}</h3>
              <img
                src={recipe.image}
                alt={recipe.title || recipe.name}
                style={{ width: "200px", borderRadius: "8px" }}
              />
              <p>{recipe.summary || recipe.description}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
