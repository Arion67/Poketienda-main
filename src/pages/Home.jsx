import { useState, useEffect } from 'react';

function Home({ addToCart, searchQuery }) {
  const [nuevosProductos, setNuevosProductos] = useState(() => {
    const stored = localStorage.getItem('productos');
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const stored = localStorage.getItem('productos');
    if (stored) {
      try {
        setNuevosProductos(JSON.parse(stored));
      } catch {
        setNuevosProductos([]);
      }
    } else {
      setNuevosProductos([]);
    }
  }, []);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'productos') {
        if (event.newValue) {
          try {
            setNuevosProductos(JSON.parse(event.newValue));
          } catch {
            setNuevosProductos([]);
          }
        } else {
          setNuevosProductos([]);
        }
      }
    };

    globalThis.addEventListener('storage', handleStorage);
    return () => globalThis.removeEventListener('storage', handleStorage);
  }, []);

  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSlide((s) => (s + 1) % 3), 4000);
    return () => clearInterval(interval);
  }, []);

  const [tiempo, setTiempo] = useState(9912);
  useEffect(() => {
    const interval = setInterval(() => setTiempo((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const isVisible = (texto) => texto.toLowerCase().includes(searchQuery.toLowerCase());
  
  // Filtrar productos por sección
  const productosOferta = nuevosProductos.filter((p) => p.seccion === 'oferta');
  const productosSubasta = nuevosProductos.filter((p) => p.seccion === 'subasta');
  const productosClasico = nuevosProductos.filter((p) => p.seccion === 'clasico');
  const productosTableros = nuevosProductos.filter((p) => p.seccion === 'tableros');

  return (
    <>
      <section className="banner-color"><h2>Ofertas y Preventas</h2></section>
      <div className="contenedor-slider">
        <div className="slider-anuncios" style={{ transform: `translateX(-${slide * 33.33}%)` }}>
          <div className="slide"><img src="/images/anuncio 1.png" alt="Anuncio 1" /></div>
          <div className="slide"><img src="/images/anuncio 2.png" alt="Anuncio 2" /></div>
          <div className="slide"><img src="/images/anuncio 3.png" alt="Anuncio 3" /></div>
        </div>
      </div>

      {isVisible('Master Collection Box') && (
        <>
          <section className="banner-color"><h2>⚡ ¡SÚPER OFERTA EXCLUSIVA!</h2></section>
          <div className="super-oferta-card">
            <div className="oferta-contenido">
              <div className="oferta-imagen">
                <img src="/images/super_oferta_1.webp" alt="Super Oferta" />
                <div className="etiqueta-descuento">-40% HOY</div>
              </div>
              <div className="oferta-texto">
                <h3 className="nombre-pokemon">Master Collection Premium Box</h3>
                <p>¡El tesoro definitivo para cualquier entrenador!</p>
                <div className="contenedor-precios">
                  <span className="precio-tachado">$89.990</span>
                  <span className="precio-real">$53.990 CLP</span>
                </div>
                <button className="btn-comprar" onClick={() => addToCart('Master Collection Box', 53990)}>
                  ¡APROVECHAR OFERTA AHORA!
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {productosOferta.length > 0 && (
        <div className="contenedor-cartas">
          {productosOferta.map((product) => (
            <article className="carta-box" key={product.id}>
              <h3 className="nombre-pokemon">{product.nombre}</h3>
              <img src={product.imagen} alt={product.nombre} />
              <p>${product.precio.toLocaleString('es-CL')}</p>
              <button className="btn-comprar" onClick={() => addToCart(product.nombre, product.precio)}>
                Comprar
              </button>
            </article>
          ))}
        </div>
      )}

      <section className="banner-color"><h2>Tableros</h2></section>
      <div className="seccion-flexible">
        {isVisible('Tablero Pro') && (
          <div className="cuadro-central">
            <img src="/images/tablero_pokemon_1.jpg" alt="Tablero 1" />
            <h3 className="nombre-pokemon">Tablero Pro Championship</h3>
            <p>$45.990 CLP</p>
            <button className="btn-comprar" onClick={() => addToCart('Tablero Pro', 45990)}>Añadir al Carrito</button>
          </div>
        )}
        {isVisible('Academia de Combate') && (
          <div className="cuadro-central">
            <img src="/images/tablero_pokemon_2.png" alt="Tablero 2" />
            <h3 className="nombre-pokemon">Academia de Combate</h3>
            <p>$32.990 CLP</p>
            <button className="btn-comprar" onClick={() => addToCart('Academia de Combate', 32990)}>Añadir al Carrito</button>
          </div>
        )}
        {productosTableros.map((product) => (
          <div className="cuadro-central" key={product.id}>
            <img src={product.imagen} alt={product.nombre} />
            <h3 className="nombre-pokemon">{product.nombre}</h3>
            <p>${product.precio.toLocaleString('es-CL')}</p>
            <button className="btn-comprar" onClick={() => addToCart(product.nombre, product.precio)}>Añadir al Carrito</button>
          </div>
        ))}
      </div>

      <section className="banner-color">
        <h2>Subastas Activas ⏳ <span>{formatTime(tiempo)}</span></h2>
      </section>
      <div className="contenedor-cartas">
        {isVisible('Lote VMAX') && (
          <article className="carta-box">
            <div className="badge-rareza rareza-vmax">VMAX</div>
            <h3 className="nombre-pokemon">Lote VMAX Rainbow</h3>
            <img src="/images/imag subasta 1.jpeg" alt="Subasta 1" />
            <p>$25.000 CLP</p>
            <button className="btn-comprar" onClick={() => addToCart('Lote VMAX', 25000)}>Pujar</button>
          </article>
        )}
        {isVisible('Lote Mew') && (
          <article className="carta-box">
            <div className="badge-rareza rareza-ex">EX Rare</div>
            <h3 className="nombre-pokemon">Lote Mew EX</h3>
            <img src="/images/imag subasta 2.jpg" alt="Subasta 2" />
            <p>$30.000 CLP</p>
            <button className="btn-comprar" onClick={() => addToCart('Lote Mew', 30000)}>Pujar</button>
          </article>
        )}
        {productosSubasta.map((product) => (
          <article className="carta-box" key={product.id}>
            <div className="badge-rareza rareza-vmax">Subasta</div>
            <h3 className="nombre-pokemon">{product.nombre}</h3>
            <img src={product.imagen} alt={product.nombre} />
            <p>${product.precio.toLocaleString('es-CL')}</p>
            <button className="btn-comprar" onClick={() => addToCart(product.nombre, product.precio)}>Pujar</button>
          </article>
        ))}
      </div>

      <section className="banner-color"><h2>Base Set Clásico</h2></section>
      <div className="contenedor-cartas">
        {isVisible('Pikachu') && (
          <article className="carta-box">
            <div className="badge-rareza rareza-vintage">1st Ed</div>
            <h3 className="nombre-pokemon">Pikachu</h3>
            <img src="/images/pikachu 1999.jpg" alt="Pikachu" />
            <p>$150.000 CLP</p>
            <button className="btn-comprar" onClick={() => addToCart('Pikachu', 150000)}>Comprar</button>
          </article>
        )}
        {isVisible('Charizard') && (
          <article className="carta-box">
            <div className="badge-rareza rareza-holo">Holo</div>
            <h3 className="nombre-pokemon">Charizard</h3>
            <img src="/images/charizard holo.jpg" alt="Charizard" />
            <p>$500.000 CLP</p>
            <button className="btn-comprar" onClick={() => addToCart('Charizard', 500000)}>Comprar</button>
          </article>
        )}
        {productosClasico.map((product) => (
          <article className="carta-box" key={product.id}>
            <h3 className="nombre-pokemon">{product.nombre}</h3>
            <img src={product.imagen} alt={product.nombre} />
            <p>${product.precio.toLocaleString('es-CL')}</p>
            <button className="btn-comprar" onClick={() => addToCart(product.nombre, product.precio)}>Comprar</button>
          </article>
        ))}
      </div>

    </>
  );
}

export default Home;
