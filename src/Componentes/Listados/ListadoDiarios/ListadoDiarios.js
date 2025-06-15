import './ListadoDiarios.css';
import Loading from '../../../Paginas/Loading/Loading';
import { useState } from 'react';
import api from '../../../auth/axiosConfig';

export default function ListadoDiarios({ diarios, indiceActual, cambiarDia, recargarDiarios, idioma  }) {
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
    await recargarDiarios();
  } catch (error) {
    alert("Algo ha ido mal. Por favor, inténtalo de nuevo más tarde.");
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
    await recargarDiarios();
  } catch (error) {
    alert("Algo ha ido mal. Por favor, inténtalo de nuevo más tarde.");
  } finally {
    setLoading(false);
  }
};

  const traduccionesParteDia = {
    desayuno: { es: "Desayuno", en: "Breakfast" },
    almuerzo: { es: "Almuerzo", en: "Lunch" },
    cena: { es: "Cena", en: "Dinner" },
    otro: { es: "Otro", en: "Other" },
  };
  
  const renderParteDelDia = (titulo, diarioParte, parte) => {
    const alimentos = diarioParte.alimentos || [];
    const comidas = diarioParte.comidas || [];

    return (
      <div className="card diario-card mb-4" key={parte}>
        <div className="card-body">
          <h4>{titulo}</h4>

          {alimentos.length === 0 && comidas.length === 0 && (
            <p>{idioma === 'es' ? 'No hay elementos registrados.' : 'No items recorded.'}</p>
          )}

          {alimentos.length > 0 && (
            <>
              <h5>{idioma === 'es' ? 'Alimentos Consumidos' : 'Consumed Foods'}</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>{idioma === 'es' ? 'Nombre' : 'Name'}</th>
                      <th>{idioma === 'es' ? 'Cantidad' : 'Amount'}</th>
                      <th>{idioma === 'es' ? 'Calorías' : 'Calories'}</th>
                      <th>{idioma === 'es' ? 'Proteínas' : 'Proteins'}</th>
                      <th>{idioma === 'es' ? 'Grasas' : 'Fats'}</th>
                      <th>{idioma === 'es' ? 'Carbohidratos' : 'Carbohydrates'}</th>
                      <th>{idioma === 'es' ? 'Acciones' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alimentos.map((alimento, idx) => (
                      <tr key={alimento.id || idx}>
                        <td>{idioma === 'es' ? alimento.nombre_es : alimento.nombre_en}</td>
                        <td>{alimento.cantidad}</td>
                        <td>{alimento.calorias.toFixed(2)}</td>
                        <td>{alimento.proteinas.toFixed(2)}</td>
                        <td>{alimento.grasas.toFixed(2)}</td>
                        <td>{alimento.carbohidratos.toFixed(2)}</td>
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
              <h5>{idioma === 'es' ? 'Comidas' : 'Meals'}</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>{idioma === 'es' ? 'Nombre' : 'Name'}</th>
                      <th>{idioma === 'es' ? 'Porción' : 'Portion'}</th>
                      <th>{idioma === 'es' ? 'Calorías' : 'Calories'}</th>
                      <th>{idioma === 'es' ? 'Proteínas' : 'Proteins'}</th>
                      <th>{idioma === 'es' ? 'Grasas' : 'Fats'}</th>
                      <th>{idioma === 'es' ? 'Carbohidratos' : 'Carbohydrates'}</th>
                      <th>{idioma === 'es' ? 'Acciones' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comidas.map((comida, idx) => (
                      <tr key={comida.id || idx}>
                        <td>{comida.nombre}</td>
                        <td>{comida.porcion}</td>
                        <td>{comida.calorias.toFixed(2)}</td>
                        <td>{comida.proteinas.toFixed(2)}</td>
                        <td>{comida.grasas.toFixed(2)}</td>
                        <td>{comida.carbohidratos.toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleEliminarComida(parte, idx)}
                            disabled={!esHoy || loading}
                          >
                            {idioma === 'es' ? 'Eliminar' : 'Delete'}
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
      <h2 className="text-center mb-4">{idioma === 'es' ? 'Diario del día' : 'Daily Log'}: {diarioActual.fecha || (idioma === 'es' ? 'Sin fecha' : 'No date')}</h2>

      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => cambiarDia(-1)}
          disabled={indiceActual === 0 || loading}
        >
          {idioma === 'es' ? 'Anterior' : 'Previous'}
        </button>
        <span>
          {indiceActual + 1} {idioma === 'es' ? 'de' : 'of'} {diarios.length}
        </span>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => cambiarDia(1)}
          disabled={indiceActual === diarios.length - 1 || loading}
        >
          {idioma === 'es' ? 'Siguiente' : 'Next'}
        </button>
      </div>

      {['desayuno', 'almuerzo', 'cena', 'otro'].map((parte) =>
        renderParteDelDia(
          traduccionesParteDia[parte][idioma],
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
