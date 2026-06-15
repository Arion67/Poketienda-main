import { useState } from 'react';

function Contacto() {
  const [mensaje, setMensaje] = useState("");

  return (
    <>
      <section className="banner-color"><h2>Centro de Soporte Rotom</h2></section>
      <div className="super-oferta-card" style={{ maxWidth: '600px', margin: '30px auto', padding: '30px', border: '3px solid #3b4cca' }}>
        <form onSubmit={(e) => { e.preventDefault(); alert("¡Mensaje enviado a Rotom!"); }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
            <label>Nombre:</label>
            <input type="text" placeholder="Nombre" className="btn-comprar" style={{ background: 'white', textAlign: 'left', cursor: 'text' }} />
            
            <label>Asunto:</label>
            <input type="text" placeholder="Asunto" className="btn-comprar" style={{ background: 'white', textAlign: 'left', cursor: 'text' }} />
            
            <label>Mensaje:</label>
            <textarea 
              placeholder="Mensaje..." rows="5" className="btn-comprar" 
              style={{ background: 'white', textAlign: 'left', cursor: 'text', resize: 'none' }}
              onChange={(e) => setMensaje(e.target.value)}
              maxLength="200"
            ></textarea>
            
            <div style={{ textAlign: 'right', fontSize: '0.8em', color: '#666' }}>
              Caracteres: <span>{mensaje.length}</span> / 200
            </div>
            
            <button type="submit" className="btn-comprar" style={{ background: '#3b4cca', color: 'white' }}>ENVIAR MENSAJE</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contacto;