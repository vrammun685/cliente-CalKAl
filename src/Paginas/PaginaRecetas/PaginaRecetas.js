import { useEffect, useState } from 'react';
import api from '../../auth/axiosConfig';
import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import ListaRecetas from '../../Componentes/Listados/ListadoRecetas/ListaRecetas';
import DetalleReceta from '../../Componentes/Listados/ListadoIngradientes/ListadoIngredientes';
import { Link } from 'react-router-dom';

export default function PaginaRecetas() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  const [recetas, setRecetas] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

  useEffect(() => {
    api.get('/recetas/')
      .then(res => {
        setRecetas(res.data.Comidas || []);
      })
      .catch(err => {
        console.error('Error al obtener las recetas:', err);
      });
  }, []);

  // Pasamos esta función a ListaRecetas para que elimine y actualice lista
  const eliminarReceta = (id) => {
    api.delete(`/recetas/${id}/`)
      .then(() => {
        setRecetas(prev => prev.filter(r => r.id !== id));
        if (recetaSeleccionada && recetaSeleccionada.id === id) {
          setRecetaSeleccionada(null);
        }
      })
      .catch(console.error);
  };

  return (
    <div className='fondo'>
      <MenuPrincipal idioma={idioma} setIdioma={setIdioma} />

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <ListaRecetas
              recetas={recetas}
              setRecetas={setRecetas} // opcional, puedes no pasar si no la usas directamente
              eliminarReceta={eliminarReceta} // esta es clave
              onSeleccionarReceta={setRecetaSeleccionada}
              idioma={idioma}
            />
          </div>

          <div className="col-md-6">
            <DetalleReceta
              receta={recetaSeleccionada}
              onCerrar={() => setRecetaSeleccionada(null)}
              idioma={idioma}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <Link to="/recetas/crear/" style={{ textDecoration: 'none' }}>
              <div className="card text-center shadow-sm p-3" style={{ cursor: 'pointer' }}>
                <div className="card-body">
                  <h4 className="card-title">➕ {idioma === 'es' ? 'Crear nueva receta' : 'Create new recipe'}</h4>
                  <p className="card-text text-muted">
                    {idioma === 'es'
                      ? 'Agrega una nueva receta a tu colección personalizada.'
                      : 'Add a new recipe to your custom collection.'}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
