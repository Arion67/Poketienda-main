import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth({ setCurrentUser }) {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [usuariosDb, setUsuariosDb] = useState([]); // Simulamos la DB en memoria
  const navigate = useNavigate();

  // Estados del formulario
  const [form, setForm] = useState({ usuario: '', correo: '', password: '', confirmPassword: '' });
  const [mensaje, setMensaje] = useState({ texto: '', color: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isLoginMode) {
      if (form.usuario === "" || !emailRegex.test(form.correo) || form.password.length < 8 || form.password !== form.confirmPassword) {
        setMensaje({ texto: "❌ Revisa: Nombre, Email válido, Clave min 8 y coincidente.", color: "red" });
        return;
      }
      setUsuariosDb([...usuariosDb, { nombre: form.usuario, correo: form.correo, clave: form.password }]);
      setMensaje({ texto: "✅ ¡Registrado! Iniciando sesión...", color: "green" });
      setTimeout(() => setIsLoginMode(true), 1500);
    } else {
      let userMatch = usuariosDb.find(x => x.correo === form.correo && x.clave === form.password);
      if (userMatch) {
        setCurrentUser(userMatch);
        navigate('/'); // Redirige al Home al loguearse con éxito
      } else {
        setMensaje({ texto: "❌ Credenciales incorrectas o usuario no existe.", color: "red" });
      }
    }
  };

  return (
    <>
      <section className="banner-color">
        <h2>{isLoginMode ? "Iniciar Sesión" : "Zona de Entrenamiento: Registro"}</h2>
      </section>
      <div className="super-oferta-card" style={{ maxWidth: '500px', margin: '30px auto', padding: '30px', border: '3px solid #FFCB05' }}>
        <form onSubmit={handleSubmit}>
          <h3 className="nombre-pokemon">Únete a la Élite</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px', textAlign: 'left' }}>
            
            {!isLoginMode && (
              <>
                <label htmlFor="usuario">Nombre de Entrenador:</label>
                <input type="text" id="usuario" value={form.usuario} onChange={handleChange} className="btn-comprar" style={{ background: 'white', textAlign: 'left', cursor: 'text' }} />
              </>
            )}

            <label htmlFor="correo">Correo Electrónico:</label>
            <input type="email" id="correo" value={form.correo} onChange={handleChange} className="btn-comprar" style={{ background: 'white', textAlign: 'left', cursor: 'text' }} />
            
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" value={form.password} onChange={handleChange} className="btn-comprar" style={{ background: 'white', textAlign: 'left', cursor: 'text' }} />
            
            {!isLoginMode && (
              <>
                <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                <input type="password" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="btn-comprar" style={{ background: 'white', textAlign: 'left', cursor: 'text' }} />
              </>
            )}
            
            <button type="submit" className="btn-comprar" style={{ background: '#EE1515', color: 'white' }}>
              {isLoginMode ? "INGRESAR" : "CREAR CUENTA"}
            </button>
          </div>
          
          <p style={{ marginTop: '15px', fontWeight: 'bold', color: mensaje.color }}>{mensaje.texto}</p>
          
          <p style={{ textAlign: 'center', fontSize: '0.8em', marginTop: '10px' }}>
            <span onClick={() => setIsLoginMode(!isLoginMode)} style={{ color: '#3b4cca', fontWeight: 'bold', cursor: 'pointer' }}>
              {isLoginMode ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia Sesión"}
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Auth;