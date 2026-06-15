function Cart({ cart, isOpen, toggleCart }) {
  const total = cart.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div className={`cart-window ${isOpen ? 'active' : ''}`}>
      <img src="/images/rotomdex.png" className="rotom-helper rotom-cart" alt="Rotom Carrito" />
      <h3>Tu Pedido TCG</h3>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.nombre} - ${item.precio.toLocaleString('es-CL')}</li>
        ))}
      </ul>
      <div className="cart-total" style={{ fontWeight: 'bold', margin: '15px 0' }}>
        Total: ${total.toLocaleString('es-CL')}
      </div>
      <button className="btn-comprar" onClick={() => alert("Redirigiendo a WhatsApp...")}>
        Finalizar por WhatsApp
      </button>
      <button className="btn-cerrar" onClick={toggleCart}>Cerrar</button>
    </div>
  );
}

export default Cart;