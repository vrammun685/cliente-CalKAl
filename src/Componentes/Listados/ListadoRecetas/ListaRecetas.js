import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalConfirmacion from '../../Modal/Modal_Confirmacion/ModalConfirmacion';

export default function ListaRecetas({ recetas, eliminarReceta, onSeleccionarReceta, idioma }) {
  const navigate = useNavigate();

  const [idAEliminar, setIdAEliminar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const irAEditar = (id) => {
    navigate(`/recetas/crear/${id}`);
  };

  const confirmarEliminar = (id) => {
    setIdAEliminar(id);
    setMostrarModal(true);
  };

  const confirmarYEliminar = () => {
    if (!idAEliminar) return;

    eliminarReceta(idAEliminar);

    setMostrarModal(false);
    setIdAEliminar(null);
  };

  return (
    <div>
      <h3>{idioma === 'es' ? 'Mis Recetas' : 'My Recipes'}</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>{idioma === 'es' ? 'Nombre' : 'Name'}</th>
              <th>{idioma === 'es' ? 'Calorías' : 'Calories'}</th>
              <th>{idioma === 'es' ? 'Porciones' : 'Servings'}</th>
              <th>{idioma === 'es' ? 'Acciones' : 'Actions'}</th>
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
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onSeleccionarReceta(receta)}
                  >
                    {idioma === 'es' ? 'Ver detalles' : 'View details'}
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => irAEditar(receta.id)}
                  >
                    {idioma === 'es' ? 'Editar' : 'Edit'}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmarEliminar(receta.id)}
                  >
                    {idioma === 'es' ? 'Eliminar' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalConfirmacion
        mostrar={mostrarModal}
        onCancelar={() => {
          setMostrarModal(false);
          setIdAEliminar(null);
        }}
        onConfirmar={confirmarYEliminar}
        idioma={idioma}
      />
    </div>
  );
}
