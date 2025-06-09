import './MenuPrincipal.css';
import { Link } from "react-router-dom";
import { CambioIdioma } from '../../Selector_Idioma/SelectorIdiom';
import MenuPerfil from '../MenuPerfil/MenuPerfil';

export default function MenuPrincipal({idioma, setIdioma, imagenPerfil}) {
  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('idioma', nuevoIdioma);
  };

  return (
    <nav className="navbar navbar-expand-md bg-white shadow-sm px-4">
  <div className="container-fluid d-flex align-items-center">
    {/* LOGO IZQUIERDA */}
    <div className="d-flex align-items-center me-3">
      <img src="/media/logo.png" alt="logo" className="imagen-logo-esquina" />
    </div>

    {/* BOTÓN HAMBURGUESA */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* MENÚ COLAPSABLE */}
    <div className="collapse navbar-collapse flex-grow-1" id="navbarContent">
      {/* CONTENEDOR FLEX PRINCIPAL */}
      <div className="d-flex justify-content-between align-items-center w-100 position-relative">
        {/* FANTASMA IZQUIERDA para compensar el ancho de la derecha */}
        <div className="d-none d-lg-block" style={{ width: '180px' }}></div>

        {/* MENÚ CENTRADO */}
        <ul className="navbar-nav d-flex flex-row gap-3 justify-content-center mb-0 me-3 flex-wrap flex-md-nowrap">
          <li className="nav-item">
            <Link to="/home" className="nav-link fs-5 custom-link position-relative">
              {idioma === 'es' ? 'Inicio' : 'Home'}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/diarios" className="nav-link fs-5 custom-link position-relative">
              {idioma === 'es' ? 'Diarios' : 'Diaries'}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pesos" className="nav-link fs-5 custom-link position-relative">
              {idioma === 'es' ? 'Pesos' : 'Weights'}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/recetas" className="nav-link fs-5 custom-link position-relative">
              {idioma === 'es' ? 'Recetas' : 'Recipe'}
            </Link>
          </li>
        </ul>

        {/* LADO DERECHO: Idioma + Perfil solo en desktop */}
        <div className="d-none d-md-flex align-items-center gap-3">
          <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
          <MenuPerfil idioma={idioma} />
        </div>
      </div>
    </div>

    {/* LADO DERECHO: Idioma + Perfil solo en móvil (fuera del collapse para que quede debajo del menú) */}
    <div className="d-flex d-md-none justify-content-center gap-3 mt-3 w-100">
      <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
      <MenuPerfil idioma={idioma} imagenPerfil={imagenPerfil} />
    </div>
  </div>
</nav>



  );
}