import { useState, useEffect } from 'react';
import api from '../../../auth/axiosConfig';

export default function ModalAnadirReceta({ mostrar, onClose, onSubmit, receta, idioma, procesando }) {
  const [numPersonas, setNumPersonas] = useState(1);
  const [parteDia, setParteDia] = useState('desayuno');
  const [nutrientes, setNutrientes] = useState({
    calorias: 0,
    proteinas: 0,
    grasas: 0,
    carbohidratos: 0,
  });

  useEffect(() => {
    if (receta && numPersonas) {
        const factor = parseFloat(numPersonas) / receta.numeroPorciones;

        setNutrientes({
        calorias: (receta.calorias * factor).toFixed(1),
        proteinas: (receta.proteinas * factor).toFixed(1),
        grasas: (receta.grasas * factor).toFixed(1),
        carbohidratos: (receta.carbohidratos * factor).toFixed(1),
        });
    } else {
        setNutrientes({
        calorias: 0,
        proteinas: 0,
        grasas: 0,
        carbohidratos: 0,
        });
    }
    }, [numPersonas, receta]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numPersonas || !receta) return;

    const payload = {
      comida: receta.id,
      porcion_a_comer: parseFloat(numPersonas),
      parte_del_dia: parteDia,
    };

    try {
      await api.post('/diarios/crearReceta/', payload);
      
      // ✅ Primero cerrar modal, luego notificar al padre
      onClose();
      setNumPersonas(1);
      setParteDia('Desayuno');

      if (onSubmit) onSubmit(); // Esto recarga los diarios en el padre

    } catch (error) {
      console.error('Error al añadir receta al diario:', error);
    }
  };

  if (!mostrar || !receta) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {idioma === 'es' ? 'Añadir receta' : 'Add recipe'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p><strong>{idioma === 'es' ? receta.nombre_es : receta.nombre_en}</strong></p>

              <div className="mb-3">
                <label className="form-label">
                  {idioma === 'es' ? 'Número de porciones' : 'Number of servings'}
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={numPersonas}
                  onChange={(e) => setNumPersonas(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">{idioma === 'es' ? 'Parte del día' : 'Meal time'}</label>
                <select
                  className="form-select"
                  value={parteDia}
                  onChange={(e) => setParteDia(e.target.value)}
                >
                  <option value="Desayuno">Desayuno</option>
                  <option value="Almuerzo">Almuerzo</option>
                  <option value="Cena">Cena</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">{idioma === 'es' ? 'Calorías' : 'Calories'}: {nutrientes.calorias}</label>
              </div>
              <div className="mb-2">
                <label className="form-label">{idioma === 'es' ? 'Proteínas' : 'Proteins'}: {nutrientes.proteinas}</label>
              </div>
              <div className="mb-2">
                <label className="form-label">{idioma === 'es' ? 'Grasas' : 'Fats'}: {nutrientes.grasas}</label>
              </div>
              <div className="mb-2">
                <label className="form-label">{idioma === 'es' ? 'Carbohidratos' : 'Carbs'}: {nutrientes.carbohidratos}</label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {idioma === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button type="submit" className="btn btn-primary" disabled={procesando}>
                {idioma === 'es' ? 'Añadir' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
