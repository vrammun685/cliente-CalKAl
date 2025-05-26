import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Carrusel.css"; // Asegúrate de tener aquí los estilos base

export default function CarruselDeTarjetas({ idioma }) {
  const [indice, setIndice] = useState(0);
  const [fade, setFade] = useState("visible");
  const navigate = useNavigate();

  const tarjetas = [
    {
      texto: idioma === "es" ? "Añade hoy tus Alimentos que vas a consumir" : "Log today's meals and food items",
      ruta: "/Alimento/Añadir",
    },
    {
      texto: idioma === "es" ? "Registra tus recetas favoritas ahora" : "Save your favorite recipes now",
      ruta: "/Receta/Añadir",
    },
    {
      texto: idioma === "es" ? "Activa las notificaciones para no perderte nada" : "Enable notifications so you don't miss a thing",
      ruta: "/perfil",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFade("out");
      setTimeout(() => {
        setIndice((prev) => (prev + 1) % tarjetas.length);
        setFade("in");
      }, 300);
    }, 7500);

    return () => clearInterval(timer);
  }, [tarjetas.length]);

  const handleClick = () => {
    navigate(tarjetas[indice].ruta);
  };

  return (
    <div className="tarjeta-acciones">
      <div className={`contenido ${fade}`}>
        <p className="texto">{tarjetas[indice].texto}</p>
        <button className="boton" onClick={handleClick}>
          {idioma === "es" ? "Ver" : "View"}
        </button>
      </div>
    </div>
  );
}
