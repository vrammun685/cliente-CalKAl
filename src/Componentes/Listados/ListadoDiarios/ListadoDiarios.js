import './ListadoDiarios.css';
import Loading from '../../../Paginas/Loading/Loading';
import { useState } from 'react';
import api from '../../../auth/axiosConfig';

export default function ListadoDiarios({ diarios, indiceActual, cambiarDia, recargarDiarios  }) {
  const [loading, setLoading] = useState(false);
  const diarioActual = diarios[indiceActual];
  const hoy = new Date().toISOString().slice(0, 10);
  const esHoy = diarioActual?.fecha === hoy;

  if (!diarioActual) return <Loading />;

  const comidasPorParte = Array.isArray(diarioActual.comidas)
    ? diarioActual.comidas.reduce((acc, comida) => {
        const parte = comida.parte_del_dia?.toLowerCase();
        if (!acc[parte]) acc[parte] = [];
        acc[parte].push(comida);
        return acc;
      }, {})
    : diarioActual.comidas || {};

const handleEliminarAlimento = async (parte, idx) => {
  if (loading) return;

  const alimento = diarioActual.alimentos?.[parte]?.[idx];
  if (!alimento?.id) return;

  try {
    setLoading(true);
    await api.delete(`/diarios/crearAlimento/${alimento.id}/`);
    await recargarDiarios(); // 🔄 Refresca desde el backend
  } catch (error) {
    console.error('Error eliminando alimento:', error);
  } finally {
    setLoading(false);
  }
};

const handleEliminarComida = async (parte, idx) => {
  if (loading) return;

  const comida = comidasPorParte?.[parte]?.[idx];
  if (!comida?.id) return;

  try {
    setLoading(true);
    await api.delete(`/diarios/crearReceta/${comida.id}/`);
    await recargarDiarios(); // 🔄 Refresca desde el backend
  } catch (error) {
    console.error('Error eliminando comida:', error);
  } finally {
    setLoading(false);
  }
};


  const renderParteDelDia = (titulo, diarioParte, parte) => {
    const alimentos = diarioParte.alimentos || [];
    const comidas = diarioParte.comidas || [];

    return (
      <div className="card diario-card mb-4" key={parte}>
        <div className="card-body">
          <h4>{titulo}</h4>

          {alimentos.length === 0 && comidas.length === 0 && (
            <p>No hay elementos registrados.</p>
          )}

          {alimentos.length > 0 && (
            <>
              <h5>Alimentos Consumidos</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Calorías</th>
                      <th>Proteínas</th>
                      <th>Grasas</th>
                      <th>Carbohidratos</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alimentos.map((alimento, idx) => (
                      <tr key={alimento.id || idx}>
                        <td>{alimento.nombre_es}</td>
                        <td>{alimento.cantidad}</td>
                        <td>{alimento.calorias}</td>
                        <td>{alimento.proteinas}</td>
                        <td>{alimento.grasas}</td>
                        <td>{alimento.carbohidratos}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleEliminarAlimento(parte, idx)}
                            disabled={!esHoy || loading}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {comidas.length > 0 && (
            <>
              <h5>Comidas</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Porción</th>
                      <th>Calorías</th>
                      <th>Proteínas</th>
                      <th>Grasas</th>
                      <th>Carbohidratos</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comidas.map((comida, idx) => (
                      <tr key={comida.id || idx}>
                        <td>{comida.nombre}</td>
                        <td>{comida.porcion || '-'}</td>
                        <td>{comida.calorias || '-'}</td>
                        <td>{comida.proteinas || '-'}</td>
                        <td>{comida.grasas || '-'}</td>
                        <td>{comida.carbohidratos || '-'}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleEliminarComida(parte, idx)}
                            disabled={!esHoy || loading}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Diario del día: {diarioActual.fecha || 'Sin fecha'}</h2>

      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          className="btn btn-navegacion me-2"
          onClick={() => cambiarDia(-1)}
          disabled={indiceActual === 0 || loading}
        >
          Anterior
        </button>
        <span>
          {indiceActual + 1} de {diarios.length}
        </span>
        <button
          className="btn btn-navegacion ms-2"
          onClick={() => cambiarDia(1)}
          disabled={indiceActual === diarios.length - 1 || loading}
        >
          Siguiente
        </button>
      </div>

      {['desayuno', 'almuerzo', 'cena', 'otro'].map((parte) =>
        renderParteDelDia(
          parte.charAt(0).toUpperCase() + parte.slice(1),
          {
            alimentos: diarioActual.alimentos?.[parte] || [],
            comidas: comidasPorParte?.[parte] || [],
          },
          parte
        )
      )}
    </div>
  );
}
