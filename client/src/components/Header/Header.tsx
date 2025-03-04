import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/recipeform");
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
            onClick={handleCreateClick}
            className="nav-button create-recipe-button"
          >
            <i className="fas fa-plus" /> Create Recipe
          </button>
        </nav>
      </div>
    </header>
  );
}
