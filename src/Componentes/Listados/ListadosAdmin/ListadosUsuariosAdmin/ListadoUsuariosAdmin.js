import { useEffect, useState } from 'react';
import  FiltroAlimentos  from '../../Filtros/FiltroAlimento/FiltroAlimentos';
import api from '../../../auth/axiosConfig';
import ModalAnadirAlimento from '../../Modal/Modal_Alimento/ModalAlimento';
import { useEffect, useState } from 'react';
import api from '../../auth/axiosConfig';

export default function ListaUsuariosAdmin({ idioma }) {
  const [filtro, setFiltro] = useState('');
  const [alimentos, setAlimentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [alimentoModal, setAlimentoModal] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 8;

  useEffect(() => {
    api.get('/alimentos/')
      .then((res) => {
        setAlimentos(res.data || []);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al cargar alimentos:', err);
        setCargando(false);
      });
  }, []);

  // Filtrado
  const alimentosFiltrados = alimentos.filter((alimento) =>
    (idioma === 'es' ? alimento.nombre_es : alimento.nombre_en)
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  // Resetear página cuando cambia filtro
  useEffect(() => {
    setPaginaActual(1);
  }, [filtro]);

  // Calcular paginación sobre los filtrados
  const totalPaginas = Math.ceil(alimentosFiltrados.length / itemsPorPagina);
  const inicio = (paginaActual - 1) * itemsPorPagina;
  const fin = inicio + itemsPorPagina;
  const alimentosPagina = alimentosFiltrados.slice(inicio, fin);

 const abrirModal = (alimento) => {
    setAlimentoModal(alimento);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setAlimentoModal(null);
  };

  const procesarAlimento = (data) => {
    console.log("Alimento a añadir:", data);
    cerrarModal();
  };

  if (cargando) return <p>Cargando alimentos...</p>;

  return (
    <div className="container mt-4">
      <FiltroAlimentos filtro={filtro} setFiltro={setFiltro} />

      {alimentosFiltrados.length === 0 ? (
        <p>
          {idioma === 'es'
            ? 'No hay alimentos que coincidan con la búsqueda.'
            : 'No foods match the search.'}
        </p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{idioma === 'es' ? 'Nombre' : 'Name'}</th>
                <th>{idioma === 'es' ? 'Calorías' : 'Calories'}</th>
                <th>{idioma === 'es' ? 'Medida' : 'Measure'}</th>
                <th>{idioma === 'es' ? 'Proteínas' : 'Proteins'}</th>
                <th>{idioma === 'es' ? 'Carbohidratos' : 'Carbs'}</th>
                <th>{idioma === 'es' ? 'Grasas' : 'Fats'}</th>
                <th>{idioma === 'es' ? 'Añadir' : 'Add'}</th>
              </tr>
            </thead>
            <tbody>
              {alimentosPagina.map((alimento, index) => (
                <tr key={alimento.id || index}>
                  <td>{idioma === 'es' ? alimento.nombre_es : alimento.nombre_en}</td>
                  <td>{alimento.calorias}</td>
                  <td>100 {alimento.medida}</td>
                  <td>{alimento.proteinas}</td>
                  <td>{alimento.carbohidratos}</td>
                  <td>{alimento.grasas}</td>
                  <td>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => abrirModal(alimento)}
                    >
                      {idioma === 'es' ? 'Editar' : 'Edit'}
                    </button>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => abrirModal(alimento)}
                    >
                      {idioma === 'es' ? 'Eliminar' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Controles paginación */}
          <div className="d-flex justify-content-between align-items-center my-3">
            <button
              className="btn btn-secondary"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual(paginaActual - 1)}
            >
              {idioma === 'es' ? 'Anterior' : 'Previous'}
            </button>

            <span>
              {idioma === 'es' ? 'Página' : 'Page'} {paginaActual} {idioma === 'es' ? 'de' : 'of'} {totalPaginas}
            </span>

            <button
              className="btn btn-secondary"
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual(paginaActual + 1)}
            >
              {idioma === 'es' ? 'Siguiente' : 'Next'}
            </button>
          </div>
        </>
      )}

      <ModalAnadirAlimento
        mostrar={mostrarModal}
        onClose={cerrarModal}
        onSubmit={procesarAlimento}
        alimento={alimentoModal}
        idioma={idioma}
      />

    </div>
  );
}
