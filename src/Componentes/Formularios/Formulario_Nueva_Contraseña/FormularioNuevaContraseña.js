import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import api from '../../../auth/axiosConfig';

export default function FormularioCambiarContraseña({idioma}){
  const { uid, token } = useParams();
  const [errors, setErrors] = useState({});
  const redireccion = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ password: '', confirm_password: '' });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = { es: 'Las contraseñas no coinciden', en: 'Passwords do not match' };
      setLoading(false);
      return
    }

    try{
      await api.post(`CambiaContraseña/${uid}/${token}/`,
        { password: formData.password }
      );
      redireccion('/login');
    }
    catch (error){
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <div className="centrar-formulario">
      <form onSubmit={handleSubmit} className="formulario-recuperacion">
        <h4 className="mb-3">{idioma === 'es' ? 'Establecer nueva Contraseña' : 'Set new Password'}</h4>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder={idioma === 'es' ? 'Contraseña' : 'Password'}
            required
          />
          {errors.password && <small className="text-danger">{errors.password[idioma]}</small>}
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="confirm_password"
            className="form-control"
            onChange={handleChange}
            placeholder={idioma === 'es' ? 'Confirmar Contraseña' : 'Confirm Password'}
            required
          />
          {errors.confirm_password && <small className="text-danger">{errors.confirm_password[idioma]}</small>}
        </div>

        <button type="submit" className="boton w-100">
          {loading
            ? idioma === 'es'
              ? 'Cargando...'
              : 'Loading...'
            : idioma === 'es'
            ? 'Cambiar Contraseña'
            : 'Set Password'}
        </button>
      </form>
    </div>
  );
}