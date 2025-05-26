import React from 'react';
import './GraficoCalorias.css';
import { PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';

export function GraficoCalorias({ consumidas, objetivo }) {
  const restante = Math.max(objetivo - consumidas, 0);

  const data = [
    { name: 'Consumidas', value: consumidas },
    { name: 'Restante', value: restante },
  ];

  const COLORS = ['#4CAF87', '#E4B363']; // Verde y gris Bootstrap-like

  return (
    <div className="grafico-calorias-wrapper position-relative py-4">
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="72%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Texto centrado encima del gráfico */}
      <div className="calorias-label position-absolute text-center top-50 start-50 translate-middle">
        <p className="mb-1 fw-bold">{consumidas} / {objetivo}</p>
        <p className="text-muted small">kcal</p>
      </div>
    </div>
  );
}