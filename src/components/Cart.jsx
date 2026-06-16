function Cart({ cart, setCart, isOpen, toggleCart }) {
  // Calcular subtotal de un producto
  const getSubtotal = (item) => item.precio * (item.cantidad || 1);

  // Calcular total general
  const getTotalGeneral = () => {
    return cart.reduce((total, item) => total + getSubtotal(item), 0);
  };

  // Aumentar cantidad
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item
      )
    );
  };

  // Disminuir cantidad
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id && (item.cantidad || 1) > 1
            ? { ...item, cantidad: (item.cantidad || 1) - 1 }
            : item
        )
        .filter((item) => (item.cantidad || 1) > 0)
    );
  };

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Vaciar carrito completo
  const clearCart = () => {
    if (cart.length === 0) {
      alert('El carrito ya está vacío');
      return;
    }
    if (globalThis.confirm('¿Vaciar el carrito completamente?')) {
      setCart([]);
    }
  };

  return (
    <div className={`cart-window ${isOpen ? 'active' : ''}`}>
      <img src="/images/rotomdex.png" className="rotom-helper rotom-cart" alt="Rotom Carrito" />
      <h3>Tu Pedido TCG</h3>

      {cart.length === 0 ? (
        <>
          <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            El carrito está vacío
          </p>
          <button className="btn-cerrar" onClick={toggleCart} style={{ width: '100%' }}>
            Cerrar
          </button>
        </>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  padding: '15px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', color: '#1a237e' }}>{item.nombre}</h4>
                    <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                      ${item.precio.toLocaleString('es-CL')} c/u
                    </p>
                  </div>
                  <button
                    className="btn-cerrar"
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      padding: '5px 12px',
                      fontSize: '12px',
                      minWidth: 'auto',
                      height: '32px',
                    }}
                  >
                    🗑️
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    className="btn-cerrar"
                    onClick={() => decreaseQuantity(item.id)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '14px',
                      minWidth: 'auto',
                      height: '30px',
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.cantidad || 1}
                    readOnly
                    style={{
                      width: '50px',
                      textAlign: 'center',
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                    }}
                  />
                  <button
                    className="btn-comprar"
                    onClick={() => increaseQuantity(item.id)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '14px',
                      minWidth: 'auto',
                      height: '30px',
                    }}
                  >
                    +
                  </button>
                </div>

                <div style={{ textAlign: 'right', fontWeight: 'bold', color: '#1a237e' }}>
                  Subtotal: ${getSubtotal(item).toLocaleString('es-CL')}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: '2px solid #1a237e',
              padding: '15px 0',
              marginTop: '15px',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1a237e', marginBottom: '15px' }}>
              Total: ${getTotalGeneral().toLocaleString('es-CL')}
            </div>

            <button className="btn-comprar" onClick={() => alert('Redirigiendo a WhatsApp...')} style={{ width: '100%', marginBottom: '10px' }}>
              Finalizar por WhatsApp
            </button>
            <button className="btn-cerrar" onClick={clearCart} style={{ width: '100%', marginBottom: '10px' }}>
              Vaciar Carrito
            </button>
            <button className="btn-cerrar" onClick={toggleCart} style={{ width: '100%' }}>
              Cerrar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;