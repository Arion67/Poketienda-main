import { Link } from 'react-router-dom';

function Navbar({ cartCount, toggleCart, toggleRocketMode, setSearchQuery, currentUser, setCurrentUser }) {
  
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <img src="/images/pokemon-icono.ico" className="nav-logo" alt="Logo" />
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Buscar Pokémon..." 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src="/images/rotomdex.png" className="rotom-helper rotom-search" alt="RotomDex" />
        </div>

        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="nav-icons">
          {currentUser ? (
            <div className="auth-links">
              <span className="user-welcome">¡Hola! {currentUser.nombre}</span>
              <button className="btn-logout" onClick={handleLogout}>Salir</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/auth">Iniciar Sesión / Registro</Link>
            </div>
          )}
          
          <button 
            onClick={toggleRocketMode} 
            className="btn-rocket"
            title="Cambiar a Modo Team Rocket"
          >
            ⚡
          </button>
          <button 
            onClick={toggleCart}
            className="btn-cart"
            title="Abrir carrito de compras"
          >
            🛒 <span>{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;