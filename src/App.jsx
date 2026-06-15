import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Contacto from './pages/Contacto';

function App() {
  const [isRocketMode, setIsRocketMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Efecto para cambiar la clase del body según el tema
  useEffect(() => {
    if (isRocketMode) {
      document.body.classList.add('modo-rocket');
    } else {
      document.body.classList.remove('modo-rocket');
    }
  }, [isRocketMode]);

  const toggleRocketMode = () => setIsRocketMode(!isRocketMode);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (nombre, precio) => {
    setCart([...cart, { nombre, precio }]);
    setIsCartOpen(true); // Opcional: abre el carrito al agregar
  };

  return (
    <>
      <Navbar 
        cartCount={cart.length} 
        toggleCart={toggleCart} 
        toggleRocketMode={toggleRocketMode}
        setSearchQuery={setSearchQuery}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      
      <Cart 
        cart={cart} 
        isOpen={isCartOpen} 
        toggleCart={toggleCart} 
      />

      <header>
        <h1>{isRocketMode ? "Guarida Team Rocket" : "Poké Tienda Elite"}</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} searchQuery={searchQuery} />} />
          <Route path="/auth" element={<Auth setCurrentUser={setCurrentUser} />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>

      <footer>
        <p>©2026 Poké Tienda Elite - Arion Grez</p>
      </footer>

      <div className="whatsapp-container">
        <img src="/images/rotomdex.png" className="rotom-helper rotom-whatsapp" alt="Rotom Ayuda" />
        <a href="https://wa.me/56912345678" className="whatsapp-btn" target="_blank" rel="noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
        </a>
      </div>
    </>
  );
}

export default App;