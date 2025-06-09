import { useEffect, useState } from 'react';
import api from '../../../auth/axiosConfig';
import ModalAnadirReceta from '../../Modal/Modal_Receta_Añadir/ModalRecetaAnadir';

export default function ListadoRecetasDiario({ onAgregar, idioma }) {
  const [recetas, setRecetas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    api.get('/recetas/')
      .then(res => setRecetas(res.data.Comidas || []))
      .catch(err => console.error('Error al cargar recetas:', err));
  }, []);

  const handleAgregarClick = (receta) => {
    setRecetaSeleccionada(receta);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setRecetaSeleccionada(null);
  };

  const handleRecetaAñadida = () => {
    setMostrarModal(false);
    setRecetaSeleccionada(null);
    if (onAgregar) onAgregar(); // recargar diario
  };

  return (
    <div>
      <h3>{idioma === 'es' ? 'Añadir Recetas al Diario' : 'Add Recipes to Diary'}</h3>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>{idioma === 'es' ? 'Nombre' : 'Name'}</th>
              <th>{idioma === 'es' ? 'Calorías' : 'Calories'}</th>
              <th>{idioma === 'es' ? 'Porciones' : 'Servings'}</th>
              <th>{idioma === 'es' ? 'Acción' : 'Action'}</th>
            </tr>
          </thead>
          <tbody>
            {recetas.map((receta, idx) => (
              <tr key={idx}>
                <td>{receta.nombre}</td>
                <td>{receta.calorias.toFixed(2)}</td>
                <td>{receta.numeroPorciones}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAgregarClick(receta)}
                  >
                    {idioma === 'es' ? 'Añadir' : 'Add'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalAnadirReceta
        mostrar={mostrarModal}
        onClose={handleCerrarModal}
        onSubmit={handleRecetaAñadida}
        receta={recetaSeleccionada}
        idioma={idioma}
        procesando={procesando}
      />
    </div>
  );
}
