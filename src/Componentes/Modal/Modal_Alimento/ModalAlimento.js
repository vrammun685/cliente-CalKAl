import React, { useState, useEffect } from 'react';
import api from '../../../auth/axiosConfig'; // o simplemente 'axios'

export default function ModalAnadirAlimento({ mostrar, onClose, onSubmit, alimento, idioma }) {
  const [cantidad, setCantidad] = useState('');
  const [parteDia, setParteDia] = useState('desayuno');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cantidad || !alimento) return;

    const payload = {
      alimento: alimento.id,
      cantidad: parseFloat(cantidad),
      parte_dia: parteDia,
    };

    try {
      await api.post('/diarios/crearAlimento/', payload); // envías al backend
      onSubmit(payload); // si quieres actualizar el estado en el padre
      onClose();         // cierras el modal
      setCantidad('');   // limpias campos
      setParteDia('desayuno');
    } catch (error) {
      console.error('Error al crear alimento consumido:', error);
      // aquí puedes añadir lógica para mostrar error al usuario si quieres
    }
  };


  if (!mostrar || !alimento) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {idioma === 'es' ? 'Añadir alimento' : 'Add food'}
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

              <div className="mb-3">
                <label className="form-label">{idioma === 'es' ? 'Parte del día' : 'Meal time'}</label>
                <select
                  className="form-select"
                  value={parteDia}
                  onChange={(e) => setParteDia(e.target.value)}
                >
                  <option value="desayuno">{idioma === 'es' ? 'Desayuno' : 'Breakfast'}</option>
                  <option value="almuerzo">{idioma === 'es' ? 'Almuerzo' : 'Lunch'}</option>
                  <option value="cena">{idioma === 'es' ? 'Cena' : 'Dinner'}</option>
                  <option value="otro">{idioma === 'es' ? 'Otro' : 'Other'}</option>
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
