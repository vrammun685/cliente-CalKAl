import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Tarjeta.css";

export default function TarjetaDeAcciones({ idioma }) {
  const navigate = useNavigate();

  const acciones = [
    { texto: idioma === "es" ? "Añade hoy tus Alimentos que vas a consumir" : "Log today's meals and food items", ruta: "/Alimento/Añadir" },
    { texto: idioma === "es" ? "Registra tus recetas favoritas ahora" : "Save your favorite recipes now", ruta: "/Receta/Añadir" },
    { texto: idioma === "es" ? "Activa las notificaciones para no perderte nada" : "Enable notifications so you don't miss a thing", ruta: "/perfil" },
  ];

  const [indice, setIndice] = useState(0);
  const [fade, setFade] = useState("visible");

  useEffect(() => {
    const timer = setInterval(() => {
      setFade("out"); // empieza la salida
      setTimeout(() => {
        setIndice((prev) => (prev + 1) % acciones.length);
        setFade("in"); // entrada
      }, 300);
    }, 7500);

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    navigate(acciones[indice].ruta);
  };

  return (
    <div className="tarjeta-acciones">
      <div className={`texto-slide ${fade}`}>
        <p className="texto-tarjeta">{acciones[indice].texto}</p>
      </div>
      <button className="boton" onClick={handleClick}>
        {idioma === "es" ? "Ver" : "View"}
      </button>
    </div>
  );
}
