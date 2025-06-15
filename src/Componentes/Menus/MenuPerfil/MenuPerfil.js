import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import api from '../../../auth/axiosConfig'; // Asegúrate de importar tu instancia de Axios
import './MenuPerfil.css';

export default function MenuPerfil({ idioma }) {
  const [open, setOpen] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const { logout } = useAuth();
  const redireccion = useNavigate();
  const ref = useRef(null);

  const CerrarSesion = async () => {
    try {
      await logout();
      redireccion('/login');
    } catch (error) {
      alert("Algo ha ido mal. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  useEffect(() => {
    const fetchImagenPerfil = async () => {
      try {
        const response = await api.get('/imagenPrefil/');
        const imagen = response.data.foto_perfil;
        setImagenPerfil(imagen || '/media/img/imagenSinPerfil.jpg');
      } catch (error) {
        setImagenPerfil('/media/img/imagenSinPerfil.jpg');
      }
    };

    fetchImagenPerfil();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="perfil-dropdown" ref={ref}>
      {imagenPerfil && (
        <img
          src={imagenPerfil}
          alt="Perfil"
          className="perfil-imagen"
          onClick={() => setOpen(!open)}
        />
      )}
      {open && (
        <div className="perfil-menu">
          <Link to="/perfil">{idioma === 'es' ? 'Perfil' : 'Profile'}</Link>
          <button onClick={CerrarSesion}>{idioma === 'es' ? 'Cerrar Sesión' : 'Log out'}</button>
        </div>
      )}
    </div>
  );
}
