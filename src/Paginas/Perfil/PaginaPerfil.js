import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import { useState, useEffect } from 'react';
import api from '../../auth/axiosConfig';
import Loading from '../Loading/Loading';
import FormularioPerfil from '../../Componentes/Formularios/Formulario_Ver_Perfil/FormularioPerfil';

export default function PaginaPerfil() {
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "es");
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [imagen_perfil, setImagenPerfil] = useState(null);

  useEffect(() => {
    api.get("/perfil/")
      .then((res) => {
        setDatosUsuario(res.data.Datos_Usuario);
        setImagenPerfil(res.data.imagen_perfil);

      })
      .catch((err) => {
        console.error("Error al obtener perfil:", err);
      });
  }, []);

  if (!datosUsuario) {
    return <Loading />;
  }

  return (
    <div class="home">
      <MenuPrincipal idioma={idioma} setIdioma={setIdioma} imagenPerfil={imagen_perfil} />
      
      {/* Depuración: mostrar todos los datos como JSON */}
      <FormularioPerfil datosUsuarioInicial={datosUsuario} imagenPerfil={imagen_perfil} idioma={idioma}/>
    </div>
  );
}