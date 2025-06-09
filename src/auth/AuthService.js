
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
export const checkToken = async () => {
  try {
    return await axios.get(`${BASE_URL}/checktoken/`, {
      withCredentials: true,
    });
  } catch (err) {
    // Si el token no es válido, intenta refrescar
    return await refreshToken(); // 👈 Aquí ocurre la renovación si hace falta
  }
};

export const refreshToken = () => {
  return axios.post(`${BASE_URL}/refreshtoken/`, null, {
    withCredentials: true,
  });
};