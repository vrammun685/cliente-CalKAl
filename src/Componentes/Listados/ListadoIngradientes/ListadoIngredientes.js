import { useEffect, useState } from 'react';
import api from '../../../auth/axiosConfig';

export default function DetalleReceta({ receta, onCerrar, idioma }) {
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    if (receta?.id) {
      api.get(`/ingredientes/${receta.id}/`)
        .then(res => setIngredientes(res.data.ingredientes || []))
        .catch(err => console.error("Error cargando ingredientes:", err));
    }
  }, [receta]);

  if (!receta) return (
    <div className="card mt-3">
      <div className="card-body">
        <p className="text-muted">
          {idioma === 'es' ? 'Selecciona una receta para ver los detalles.' : 'Select a recipe to see details.'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="card mt-3">
      <div className="card-body">
        {/* Datos generales de la receta */}
        <h4>{receta.nombre}</h4>
        <p><strong>{idioma === 'es' ? 'Calorías:' : 'Calories:'}</strong> {receta.calorias.toFixed(1)}</p>
        <p><strong>{idioma === 'es' ? 'Porciones:' : 'Servings:'}</strong> {receta.numeroPorciones}</p>
        <p><strong>{idioma === 'es' ? 'Proteínas:' : 'Proteins:'}</strong> {receta.proteinas.toFixed(1)} g</p>
        <p><strong>{idioma === 'es' ? 'Grasas:' : 'Fats:'}</strong> {receta.grasas.toFixed(1)} g</p>
        <p><strong>{idioma === 'es' ? 'Carbohidratos:' : 'Carbohydrates:'}</strong> {receta.carbohidratos.toFixed(1)} g</p>

        {/* Tabla de ingredientes */}
        <h5 className="mt-4">{idioma === 'es' ? 'Ingredientes' : 'Ingredients'}</h5>
        {ingredientes.length === 0 ? (
          <p>{idioma === 'es' ? 'No hay ingredientes cargados.' : 'No ingredients loaded.'}</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-2">
              <thead>
                <tr>
                  <th>{idioma === 'es' ? 'Nombre' : 'Name'}</th>
                  <th>{idioma === 'es' ? 'Cantidad' : 'Amount'}</th>
                  <th>{idioma === 'es' ? 'Medida' : 'Unit'}</th>
                  <th>{idioma === 'es' ? 'Calorías' : 'Calories'}</th>
                  <th>{idioma === 'es' ? 'Grasas' : 'Fats'}</th>
                  <th>{idioma === 'es' ? 'Proteínas' : 'Proteins'}</th>
                  <th>{idioma === 'es' ? 'Carbohidratos' : 'Carbohydrates'}</th>
                </tr>
              </thead>
              <tbody>
                {ingredientes.map((ing, i) => (
                  <tr key={i}>
                    <td>{idioma === 'es' ? ing.nombre_es : ing.nombre_en}</td>
                    <td>{ing.cantidad}</td>
                    <td>{ing.medida}</td>
                    <td>{ing.calorias_totales?.toFixed(2)}</td>
                    <td>{ing.grasas_totales?.toFixed(2)}</td>
                    <td>{ing.proteinas_totales?.toFixed(2)}</td>
                    <td>{ing.carbohidratos_totales?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Botón cerrar */}
        <button className="btn btn-secondary mt-3" onClick={onCerrar}>
          {idioma === 'es' ? 'Cerrar' : 'Close'}
        </button>
      </div>
    </div>
  );
}
