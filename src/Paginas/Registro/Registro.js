import FormularioRegistro from '../../Componentes/Formularios/Formulario_Registro/FormularioRegistro';
import { CambioIdioma } from "../../Componentes/Selector_Idioma/SelectorIdiom";
import React, { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';

export default function PaginaRegistro() {
  const [loading, setLoading] = useState(true);
  
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');

  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('idioma', nuevoIdioma);
  };

  useEffect(() => {
    // Scroll arriba inmediato
    window.scrollTo(0, 0);

    // Simulamos un tiempo corto de "carga"
    const timer = setTimeout(() => {
      setLoading(false); // quitamos la pantalla de carga y mostramos el formulario
    }, 0); // 300ms o el tiempo que necesites

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />
  }

  return(
    <div className='cartel-presentacion'>
        <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} className="cambioIdioma"/>
        <FormularioRegistro idioma={idioma}/>
    </div>
  );
  
}