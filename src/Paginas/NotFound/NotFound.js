import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Solo si usás React Router
import './NotFound.css';


export default function NotFoundPage() {
  const [idioma, setIdioma] = useState('');

  useEffect(() => {
    // Leer el idioma del localStorage (por defecto 'es' si no hay nada)
    const storedIdioma = localStorage.getItem('idioma') || 'es';
    setIdioma(storedIdioma);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '100vh' }}>
      <h1 className="display-1 fw-bold texto-rojo">¡¡¡404!!!</h1>
      <p className="fs-1">
        <span className="texto-rojo">Oops!</span> {idioma === 'es' ? 'Página no encontrada.' : 'Page not found.'}
      </p>
      <p className="lead">
        {idioma === 'es'
          ? 'La página que estás buscando no existe o fue movida.'
          : 'The page you are looking for does not exist or was moved.'}
      </p>
      <Link to="/home" className="btn boton-error">
        {idioma === 'es' ? 'Volver al inicio' : 'Go back home'}
      </Link>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='ola-error'>
        <path fill="#ae4342" fill-opacity="1" d="M0,256L26.7,261.3C53.3,267,107,277,160,256C213.3,235,267,181,320,154.7C373.3,128,427,128,480,138.7C533.3,149,587,171,640,197.3C693.3,224,747,256,800,261.3C853.3,267,907,245,960,224C1013.3,203,1067,181,1120,149.3C1173.3,117,1227,75,1280,58.7C1333.3,43,1387,53,1413,58.7L1440,64L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>
      </svg>
    </div>
  );
}