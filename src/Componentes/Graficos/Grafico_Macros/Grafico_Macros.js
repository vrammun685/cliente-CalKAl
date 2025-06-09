import "./Grafico_Macros.css"

export function MacroBar({ nombreES, nombreEN, valor, maximo, color, idioma }) {
  const porcentaje = Math.min((valor / maximo) * 100, 100);

  // Determinar color de fondo de la barra
  let barraColor = "bg-success"; // color por defecto

  // Si se pasa un color personalizado, úsalo en style directamente
  const customStyle = {
    width: `${porcentaje}%`,
    backgroundColor: color ? `#${color}` : undefined,
    color: color ? `#${color}` : undefined,
  };

  return (
    <div className="macro-bar  py-3">
      <div className="macro-bar-header text-center">
        <p className="titulo-macros" style={{ color: `#${color}` }}>{idioma === 'es' ? nombreES : nombreEN}</p>
        <div className="macro-bar-subtext">
          {valor.toFixed(2)}g / {maximo.toFixed(2)}g
        </div>
      </div>
      <div className="progress macro-bar-progress">
        <div
          className={`progress-bar ${!color ? barraColor : ""}`}
          role="progressbar"
          style={customStyle}
          aria-valuenow={valor}
          aria-valuemin="0"
          aria-valuemax={maximo}
        >
          {Math.round(porcentaje)}%
        </div>
      </div>
    </div>
  );
}

