import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import ListaAlimentosAdmin from '../../Componentes/Listados/ListadosAdmin/ListadoAlimentosAdmin';
import { useNavigate } from 'react-router-dom';
import ModalCrearAlimento from '../../Componentes/Modal/ModalAlimentoAdminCrear/ModalAlimentoAdminCrear';
import Loading from '../Loading/Loading';
import api from '../../auth/axiosConfig';

export default function AdminPanel() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [mostrarCrearModal, setMostrarCrearModal] = useState(false);
  const [alimentos, setAlimentos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const CerrarSesion = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  useEffect(() => {
    api('paneladmin/alimentos/')
      .then(res => {
        if (res.status === 403) {
          navigate('/login');
          return;
        }
        setAlimentos(res.data);
      })
      .catch(err => {
        console.error('Error al obtener alimentos:', err);
        navigate('/login');
      })
      .finally(() => setCargando(false));
  }, [navigate]);

  const agregarAlimentoALista = (nuevo) => {
    setAlimentos(prev => [...prev, nuevo]);
  };

  const actualizarAlimentoEnLista = (actualizado) => {
    setAlimentos(prev =>
      prev.map(alimento => alimento.id === actualizado.id ? actualizado : alimento)
    );
  };

  const eliminarAlimentoDeLista = (id) => {
    setAlimentos(prev => prev.filter(alimento => alimento.id !== id));
  };

  if (cargando) return <Loading />;

  return (
    <div className="fondo home">
      <div className="container my-5">
        <div className="card p-4 shadow rounded">
          <ListaAlimentosAdmin
            alimentos={alimentos}
            actualizarAlimento={actualizarAlimentoEnLista}
            eliminarAlimento={eliminarAlimentoDeLista}
          />

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              className="boton"
              onClick={() => setMostrarCrearModal(true)}
            >
              Añadir nuevo alimento
            </button>
            <button
              className="boton"
              onClick={CerrarSesion}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {mostrarCrearModal && (
        <ModalCrearAlimento
          cerrar={() => setMostrarCrearModal(false)}
          agregarAlimentoALista={agregarAlimentoALista}
        />
      )}
    </div>
  );
}
