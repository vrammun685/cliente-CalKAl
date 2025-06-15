import { useState, useEffect } from 'react';
import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import { GraficoCalorias } from '../../Componentes/Graficos/Grafico_Calorias/GraficoCalorias';
import { MacroBar } from '../../Componentes/Graficos/Grafico_Macros/Grafico_Macros';
import api from '../../auth/axiosConfig';
import "./Home.css"
import CarruselDeTarjetas from '../../Componentes/carrusel/Carrusel';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  const [datos, setDatos] = useState({});
  const navigate = useNavigate();

  const copiarAlPortapapeles = async (enlace, idioma) => {
    try {
      await navigator.clipboard.writeText(enlace);
      alert(idioma === 'es' ? 'Enlace copiado al portapapeles' : 'Use Our API');
    } catch (err) {
      alert(idioma === 'es' ? 'Error al copiar el enlace' : 'Use Our API');
      console.error(err);
    }
  };

  useEffect(() => {
    api.get('/home/')
      .then(res => {
        setDatos(res.data);
        console.log("Datos del usuario:", res.data);
      })
      .catch(err => {
        alert("Algo ha ido mal. Por favor, inténtalo de nuevo más tarde.");
      });
  }, []);

 return (
    <>
    
    <div className="home position-relative z-1 fondo">
        

        <MenuPrincipal idioma={idioma} setIdioma={setIdioma} />
        {datos && datos.diario && (
        <div className="content-wrapper">
            {/* Fila superior */}
            <div className="row-custom top-row">
                <div className="card-equal centrado">
                    <MacroBar idioma={idioma} color="EF6461" nombreES="Proteínas" nombreEN="Proteins" valor={datos.diario.proteinas_Consumidas} maximo={datos.diario.proteinas_a_Consumir} />
                    <MacroBar idioma={idioma} color="E4B363" nombreES="Grasas" nombreEN="Fats" valor={datos.diario.grasas_Consumidas} maximo={datos.diario.grasas_a_Consumir} />
                    <MacroBar idioma={idioma} color="4CAF87" nombreES="Carbohidratos" nombreEN="Carbohydrates" valor={datos.diario.carbohidratos_Consumidas} maximo={datos.diario.carbohidratos_a_Consumir} />
                </div>

                <div className="card-equal centrado">
                    <GraficoCalorias consumidas={datos.diario.calorias_Consumidas} objetivo={datos.diario.calorias_a_Consumir} />
                </div>

                <div className="card-equal centrado">
                    <CarruselDeTarjetas idioma={idioma} />
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="ola-svg" viewBox="0 0 1440 320"><path fill="#E4B363" fill-opacity="1" d="M0,96L48,85.3C96,75,192,53,288,64C384,75,480,117,576,165.3C672,213,768,267,864,282.7C960,299,1056,277,1152,272C1248,267,1344,277,1392,282.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div>
            </div>

            {/* Fila inferior */}
            <div className="row-custom bottom-row fila-abajo">
                <div className="card-equal abajo card-con-video">
                    <video autoPlay muted loop playsInline className="background-video">
                        <source src="/media/fondos/video4.mp4" type="video/mp4" />
                        Tu navegador no soporta video HTML5.
                    </video>
                    <div className="contenido-sobre-video">
                        <h2>{idioma === 'es' ? 'DESCUBRE NUESTRA API' : 'USE OUR API'}</h2>
                        <p className='fs-4'>{idioma === 'es' ? 'Utiliza nuestra API para tus proyectos personales copiando el siguiente link' : 'Use our API for your personal projects by copying the following link'}</p>
                        <span className="copiar-enlace fs-4" onClick={() => copiarAlPortapapeles(`${process.env.REACT_APP_API_URL}/alimentos/`, idioma)}>{idioma === 'es' ? 'Copiar enlace de la API' : 'Copy API link'}</span>
                    </div>
                </div>

                <div className="card-equal abajo card-con-gif">
                    <div className="contenido-lateral">
                        <h3>{idioma === 'es' ? '¿NO SABES QUÉ COMER?' : "DON'T KNOW WHAT TO EAT?"}</h3>
                        <p>{idioma === 'es' ? 'Crea una receta y añádela al diario' : 'Create a recipe and add it to your journal'}</p>

                        <button
                        className="boton mt-3"
                        onClick={() => navigate('/recetas')}
                        >
                        {idioma === "es" ? "Ver recetas" : "View Recipes"}
                        </button>
                    </div>

                    <div className="gif-lateral">
                        <img src="/media/gif/Gif-Comida.gif" alt="GIF ilustrativo" />
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>
    
    </>
);
}
