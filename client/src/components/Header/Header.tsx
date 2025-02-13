import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
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
          <Link to="/recipeform" className="nav-button create-recipe-button">
            <i className="fas fa-plus" /> Create Recipe
          </Link>
        </nav>
      </div>
    </header>
  );
}
