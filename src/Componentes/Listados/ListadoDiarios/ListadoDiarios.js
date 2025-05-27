import './ListadoDiarios.css'; // Tu CSS personalizado

export default function ListadoDiarios({ diarios, indiceActual, cambiarDia }) {
  const diarioActual = diarios[indiceActual];

  const renderParteDelDia = (titulo, diarioParte) => {
    const alimentos = diarioParte.alimentos || [];
    const comidas = diarioParte.comidas || [];

    return (
      <div className="card diario-card mb-4">
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
                      <th>Proteinas</th>
                      <th>Grasas</th>
                      <th>Carbohidratos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alimentos.map((alimento, idx) => (
                      <tr key={idx}>
                        <td>{alimento.nombre_es}</td>
                        <td>{alimento.cantidad}</td>
                        <td>{alimento.calorias}</td>
                        <td>{alimento.proteinas}</td>
                        <td>{alimento.grasas}</td>
                        <td>{alimento.carbohidratos}</td>
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
              {comidas.map((comida, idx) => (
                <div key={idx} className="mb-3">
                  <strong>Porción:</strong> {comida.porcion || "-"}
                  <ul className="mt-2">
                    {Array.isArray(comida.alimentos) && comida.alimentos.length > 0 ? (
                      comida.alimentos.map((ing, i) => (
                        <li key={i}>{ing.nombre} - {ing.cantidad} {ing.medida}</li>
                      ))
                    ) : (
                      <li>No hay ingredientes</li>
                    )}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  };

  if (!diarioActual) return <p className="text-center">Cargando diarios...</p>;

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Diario del día: {diarioActual.fecha || "Sin fecha"}</h2>

      <div className="d-flex justify-content-center align-items-center mb-4">
        <button className="btn btn-navegacion me-2" onClick={() => cambiarDia(-1)} disabled={indiceActual === 0}>
          Anterior
        </button>
        <span>{indiceActual + 1} de {diarios.length}</span>
        <button className="btn btn-navegacion ms-2" onClick={() => cambiarDia(1)} disabled={indiceActual === diarios.length - 1}>
          Siguiente
        </button>
      </div>

      {['desayuno', 'almuerzo', 'cena', 'otro'].map((parte) => (
        <div key={parte}>
          {renderParteDelDia(
            parte.charAt(0).toUpperCase() + parte.slice(1),
            {
              alimentos: diarioActual.alimentos?.[parte] || [],
              comidas: diarioActual.comidas?.[parte] || []
            }
          )}
        </div>
      ))}
    </div>
  );
}
