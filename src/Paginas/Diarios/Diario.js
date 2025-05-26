import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import { useState, useEffect } from 'react';
import api from '../../auth/axiosConfig';
import ListadoDiarios from '../../Componentes/Listados/ListadoDiarios/ListadoDiarios';
import ListaAlimentos from '../../Componentes/Listados/ListadoAlimentos/ListadoAlimentos';

export default function PaginaDiarios() {
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "es");
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [diarios, setDiarios] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    api.get("/diario/")
      .then((res) => {
        setDatosUsuario(res.data.foto_perfil);
        setDiarios(res.data.diarios || []);
        setIndiceActual(0);
        console.log("Datos recibidos:", res.data);
      })
      .catch((err) => {
        console.error("Error al obtener los diarios del usuario:", err);
      });
  }, []);

  const cambiarDia = (delta) => {
    setIndiceActual((prev) => Math.min(Math.max(prev + delta, 0), diarios.length - 1));
  };

  return (
    <div>
      <MenuPrincipal idioma={idioma} setIdioma={setIdioma} imagenPerfil={datosUsuario} />

      <ListadoDiarios
        diarios={diarios}
        indiceActual={indiceActual}
        cambiarDia={cambiarDia}
      />
      {/*Seccion de alimentos*/}
      <div>
        <ListaAlimentos idioma={idioma}/>
      </div>
    </div>
  );
}
