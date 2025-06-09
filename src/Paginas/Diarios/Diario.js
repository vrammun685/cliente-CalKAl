import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import { useState, useEffect } from 'react';
import api from '../../auth/axiosConfig';
import ListadoDiarios from '../../Componentes/Listados/ListadoDiarios/ListadoDiarios';
import ListaAlimentos from '../../Componentes/Listados/ListadoAlimentos/ListadoAlimentos';
import ListadoRecetasDiario from '../../Componentes/Listados/ListadoRecetasDiario/ListadoRecetasDiario';

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
        console.error("Error al obtener los diarios del usuario:", err);
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
 

  if (cargando) return <p>Cargando diarios...</p>;

  return (
    <div>
      <MenuPrincipal idioma={idioma} setIdioma={setIdioma} />

      <ListadoDiarios
        diarios={diarios}
        indiceActual={indiceActual}
        cambiarDia={cambiarDia}
        recargarDiarios={cargarDiarios}
      />

      {/*Seccion de alimentos*/}
      <div className="row">
        <div className="col-md-6">
          {/* Pasamos la función que recarga el diario tras añadir */}
          <ListaAlimentos idioma={idioma} onAgregar={cargarDiarios} />
        </div>
        <div className="col-md-6">
          <ListadoRecetasDiario idioma={idioma} onAgregar={cargarDiarios}/>
        </div>
      </div>
    </div>
  );
}
