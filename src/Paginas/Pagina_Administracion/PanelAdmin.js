import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import ListaAlimentosAdmin from '../../Componentes/Listados/ListadosAdmin/ListadoAlimentosAdmin/ListadoAlimentosAdmin';
import { useNavigate } from 'react-router-dom';
import ModalCrearAlimento from '../../Componentes/Modal/ModalAlimentoAdminCrear/ModalAlimentoAdminCrear';
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

  if (cargando) return <p>Cargando alimentos...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>
        <button onClick={CerrarSesion}>Cerrar Sesión</button>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Listado de Alimentos</h2>
        <button
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setMostrarCrearModal(true)}
        >
          Añadir nuevo alimento
        </button>

        <ListaAlimentosAdmin
          alimentos={alimentos}
          actualizarAlimento={actualizarAlimentoEnLista}
          eliminarAlimento={eliminarAlimentoDeLista}
        />
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
