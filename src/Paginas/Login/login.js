import { useState } from 'react';
import { CambioIdioma } from '../../Componentes/Selector_Idioma/SelectorIdiom';
import { FormularioLogin } from '../../Componentes/Formularios/Formulario_Login/FormularioLogin';

export default function PaginaLogin() {
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  
    const cambiarIdioma = (nuevoIdioma) => {
      setIdioma(nuevoIdioma);
      localStorage.setItem('idioma', nuevoIdioma);
    };

    return(
        <div className='fondo'>
            <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} className="cambioIdioma bg-white"/>
            <FormularioLogin idioma={idioma}/>
        </div>
    );

}