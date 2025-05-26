
import axios from 'axios';

export const checkToken = async () => {
  try {
    return await axios.get('http://localhost:8000/api/checktoken/', {
      withCredentials: true,
    });
  } catch (err) {
    // Si el token no es válido, intenta refrescar
    return await refreshToken(); // 👈 Aquí ocurre la renovación si hace falta
  }
};

export const refreshToken = () => {
  return axios.post("http://localhost:8000/api/refreshtoken/", null, {
    withCredentials: true,
  });
};