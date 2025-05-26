import React from "react";

export default function FiltroAlimentos({ filtro, setFiltro }) {
    return (
      <div name="filtro">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>
    );
  }