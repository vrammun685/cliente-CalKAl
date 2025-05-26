import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../auth/AuthContext';  // Cambia esto a donde tengas definido useAuth
import "./FormularioLogin.css";
import api from '../../../auth/axiosConfig';

export function FormularioLogin({ idioma }) {
  const [errors, setErrors]= useState({});
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });

  const redireccion = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  for (const key in formData) {
    if (formData[key] !== undefined && formData[key] !== null) {
      data.append(key, formData[key]);
    }
  }

  try {
    const response = await api.post('login/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    login(); // Asumo que aquí guardas token y estado logueado

    setErrors({});

    if (response.data.is_admin) {
      redireccion('/admin'); // Redirige admin a panel admin
    } else {
      redireccion('/home'); // Redirige usuario normal a home
    }

  } catch (error) {
    setErrors({
      es: 'Usuario o Contraseña incorrectos',
      en: 'User or password invalid'
    });
  }
};

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">{idioma === 'es' ? 'Iniciar Sesión' : 'Log in'}</h3>

        {errors && <small className="text-danger">{errors[idioma]}</small>}
        <form onSubmit={handleSubmit}>
          <div className="coolinput mb-3">
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder={idioma === 'es' ? 'Nombre Usuario' : 'Username'}
              className="input form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="coolinput mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder={idioma === 'es' ? 'Contraseña' : 'Password'}
              className="input form-control"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn boton w-100 mb-3">
            {idioma === 'es' ? 'Inicia Sesión' : 'Log in'}
          </button>
        </form>

        <div className="text-center">
          <Link to="/RecuperarContraseña">{idioma === 'es' ? '¿Has olvidado tu contraseña?' : 'Forgot password?'}</Link><br />
          <Link to="/registro">{idioma === 'es' ? 'Regístrate' : 'Sign up'}</Link>
        </div>
      </div>
    </div>
  );
}