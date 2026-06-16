import { useState, useEffect } from 'react';

function Admin() {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('productos');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (!localStorage.getItem('productos')) {
      localStorage.setItem('productos', JSON.stringify([]));
    }
  }, []);

  const [form, setForm] = useState({ nombre: '', precio: '', tipo: '', imagen: '', seccion: 'tableros' });
  const [editIndex, setEditIndex] = useState(-1);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const resetForm = () => {
    setForm({ nombre: '', precio: '', tipo: '', imagen: '', seccion: 'tableros' });
    setEditIndex(-1);
    setMensaje('');
  };

  const saveProducts = (nextProducts) => {
    setProducts(nextProducts);
    localStorage.setItem('productos', JSON.stringify(nextProducts));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre = form.nombre.trim();
    const tipo = form.tipo.trim();
    const imagen = form.imagen.trim();
    const precio = Number(form.precio);

    if (!nombre || !tipo || !imagen || !form.precio) {
      setMensaje('Por favor completa todos los campos.');
      return;
    }

    if (Number.isNaN(precio) || precio <= 0) {
      setMensaje('El precio debe ser un número mayor a cero.');
      return;
    }

    const product = {
      id: editIndex >= 0 ? products[editIndex].id : `${nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${Date.now()}`,
      nombre,
      precio,
      tipo,
      imagen,
      seccion: form.seccion.toLowerCase().trim() || 'tableros',
    };

    const nextProducts = editIndex >= 0
      ? products.map((item, index) => (index === editIndex ? product : item))
      : [...products, product];

    saveProducts(nextProducts);
    setMensaje(editIndex >= 0 ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.');
    resetForm();
  };

  const handleEdit = (index) => {
    const product = products[index];
    setForm({
      nombre: product.nombre,
      precio: String(product.precio),
      tipo: product.tipo,
      imagen: product.imagen,
      seccion: product.seccion || 'tableros',
    });
    setEditIndex(index);
    setMensaje('Edita los campos y guarda los cambios.');
  };

  const handleDelete = (index) => {
    if (!globalThis.confirm('¿Eliminar este producto?')) return;
    const nextProducts = products.filter((_, itemIndex) => itemIndex !== index);
    saveProducts(nextProducts);
    if (editIndex === index) {
      resetForm();
    }
  };

  return (
    <div className="admin-page">
      <section className="banner-color">
        <h2>Panel de Administración</h2>
      </section>

      <div className="admin-panel">
        <div className="admin-card">
          <h3>{editIndex >= 0 ? 'Editar Producto' : 'Crear Producto'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-grid">
              <div className="admin-field">
                <label htmlFor="nombre">Nombre del Pokémon/Producto</label>
                <input id="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Ej. Charizard Holo" />
              </div>

              <div className="admin-field">
                <label htmlFor="precio">Precio (CLP)</label>
                <input id="precio" type="number" value={form.precio} onChange={handleChange} placeholder="Ej. 259900" />
              </div>

              <div className="admin-field">
                <label htmlFor="tipo">Tipo</label>
                <input id="tipo" type="text" value={form.tipo} onChange={handleChange} placeholder="Ej. Cartas, Accesorio, Colección" />
              </div>

              <div className="admin-field">
                <label htmlFor="imagen">Ruta de imagen</label>
                <input id="imagen" type="text" value={form.imagen} onChange={handleChange} placeholder="Ej. /images/Alakazam holo.jpg" />
              </div>

              <div className="admin-field">
                <label htmlFor="seccion">Sección</label>
                <input id="seccion" type="text" list="secciones" value={form.seccion} onChange={handleChange} placeholder="Ej. tableros, oferta, subasta..." />
                <datalist id="secciones">
                  <option value="tableros" />
                  <option value="oferta" />
                  <option value="subasta" />
                  <option value="clasico" />
                </datalist>
              </div>
            </div>

            {form.imagen && (
              <div className="admin-image-preview-wrapper">
                <p>Previsualización de imagen</p>
                <img src={form.imagen} alt="Vista previa" className="admin-image-preview" />
              </div>
            )}

            <div className="admin-actions">
              <button type="submit" className="btn-comprar admin-action-btn">
                {editIndex >= 0 ? 'Guardar cambios' : 'Crear producto'}
              </button>
              {editIndex >= 0 && (
                <button type="button" className="btn-cerrar admin-action-btn" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>

            {mensaje && <p className="admin-message">{mensaje}</p>}
          </form>
        </div>

        <div className="admin-card" style={{ width: '100%', background: 'rgba(245, 250, 255, 0.95)', border: '1px solid rgba(26, 35, 126, 0.12)' }}>
          <h3>Productos registrados</h3>
          <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card)', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '14px', overflow: 'hidden', color: 'var(--text)' }}>
              <thead style={{ background: '#d5e7ff', color: '#102a43' }}>
                <tr>
                  <th style={{ padding: '14px 12px', textAlign: 'left', width: '110px' }}>Imagen</th>
                  <th style={{ padding: '14px 12px', textAlign: 'left' }}>Nombre</th>
                  <th style={{ padding: '14px 12px', textAlign: 'left', width: '130px' }}>Precio</th>
                  <th style={{ padding: '14px 12px', textAlign: 'left', width: '140px' }}>Tipo</th>
                  <th style={{ padding: '14px 12px', textAlign: 'left', width: '140px' }}>Sección</th>
                  <th style={{ padding: '14px 12px', textAlign: 'left', width: '180px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={`${product.nombre}-${index}`} style={{ borderBottom: '1px solid rgba(16, 42, 67, 0.08)', color: 'var(--text)' }}>
                    <td style={{ padding: '12px' }}>
                      <img
                        src={product.imagen}
                        alt={product.nombre}
                        style={{ width: '80px', height: '80px', objectFit: 'contain', display: 'block', margin: '0 auto', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.08)', background: '#f7fbff' }}
                      />
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'middle', color: 'var(--text)' }}>{product.nombre}</td>
                    <td style={{ padding: '12px', verticalAlign: 'middle', color: 'var(--text)' }}>${product.precio.toLocaleString('es-CL')}</td>
                    <td style={{ padding: '12px', verticalAlign: 'middle', color: 'var(--text)' }}>{product.tipo}</td>
                    <td style={{ padding: '12px', verticalAlign: 'middle', textTransform: 'capitalize', color: 'var(--text)' }}>{product.seccion}</td>
                    <td style={{ padding: '12px', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button className="btn-comprar" type="button" onClick={() => handleEdit(index)} style={{ padding: '8px 14px', minWidth: '90px' }}>
                          Editar
                        </button>
                        <button className="btn-cerrar" type="button" onClick={() => handleDelete(index)} style={{ padding: '8px 14px', minWidth: '90px' }}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '24px 12px', color: 'var(--text)' }}>
                      No hay productos registrados aún.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
