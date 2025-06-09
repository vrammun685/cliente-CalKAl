import { useState, useEffect } from 'react';
import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import { GraficoCalorias } from '../../Componentes/Graficos/Grafico_Calorias/GraficoCalorias';
import { MacroBar } from '../../Componentes/Graficos/Grafico_Macros/Grafico_Macros';
import api from '../../auth/axiosConfig';
import "./Home.css"
import CarruselDeTarjetas from '../../Componentes/carrusel/Carrusel';

export default function Home() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  const [datos, setDatos] = useState({});
  
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
        console.error("Error al obtener datos del usuario:", err);
      });
  }, []);

 return (
    <>
    {datos && datos.diario && (
    <div className="home position-relative z-1 fondo">
        

        <MenuPrincipal idioma={idioma} setIdioma={setIdioma} />

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
                        <h2>{idioma === 'es' ? 'DESCUBRE NUESTRA API' : 'Use Our API'}</h2>
                        <p className='fs-4'>{idioma === 'es' ? 'Utiliza nuestra API para tus proyectos personales copiando el siguiente link' : 'Use our API for your personal projects by copying the following link'}</p>
                        <span className="copiar-enlace fs-4" onClick={() => copiarAlPortapapeles("http://127.0.0.1:8000/api/alimentos/", idioma)}>{idioma === 'es' ? 'Copiar enlace de la API' : 'Copy API link'}</span>
                    </div>
                </div>

                <div className="card-equal abajo card-con-gif">
                    <div className="contenido-lateral">
                        <h3>{idioma === 'es' ? 'NO SABES QUE COMER?' : 'Bottom Section 2'}</h3>
                        <p>{idioma === 'es' ? 'Otra sección para información adicional.' : 'Another section for extra info.'}</p>
                    </div>
                    <div className="gif-lateral">
                        <img src="/media/gif/Gif-Comida.gif" alt="GIF ilustrativo" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )}
    </>
);
}
