import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RutaPrivada from '../auth/RutaPrivada';
import Presentacion from '../Paginas/Presentacion/Presentacion';
/*

import MostrarDatos from '../pages/MostrarDatos';

*/
import NotFoundPage from '../Paginas/NotFound/NotFound';
import PaginaRegistro from '../Paginas/Registro/Registro';
import PaginaLogin from '../Paginas/Login/login';
import TerminosCondiciones from '../Paginas/Terminos_Politica/TerminosCondiciones';
import PoliticaPrivacidad from '../Paginas/Terminos_Politica/PoliticaPrivacidad';
import Home from '../Paginas/Home/Home';
import PaginaRecuperarContraseñaCorreo from '../Paginas/Recuperar_Contraseña/RecuperarContraseña';
import PaginaEscribirNuevaContraseña from '../Paginas/Escribir_Nueva_Contraseña/EscribirContraseña';
import PaginaPesos from '../Paginas/Pesos/Pesos';
import PaginaDiarios from '../Paginas/Diarios/Diario';
import PaginaPerfil from '../Paginas/Perfil/PaginaPerfil';
import AdminPanel from '../Paginas/Pagina_Administracion/PanelAdmin';
import PaginaRecetas from '../Paginas/PaginaRecetas/PaginaRecetas';
import PaginaRecetasCrear from '../Paginas/PaginaRecetasCrear/PaginaRecetasCrear';


export default function AppRouter() {
  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Presentacion />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/registro/terminosYcondiciones" element={<TerminosCondiciones />} />
        <Route path="/registro/PoliticaPrivacidad" element={<PoliticaPrivacidad />} />
        <Route path="/RecuperarContraseña" element={<PaginaRecuperarContraseñaCorreo />} />
        <Route path="/RecuperarContraseña/EscribirContraseña/:uid/:token" element={<PaginaEscribirNuevaContraseña />} />
        
        {/* Rutas privadas*/}
        <Route path="/home" element={<RutaPrivada><Home /></RutaPrivada>} />
        <Route path="/pesos" element={<RutaPrivada><PaginaPesos /></RutaPrivada>} />
        <Route path="/diarios" element={<RutaPrivada><PaginaDiarios /></RutaPrivada>} />
        <Route path="/perfil" element={<RutaPrivada><PaginaPerfil /></RutaPrivada>} />
        <Route path="/recetas" element={<RutaPrivada><PaginaRecetas /></RutaPrivada>} />
        <Route path="/recetas/crear/:id?" element={<RutaPrivada><PaginaRecetasCrear /></RutaPrivada>} />
        {/* Rutas privadas
        <Route path="/datos" element={<RutaPrivada><MostrarDatos /></RutaPrivada>} />
           */}

        <Route path="/admin" element={<AdminPanel />} />
        {/* Ruta para página no encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}