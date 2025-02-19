import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!token) {
      e.preventDefault();
      setShowPopup(true);
    } else {
      navigate("/recipeform");
    }
  };
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Spoonacular</h1>
        <nav className="header-nav">
          <Link to="/" className="nav-button home-button">
            <i className="fas fa-home" /> Home
          </Link>
          <Link to="/favorites" className="nav-button favorites-button">
            <i className="fas fa-heart" /> Favorites
          </Link>
          <button
            type="button"
            onClick={handleClick}
            className="nav-button create-recipe-button"
          >
            <i className="fas fa-plus" /> Create Recipe
          </button>

          {showPopup && (
            <div className="popup">
              <p>Veuillez vous connecter pour créer une recette.</p>
              <button type="button" onClick={() => navigate("/login")}>
                Se connecter
              </button>
              <button type="button" onClick={() => setShowPopup(false)}>
                Fermer
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
