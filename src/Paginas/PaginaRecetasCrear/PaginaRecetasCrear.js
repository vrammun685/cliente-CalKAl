import { useEffect, useState } from 'react';
import ListaAlimentosReceta from '../../Componentes/Listados/LisatdoAlimentosReceta/ListadoAlimentosReceta';
import ModalAnadirAlimentoReceta from '../../Componentes/Modal/Modal_Alimento_Receta/ModalAlimentoReceta';
import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import api from '../../auth/axiosConfig';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function PaginaRecetasCrear() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  const { id } = useParams();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alimentoSeleccionado, setAlimentoSeleccionado] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);
  const [nombreReceta, setNombreReceta] = useState('');
  const [numeroPorciones, setNumeroPorciones] = useState(1);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const [errorIngredientes, setErrorIngredientes] = useState(null);
  const [errorNombre, setErrorNombre] = useState(null);

  // Cargar receta si se está editando
  useEffect(() => {
    if (id) {
      api.get(`/recetas/${id}/editar/`)
        .then(res => {
          const receta = res.data;
          setNombreReceta(receta.nombre);
          setNumeroPorciones(receta.numeroPorciones);
          // Ingredientes sin id temporal, solo alimento_id, cantidad y alimento
          setIngredientes(
            receta.ingredientes.map((item) => {
              const alimento = item.alimento || {}; // fallback seguro
              const cantidad = item.cantidad;

              return {
                alimento_id: item.alimento_id,
                cantidad,
                alimento,
                calorias: (alimento.calorias * cantidad / 100).toFixed(1),
                proteinas: (alimento.proteinas * cantidad / 100).toFixed(1),
                grasas: (alimento.grasas * cantidad / 100).toFixed(1),
                carbohidratos: (alimento.carbohidratos * cantidad / 100).toFixed(1),
              };
            })
          );
        })
        .catch(err => {
          console.error('Error al cargar receta:', err);
          alert(idioma === 'es' ? 'Error al cargar la receta.' : 'Error loading recipe.');
        })
        .finally(() => setCargando(false));
    } else {
      setCargando(false); // No hay que cargar nada
    }
  }, [id]);

  const abrirModal = (alimento) => {
    setAlimentoSeleccionado(alimento);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setAlimentoSeleccionado(null);
  };

  // Añadir ingrediente sin id temporal, solo alimento_id, cantidad y alimento
  const añadirIngrediente = ({ alimento, cantidad }) => {    

    const nuevo = {
      alimento_id: alimento.id,
      cantidad,
      alimento,
      calorias: (alimento.calorias * cantidad / 100).toFixed(1),
      proteinas: (alimento.proteinas * cantidad / 100).toFixed(1),
      grasas: (alimento.grasas * cantidad / 100).toFixed(1),
      carbohidratos: (alimento.carbohidratos * cantidad / 100).toFixed(1),
    };
    setIngredientes([...ingredientes, nuevo]);
    cerrarModal();
  };

  // Eliminar por alimento_id
  const eliminarIngrediente = (alimento_id) => {
    setIngredientes(ingredientes.filter(item => item.alimento_id !== alimento_id));
  };

  const resumen = ingredientes.reduce(
    (acc, item) => ({
      calorias: acc.calorias + parseFloat(item.calorias),
      proteinas: acc.proteinas + parseFloat(item.proteinas),
      grasas: acc.grasas + parseFloat(item.grasas),
      carbohidratos: acc.carbohidratos + parseFloat(item.carbohidratos),
    }),
    { calorias: 0, proteinas: 0, grasas: 0, carbohidratos: 0 }
  );

  const enviarReceta = async () => {
    let hayError = false;

    if (!nombreReceta.trim()) {
      setErrorNombre('sin_nombre');
      hayError = true;
    } else {
      setErrorNombre('');
    }

    if (ingredientes.length === 0) {
      setErrorIngredientes('sin_ingredientes');
      hayError = true;
    } else {
      setErrorIngredientes('');
    }

    if (hayError) return;

    const datos = {
      nombre: nombreReceta,
      numeroPorciones,
      ingredientes: ingredientes.map(item => ({
        alimento_id: item.alimento_id,
        cantidad: item.cantidad,
      })),
    };

    try {
      if (id) {
        await api.put(`/recetas/${id}/editar/`, datos);
        alert(idioma === 'es' ? 'Receta actualizada correctamente.' : 'Recipe updated successfully.');
      } else {
        await api.post('/recetas/crear/', datos);
        setIngredientes([]);
        setNombreReceta('');
      }
      navigate('/recetas')
    } catch (error) {
      console.error('Error al guardar receta:', error);
      alert(idioma === 'es' ? 'Error al guardar la receta.' : 'Error saving the recipe.');
    }
  };

  if (cargando) {
    return <Loading />;
  }

  return (
    <div className='fondo'>
      <MenuPrincipal idioma={idioma} setIdioma={setIdioma} />
      <div className="container mt-4">

        <div className="row">
          {/* Columna izquierda */}
          <div className="col-md-6">
            {/* Nombre y porciones */}
            <div className="card mb-3">
              <div className="card-body">
                <label className="form-label">{idioma === 'es' ? 'Nombre de la receta' : 'Recipe Name'}</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={nombreReceta}
                  onChange={(e) => setNombreReceta(e.target.value)}
                />
                {errorNombre && (
                  <div className="text-danger small mt-1">
                    {idioma === 'es'
                      ? errorNombre === 'sin_nombre' && 'El nombre no puede estar vacío.'
                      : errorNombre === 'sin_nombre' && 'Name cannot be empty.'}
                  </div>
                )}
                <label className="form-label">{idioma === 'es' ? 'Número de porciones' : 'Number of servings'}</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={numeroPorciones}
                  onChange={(e) => setNumeroPorciones(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            {/* Resumen nutricional */}
            <div className="card mb-4">
              <div className="card-header">
                <h5>{idioma === 'es' ? 'Resumen Nutricional' : 'Nutritional Summary'}</h5>
              </div>
              <div className="card-body">
                <ul className="mb-0">
                  <li>{idioma === 'es' ? 'Calorías' : 'Calories'}: {resumen.calorias.toFixed(1)}</li>
                  <li>{idioma === 'es' ? 'Proteínas' : 'Proteins'}: {resumen.proteinas.toFixed(1)} g</li>
                  <li>{idioma === 'es' ? 'Grasas' : 'Fats'}: {resumen.grasas.toFixed(1)} g</li>
                  <li>{idioma === 'es' ? 'Carbohidratos' : 'Carbs'}: {resumen.carbohidratos.toFixed(1)} g</li>
                </ul>
                <button className="btn btn-success w-100 mt-4" onClick={enviarReceta}>
                  {id ? (idioma === 'es' ? 'Actualizar receta' : 'Update Recipe') : (idioma === 'es' ? 'Crear receta' : 'Create Recipe')}
                </button>
              </div>
            </div>

            {/* Ingredientes añadidos */}
            <div className="card">
              <div className="card-header">
                <h5>{idioma === 'es' ? 'Ingredientes añadidos' : 'Added Ingredients'}</h5>
              </div>
              <div className="card-body p-0">
                {ingredientes.length === 0 ? (
                  <p className="p-3">{idioma === 'es' ? 'No hay ingredientes aún.' : 'No ingredients yet.'}</p>
                ) : (
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>{idioma === 'es' ? 'Nombre' : 'Name'}</th>
                        <th>{idioma === 'es' ? 'Cantidad (g)' : 'Amount (g)'}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredientes.map(item => (
                        <tr key={item.alimento_id}>
                          <td>{idioma === 'es' ? item.alimento.nombre_es : item.alimento.nombre_en}</td>
                          <td>{item.cantidad}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminarIngrediente(item.alimento_id)}
                            >
                              {idioma === 'es' ? 'Eliminar' : 'Remove'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {errorIngredientes && (
                  <div className="text-danger small px-3 pb-2">
                    {idioma === 'es'
                      ? errorIngredientes === 'sin_ingredientes' && 'Debes añadir al menos un ingrediente.'
                      : errorIngredientes === 'sin_ingredientes' && 'You must add at least one ingredient.'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha: lista de alimentos */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <ListaAlimentosReceta
                  idioma={idioma}
                  onAlimentoSeleccionado={abrirModal}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal para añadir ingrediente */}
        <ModalAnadirAlimentoReceta
          mostrar={mostrarModal}
          onClose={cerrarModal}
          onSubmit={({ cantidad }) =>
            añadirIngrediente({ alimento: alimentoSeleccionado, cantidad })
          }
          alimento={alimentoSeleccionado}
          idioma={idioma}
        />
      </div>
    </div>
  );
}
