import api from '../../../auth/axiosConfig';

export default function ModalEditarAlimento({idioma, alimento,cerrar,actualizarAlimentoEnLista}) {
  if (!alimento) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const actualizado = {
      ...alimento,
      nombre_es: e.target.nombre_es.value,
      nombre_en: e.target.nombre_en.value,
      calorias: parseFloat(e.target.calorias.value),
      medida: e.target.medida.value,
      proteinas: parseFloat(e.target.proteinas.value),
      carbohidratos: parseFloat(e.target.carbohidratos.value),
      grasas: parseFloat(e.target.grasas.value),
    };

    api
      .put(`paneladmin/alimentos/${actualizado.id}/`, actualizado)
      .then((res) => {
        if (res.status === 200) {
          actualizarAlimentoEnLista(actualizado);
          cerrar();
        }
      })
      .catch((err) => console.error('Error al actualizar:', err));
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {idioma === 'es' ? 'Editar Alimento' : 'Edit Food'}
                <button type="button" className="btn-close" onClick={cerrar}></button>
              </h5>
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
                  <label>{idioma === 'es' ? label : label}</label>
                  <input
                    name={name}
                    type={type}
                    step="any"
                    className="form-control"
                    defaultValue={alimento[name]}
                  />
                </div>
              ))}

              <div className="form-group">
                <label>{idioma === 'es' ? 'Medida' : 'Unit'}</label>
                <select
                  name="medida"
                  className="form-control"
                  defaultValue={alimento.medida}
                >
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cerrar}
              >
                {idioma === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {idioma === 'es' ? 'Guardar' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
