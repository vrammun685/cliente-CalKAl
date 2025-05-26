import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import './MenuPerfil.css'
export default function MenuPerfil({ idioma, imagenPerfil }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const redireccion = useNavigate();
  const ref = useRef(null);

  const CerrarSesion = async () => {
    try {
      await logout();
      redireccion('/login');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

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
      <img
        src={imagenPerfil}
        alt="Perfil"
        className="perfil-imagen"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="perfil-menu">
          <Link to="/perfil">{idioma === 'es' ? 'Perfil' : 'Profile'}</Link>
          <button onClick={CerrarSesion}>{idioma === 'es' ? 'Cerrar Sesion' : 'Log out'}</button>
        </div>
      )}
    </div>
  );
}
