import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import { useState, useEffect } from 'react';
import api from '../../auth/axiosConfig';
import ListadoDiarios from '../../Componentes/Listados/ListadoDiarios/ListadoDiarios';
import ListaAlimentos from '../../Componentes/Listados/ListadoAlimentos/ListadoAlimentos';
import ListadoRecetasDiario from '../../Componentes/Listados/ListadoRecetasDiario/ListadoRecetasDiario';
import Loading from '../Loading/Loading';
import './Diario.css';

export default function PaginaDiarios() {
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "es");
  const [diarios, setDiarios] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [cargando, setCargando] = useState(true);

  // Función para cargar diarios desde backend
  const cargarDiarios = () => {
    setCargando(true);
    api.get("/diario/")
      .then((res) => {
        setDiarios(res.data.diarios || []);
        setIndiceActual(0);
        setCargando(false);
        console.log("Datos recibidos:", res.data);
      })
      .catch((err) => {
        alert("Algo ha ido mal. Por favor, inténtalo de nuevo más tarde.");
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarDiarios();
  }, []);

  const cambiarDia = (delta) => {
    setIndiceActual((prev) => Math.min(Math.max(prev + delta, 0), diarios.length - 1));
  };

  // Esta función ya NO modifica localmente el estado.
  // En vez de eso, simplemente recarga los diarios tras añadir alimento
 

  if (cargando) return <Loading />;

  return (
    <div className=" fondo">
      <MenuPrincipal idioma={idioma} setIdioma={setIdioma} />

      <div className="contenido-principal">
        {/* Tarjeta: Diarios */}
        <div className="tarjeta-contenedor">
          <div className="tarjeta">
            <ListadoDiarios
              diarios={diarios}
              indiceActual={indiceActual}
              cambiarDia={cambiarDia}
              recargarDiarios={cargarDiarios}
              idioma={idioma}
            />
          </div>
        </div>

        {/* Tarjetas: Alimentos y Recetas */}
        <div className="tarjetas-secundarias">
          <div className="tarjeta">
            <h5 className="titulo-tarjeta">
              {idioma === 'es' ? 'Añadir Alimentos' : 'Add Foods'}
            </h5>
            <ListaAlimentos idioma={idioma} onAgregar={cargarDiarios} />
          </div>

          <div className="tarjeta">
            <h5 className="titulo-tarjeta">
              {idioma === 'es' ? 'Añadir Recetas' : 'Add Recipes'}
            </h5>
            <ListadoRecetasDiario idioma={idioma} onAgregar={cargarDiarios} />
          </div>
        </div>
      </div>
    </div>
  );
}
