import { useState } from 'react';
import { CambioIdioma } from '../../Componentes/Selector_Idioma/SelectorIdiom';
import FormularioCambiarContraseña  from '../../Componentes/Formularios/Formulario_Nueva_Contraseña/FormularioNuevaContraseña';

export default function PaginaEscribirNuevaContraseña(){
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');

    const cambiarIdioma = (nuevoIdioma) => {
        setIdioma(nuevoIdioma);
        localStorage.setItem('idioma', nuevoIdioma);
      };
      return(
        <div className='fondo'>
            <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
            <FormularioCambiarContraseña idioma={idioma} />
        </div>
      )
}