import { useState, useEffect } from 'react';

export default function ModalAnadirAlimentoReceta({ mostrar, onClose, onSubmit, alimento, idioma }) {
  const [cantidad, setCantidad] = useState('');
  const [nutrientes, setNutrientes] = useState({
    calorias: 0,
    proteinas: 0,
    grasas: 0,
    carbohidratos: 0,
  });

  useEffect(() => {
    if (alimento && cantidad) {
      const factor = parseFloat(cantidad) / 100;
      setNutrientes({
        calorias: (alimento.calorias * factor).toFixed(1),
        proteinas: (alimento.proteinas * factor).toFixed(1),
        grasas: (alimento.grasas * factor).toFixed(1),
        carbohidratos: (alimento.carbohidratos * factor).toFixed(1),
      });
    } else {
      setNutrientes({
        calorias: 0,
        proteinas: 0,
        grasas: 0,
        carbohidratos: 0,
      });
    }
  }, [cantidad, alimento]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cantidad || !alimento) return;

    const payload = {
      alimento,
      cantidad: parseFloat(cantidad),
      nutrientes: { ...nutrientes }, // Por si quieres mostrar valores antes de guardar
    };

    onSubmit(payload);
    onClose();
    setCantidad('');
  };

  if (!mostrar || !alimento) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {idioma === 'es' ? 'Añadir ingrediente' : 'Add ingredient'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p><strong>{idioma === 'es' ? alimento.nombre_es : alimento.nombre_en}</strong></p>

              <div className="mb-3">
                <label className="form-label">{idioma === 'es' ? 'Cantidad (g)' : 'Amount (g)'}</label>
                <input
                  type="number"
                  className="form-control"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="mb-2"><strong>{idioma === 'es' ? 'Calorías' : 'Calories'}:</strong> {nutrientes.calorias}</div>
              <div className="mb-2"><strong>{idioma === 'es' ? 'Proteínas' : 'Proteins'}:</strong> {nutrientes.proteinas}</div>
              <div className="mb-2"><strong>{idioma === 'es' ? 'Grasas' : 'Fats'}:</strong> {nutrientes.grasas}</div>
              <div className="mb-2"><strong>{idioma === 'es' ? 'Carbohidratos' : 'Carbs'}:</strong> {nutrientes.carbohidratos}</div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {idioma === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button type="submit" className="btn btn-primary">
                {idioma === 'es' ? 'Añadir' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
