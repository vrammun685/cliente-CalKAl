import { useState } from 'react';
import api from '../../../auth/axiosConfig';

export default function ModalCrearAlimento({ cerrar, agregarAlimentoALista }) {
  const [formulario, setFormulario] = useState({
    nombre_es: '',
    nombre_en: '',
    calorias: '',
    medida: 'g',
    proteinas: '',
    carbohidratos: '',
    grasas: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      ...formulario,
      calorias: parseFloat(formulario.calorias),
      proteinas: parseFloat(formulario.proteinas),
      carbohidratos: parseFloat(formulario.carbohidratos),
      grasas: parseFloat(formulario.grasas),
    };

    try {
      const res = await api.post('paneladmin/alimentos/', datos);
      if (res.status === 201) {
        agregarAlimentoALista(res.data);
        cerrar();
      }
    } catch (err) {
      console.error('Error al crear alimento:', err);
      alert('Error al crear el alimento.');
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Crear nuevo alimento</h5>
              <button type="button" className="btn-close" onClick={cerrar}></button>
            </div>

            <div className="modal-body">
              {[ 
                { name: 'nombre_es', label: 'Nombre (ES)' },
                { name: 'nombre_en', label: 'Nombre (EN)' },
                { name: 'calorias', label: 'Calorías', type: 'number' },
                { name: 'proteinas', label: 'Proteínas', type: 'number' },
                { name: 'carbohidratos', label: 'Carbohidratos', type: 'number' },
                { name: 'grasas', label: 'Grasas', type: 'number' },
              ].map(({ name, label, type = 'text' }) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input
                    name={name}
                    type={type}
                    step="any"
                    className="form-control"
                    value={formulario[name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="form-group">
                <label>Medida</label>
                <select
                  name="medida"
                  className="form-control"
                  value={formulario.medida}
                  onChange={handleChange}
                >
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="boton" onClick={cerrar}>
                Cancelar
              </button>
              <button type="submit" className="boton">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
