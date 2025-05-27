import api from '../../../auth/axiosConfig';
import { useState, useEffect } from 'react';

export default function FormularioPeso({ pesos, setPesos, pesoEditar, setPesoEditar }) {
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
      setImagen(null); // Se resetea para que el usuario pueda elegir otra
    } else {
      // Si se cancela o vuelve al modo crear
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
        // Modo edición
        const response = await api.put(`/pesos/${pesoEditar.id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });


        alert('Peso actualizado correctamente');
        setPesoEditar(null);
      } else {
        // Modo creación
        const response = await api.post('/pesos/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        alert('Peso creado correctamente');
      }
      await api.get('/pesos/')
        .then(res => setPesos(res.data.pesos))
        .catch(err => console.error("Error al recargar pesos:", err));

      setFecha('');
      setPeso('');
      setImagen(null);
      setPreview(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow-sm" style={{ maxWidth: '500px' }}>
      <div className="text-center mb-4">
        <img
          src={preview || imagenPorDefecto}
          alt="Vista previa"
          className="img-fluid rounded"
          style={{ maxHeight: '250px', objectFit: 'cover' }}
        />
      </div>

      <h4 className="mb-4 text-center">
        {pesoEditar ? 'Editar Registro de Peso' : 'Nuevo Registro de Peso'}
      </h4>

      <div className="mb-3">
        <label className="form-label">Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Peso (kg):</label>
        <input
          type="number"
          step="0.01"
          value={peso}
          onChange={e => setPeso(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Imagen:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImagenChange}
          className="form-control"
        />
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          {pesoEditar ? 'Guardar Cambios' : 'Crear'}
        </button>
        {pesoEditar && (
          <button type="button" onClick={() => setPesoEditar(null)} className="btn btn-secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}