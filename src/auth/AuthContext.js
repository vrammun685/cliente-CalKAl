import { createContext, useContext, useState, useEffect } from 'react';
import api from "./axiosConfig"
import { checkToken,refreshToken } from "./AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await api.post('/logout/'); // usa el cliente con baseURL ya incluida
    } catch (error) {
      alert("Algo ha ido mal. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const loggedOut = localStorage.getItem('loggedOut');
    if (loggedOut === 'true') {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    const verifyToken = async () => {
      try {
        await checkToken();
        setIsAuthenticated(true);
      } catch {
        try {
          const res = await refreshToken();
          if (res.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (refreshError) {
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);