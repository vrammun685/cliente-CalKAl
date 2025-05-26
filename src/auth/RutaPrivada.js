import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Loading from '../Paginas/Loading/Loading'; // O el componente que uses para carga

export default function RutaPrivada({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />; // Mejor usar componente dedicado

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
