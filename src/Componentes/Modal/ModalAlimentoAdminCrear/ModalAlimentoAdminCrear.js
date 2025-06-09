import api from '../../../auth/axiosConfig';
import { useState, useEffect } from 'react';

export default function ModalFormularioPeso({ cerrar, pesos, setPesos, pesoEditar, setPesoEditar }) {
  const [fecha, setFecha] = useState('');
  const [peso, setPeso] = useState('');
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  const imagenPorDefecto = "media/img/imagenSinPerfil.jpg";

  useEffect(() => {
    if (pesoEditar) {
      setFecha(pesoEditar.fecha || '');
      setPeso(pesoEditar.peso || '');
      setPreview(pesoEditar.foto_pesaje || null);
      setImagen(null);
    } else {
      setFecha('');
      setPeso('');
      setImagen(null);
      setPreview(null);
    }
  }, [pesoEditar]);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImagen(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fecha', fecha);
    formData.append('peso', peso);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      if (pesoEditar) {
        await api.put(`/pesos/${pesoEditar.id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Peso actualizado correctamente');
        setPesoEditar(null);
      } else {
        await api.post('/pesos/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Peso creado correctamente');
      }

      const res = await api.get('/pesos/');
      setPesos(res.data.pesos);

      setFecha('');
      setPeso('');
      setImagen(null);
      setPreview(null);
      cerrar();
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error');
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {pesoEditar ? 'Editar Registro de Peso' : 'Nuevo Registro de Peso'}
              </h5>
              <button type="button" className="close" onClick={cerrar}>
                <span>&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="text-center mb-3">
                <img
                  src={preview || imagenPorDefecto}
                  alt="Vista previa"
                  className="img-fluid rounded"
                  style={{ maxHeight: '250px', objectFit: 'cover' }}
                />
              </div>

              <div className="form-group">
                <label>Fecha:</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label>Peso (kg):</label>
                <input
                  type="number"
                  step="0.01"
                  value={peso}
                  onChange={e => setPeso(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label>Imagen:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagenChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => {
                setPesoEditar(null);
                cerrar();
              }}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {pesoEditar ? 'Guardar Cambios' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
