// FormularioPedirEmail.jsx
import { useState } from 'react';
import api from '../../../auth/axiosConfig';
import './FormularioPedirContraseña.css'; // Importamos el CSS externo

export default function FormularioPedirEmail({ idioma }) {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setErrors({});
      await api.post('solicitar-contraseña/', { email });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({
          es: 'Email no registrado',
          en: 'Email not found',
        });
      }
    }
  };

  return (
    <div className="formulario-container">
      <form onSubmit={handleSubmit} className="formulario-card">
        <h4 className="mb-3">
          {idioma === 'es' ? 'Recuperar contraseña' : 'Recover password'}
        </h4>
        {errors && <small className="text-danger">{errors[idioma]}</small>}
        <div className="mb-3">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="boton w-100">
          {idioma === 'es' ? 'Solicitar correo' : 'Request email'}
        </button>
      </form>
    </div>
  );
}
