import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Contacto from './pages/Contacto';
import Admin from './pages/Admin';

function App() {
  const [isRocketMode, setIsRocketMode] = useState(false);
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('carrito');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Sincronizar carrito con localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

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
    setCart((prevCart) => {
      // Generar ID basado en el nombre
      const id = nombre.toLowerCase().replace(/\s+/g, '-');
      
      // Buscar si el producto ya existe
      const existingProduct = prevCart.find((item) => item.id === id);

      if (existingProduct) {
        // Si existe, incrementar cantidad
        return prevCart.map((item) =>
          item.id === id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item
        );
      } else {
        // Si no existe, agregar nuevo producto
        return [...prevCart, { id, nombre, precio, cantidad: 1 }];
      }
    });
    setIsCartOpen(true); // Abre el carrito al agregar
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
        setCart={setCart}
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
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <Footer />

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