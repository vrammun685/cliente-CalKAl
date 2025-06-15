import { useState, useEffect } from 'react';
import FiltroAlimentos from '../../Filtros/FiltroAlimento/FiltroAlimentos';
import { useNavigate } from 'react-router-dom';
import ModalEditarAlimento from '../../Modal/ModalAlimentoAdminEditar/ModalAlimentoAdminEdicion';
import api from '../../../auth/axiosConfig';

export default function ListaAlimentosAdmin({
  alimentos,
  actualizarAlimento,
  eliminarAlimento: eliminarAlimentoDeLista,
}) {
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alimentoModal, setAlimentoModal] = useState(null);
  const navigate = useNavigate();
  const itemsPorPagina = 8;

  const alimentosFiltrados = alimentos.filter((alimento) =>
    `${alimento.nombre_es} ${alimento.nombre_en}`.toLowerCase().includes(filtro.toLowerCase())
  );

  const totalPaginas = Math.ceil(alimentosFiltrados.length / itemsPorPagina);
  const inicio = (paginaActual - 1) * itemsPorPagina;
  const fin = inicio + itemsPorPagina;
  const alimentosPagina = alimentosFiltrados.slice(inicio, fin);

  useEffect(() => {
    setPaginaActual(1);
  }, [filtro]);

  const abrirModal = (alimento) => {
    setAlimentoModal(alimento);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setAlimentoModal(null);
  };

  const eliminarAlimento = (id) => {
    api.delete(`paneladmin/alimentos/${id}/`)
      .then(res => {
        if (res.status === 204 || res.status === 200) {
          eliminarAlimentoDeLista(id);
        } else if (res.status === 403) {
          navigate('/login');
        } else {
          alert("Algo ha ido mal. Por favor, inténtalo de nuevo más tarde.");
        }
      })
      .catch(error => {
        alert("Algo ha ido mal. Por favor, inténtalo de nuevo más tarde.");
        navigate('/login');
      });
  };

  return (
    <div className="container mt-4">
      <FiltroAlimentos filtro={filtro} setFiltro={setFiltro} />

      {alimentosFiltrados.length === 0 ? (
        <p>No hay alimentos que coincidan con la búsqueda.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre Español</th>
                <th>Nombre Inglés</th>
                <th>Calorías</th>
                <th>Medida</th>
                <th>Proteínas</th>
                <th>Carbohidratos</th>
                <th>Grasas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alimentosPagina.map((alimento) => (
                <tr key={alimento.id}>
                  <td>{alimento.nombre_es}</td>
                  <td>{alimento.nombre_en}</td>
                  <td>{alimento.calorias}</td>
                  <td>100 {alimento.medida}</td>
                  <td>{alimento.proteinas}</td>
                  <td>{alimento.carbohidratos}</td>
                  <td>{alimento.grasas}</td>
                  <td>
                    <button className="btn boton btn-sm me-2" onClick={() => abrirModal(alimento)}>
                      Editar
                    </button>
                    <button className="btn boton btn-sm" onClick={() => eliminarAlimento(alimento.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center my-3">
            <button className="btn btn-secondary" disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button className="btn btn-secondary" disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(paginaActual + 1)}>Siguiente</button>
          </div>
        </>
      )}

      {mostrarModal && alimentoModal && (
        <ModalEditarAlimento
          idioma="es"
          alimento={alimentoModal}
          cerrar={cerrarModal}
          actualizarAlimentoEnLista={actualizarAlimento}
        />
      )}
    </div>
  );
}
