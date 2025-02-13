import "./Header.css"; // Fichier CSS pour le Header

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Spoonacular</h1>
        <nav className="header-nav">
          <button type="button" className="nav-button home-button">
            <i className="fas fa-home" /> Home
          </button>
          <button type="button" className="nav-button favorites-button">
            <i className="fas fa-heart" /> Favorites
          </button>
        </nav>
      </div>
    </header>
  );
}
