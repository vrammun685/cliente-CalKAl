import './Presentacion.css'
import { useState } from 'react';
import { CambioIdioma } from '../../Componentes/Selector_Idioma/SelectorIdiom';
import { FondoCambiante } from '../../Componentes/Video_Fondo/Videofondo';
import { useNavigate } from 'react-router-dom';



export default function PaginaPresentacion() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  const [logoAnimado, setLogoAnimado] = useState(false);
  const navigate = useNavigate();

  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('idioma', nuevoIdioma);
  };
    
  const irARegistro = () => {
    navigate('/registro');
  };

  const irALogin = () => {
    navigate('/login');
  };

  const copiarAlPortapapeles = async (enlace, idioma) => {
    try {
      await navigator.clipboard.writeText(enlace);
      alert(idioma === 'es' ? 'Enlace copiado al portapapeles' : 'Use Our API');
    } catch (err) {
      alert(idioma === 'es' ? 'Error al copiar el enlace' : 'Use Our API');
      console.error(err);
    }
  };

  return (
    <div className="pagina-presentacion">
    {/*Seccion de presentacion principal */}
    <section className="seccion-video d-flex justify-content-center align-items-center">
        <FondoCambiante className="video-fondo" />
        
        {/* Selector de idioma */}
        <CambioIdioma className="cambioIdioma" idioma={idioma} onChangeIdioma={cambiarIdioma} />
        

        <div className="tarjeta-Presentacion container text-center">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <img className="imagen-logo img-fluid mb-3" src="/media/logo.png" alt="logo" />
              <h1 className="titulo">{idioma === 'es' ? 'Bienvenido a CalKal' : 'Welcome to CalKal'}</h1>
              <p className="subtitulo">
                {idioma === 'es'
                  ? 'Tu guía de alimentación, salud y bienestar.'
                  : 'Your guide to food, health, and wellness.'}
              </p>
              <a href="#info">
                <button className="boton-inicio">
                  {idioma === 'es' ? '¡Empecemos!' : "Let's get started!"}
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/*Seccion de informacion*/}
      <section id="info" className="descripcion-app">
        <div className="text-center mb-4">
          <img src="/media/gif/Gif-Comida.gif" alt="GIF de comida" style={{ maxHeight: "150px" }} />
          <h2 className="titulo-seccion">
            {idioma === 'es' ? 'Sobre nosotros' : 'About us'}
          </h2>
        </div>
        
        <div className="tarjetas-info">
          {/*Tarjeta de informacion*/}
          <div className="tarjeta-info">
            <i className="bi bi-info-circle fs-1 iconos"></i>
            <h3>{idioma === 'es' ? '¿Qué es CalKal?' : 'What is CalKal?'}</h3>
            <p>
              {idioma === 'es'
                ? 'Una aplicación para registrar tus comidas, controlar tus calorías y mejorar tus hábitos diarios.'
                : 'An app to log meals, track calories, and improve your daily habits.'}
            </p>
          </div>
          
          {/*Tarjeta de Por que*/}
          <div className="tarjeta-info">
            <i className="bi bi-question-circle fs-1 iconos"></i> 
            <h3>{idioma === 'es' ? '¿Por qué elegirnos?' : 'Why choose us?'}</h3>
            <p>
              {idioma === 'es'
                ? 'Porque combinamos salud, tecnología y simplicidad para ayudarte a alcanzar tus objetivos de bienestar.'
                : 'Because we combine health, technology, and simplicity to help you achieve your wellness goals.'}
            </p>
          </div>

          {/*Tarjeta de Contacto*/}
          <div className="tarjeta-info">
            <i className="bi bi-envelope fs-1 iconos"></i>
            <h3>{idioma === 'es' ? 'Contacto' : 'Contact'}</h3>
            <p>
              {idioma === 'es'
                ? 'Si encuentras algún problema, contáctanos mediante:'
                : 'If you encounter any issue, contact us at:'}
            </p>
            <p><strong>calkal685@gmail.com</strong></p>
          </div>

          <div className="tarjeta-info">
            <i className="bi bi-envelope fs-1 iconos"></i>
            <h3>API</h3>
            <p>
              {idioma === 'es'
                ? 'Aqui puedes utilizar nuestra api con todos los alimentos que manejamos'
                : 'Here you can use our API with all the foods we manage'}
            </p>
            <span className="copiarEnlace fs-4" onClick={() => copiarAlPortapapeles("http://127.0.0.1:8000/api/alimentos/", idioma)}>API</span>
          </div>
        </div>
        
        <div className="container mt-4">
          <div className="row justify-content-center g-3">
              <div className="col-6 col-md-5">
                <button className="boton-extra" onClick={irARegistro}>
                  {idioma === 'es' ? 'Registrarse' : 'Create account'}
                </button>
              </div>
              <div className="col-6 col-md-5">
                <button className="boton-extra" onClick={irALogin}>
                  {idioma === 'es' ? 'Iniciar Sesión' : 'Log In'}
                </button>
              </div>
          </div>
        </div>      
      </section>
    </div>
  );
}
