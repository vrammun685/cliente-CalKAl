import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area } from 'recharts';

export default function GraficoPesos({ pesos }) {
  const datosOrdenados = [...pesos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  const datosGrafico = datosOrdenados.map(peso => ({
    fecha: peso.fecha,  
    peso: peso.peso
  }));

  const minPeso = Math.floor(Math.min(...datosGrafico.map(p => p.peso)) / 10) * 10;
  const maxPeso = Math.ceil(Math.max(...datosGrafico.map(p => p.peso)) / 10) * 10;

  const ticks = [];
  for (let i = minPeso; i <= maxPeso; i += 10) {
    ticks.push(i);
  }

  return (
    <div>
      <ResponsiveContainer width="99%" height={500}>
        <LineChart  key={JSON.stringify(datosGrafico)} data={datosGrafico}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />

          <XAxis dataKey="fecha" />
          <YAxis domain={[minPeso, maxPeso]} ticks={ticks} />
          
          <Tooltip cursor={false} />

          {/* Línea de peso encima */}
          <Line
            type="linear"
            dataKey="peso"
            stroke="#4CAF87"
            strokeWidth={2}
            dot={true}
            isAnimationActive={true}  // Asegúrate que la animación está activa
            animationDuration={2500}  // Duración en ms
            animationEasing="ease"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}