import React from 'react';
import "./FiltroPesos.css";

const opcionesFiltro = [
  { id: 'todo', label: 'Todo' },
  { id: '1year', label: 'Último año' },
  { id: '3months', label: 'Últimos 3 meses' },
  { id: '1month', label: 'Último mes' },
  { id: '1week', label: 'Última semana' },
];

export default function FiltroPesos({ filtro, setFiltro, idioma }) {
  const translateLabel = (label) => {
    const map = {
      'Todo': 'All',
      'Último año': 'Last year',
      'Últimos 3 meses': 'Last 3 months',
      'Último mes': 'Last month',
      'Última semana': 'Last week',
    };
    return map[label] || label;
  };

  return (
    <div className="d-flex justify-content-center mb-4 flex-wrap gap-3 py-3">
      {opcionesFiltro.map(opcion => (
        <button
          key={opcion.id}
          type="button"
          className={`btn filtro-btn ${filtro === opcion.id ? 'active' : ''}`}
          onClick={() => setFiltro(opcion.id)}
        >
          {idioma === 'es' ? opcion.label : translateLabel(opcion.label)}
        </button>
      ))}
    </div>
  );
}
