import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../../Paginas/Loading/Loading';
import api from '../../../auth/axiosConfig';

export default function FormularioRegistro({ idioma }) {
  const [errors, setErrors] = useState({});
  const redireccion = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Para controlar pasos del formulario
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    altura: '',
    peso: '',
    edad: '',
    genero: '',
    objetivo: '',
    actividad: '',
    notificaciones: false,
    imagen_Perfil: null,
    accept_terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
              type === 'file' ? files[0] :
              value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateUsername = async () => {
    if (!formData.username) return;
    try {
      const res = await api.get(`check-username?username=${encodeURIComponent(formData.username)}`);
      if (res.data.exists) {
        setErrors(prev => ({ ...prev, username: idioma === 'es' ? 'El nombre de usuario ya está en uso' : 'Username already taken' }));
      }
    } catch (error) {
      console.error('Error al validar username', error);
    }
  };

  const validateEmail = async () => {
    if (!formData.email) return;
    try {
      const res = await api.get(`check-email?email=${encodeURIComponent(formData.email)}`);
      if (res.data.exists) {
        setErrors(prev => ({ ...prev, email: idioma === 'es' ? 'El email ya está registrado' : 'Email already registered' }));
      }
    } catch (error) {
      console.error('Error al validar email', error);
    }
  };

  // Validar la primera parte del formulario antes de avanzar
  const validarPaso1 = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = idioma === 'es' ? 'Introduce un nombre de usuario' : 'Enter a username';
    if (!formData.first_name) newErrors.first_name = idioma === 'es' ? 'Introduce el nombre' : 'Enter your first name';
    if (!formData.last_name) newErrors.last_name = idioma === 'es' ? 'Introduce el apellido' : 'Enter your last name';
    if (!formData.email) newErrors.email = idioma === 'es' ? 'Introduce un email' : 'Enter your email';
    if (!formData.password || formData.password.length < 6) newErrors.password = idioma === 'es' ? 'La contraseña debe tener al menos 6 caracteres' : 'Password must be at least 6 characters';
    if (formData.password !== confirmPassword) newErrors.confirm_password = idioma === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validar la segunda parte antes de enviar
  const validarPaso2 = () => {
    const newErrors = {};

    if (!formData.altura || formData.altura <= 0) newErrors.altura = idioma === 'es' ? 'La altura debe ser un número positivo' : 'Height must be positive number';
    if (!formData.peso || formData.peso <= 0) newErrors.peso = idioma === 'es' ? 'El peso debe ser un número positivo' : 'Weight must be positive number';
    if (!formData.edad || formData.edad < 12) newErrors.edad = idioma === 'es' ? 'La edad debe ser mayor que 12' : 'Age must be greater than 12';
    if (!formData.genero) newErrors.genero = idioma === 'es' ? 'Selecciona un género' : 'Select a gender';
    if (!formData.objetivo) newErrors.objetivo = idioma === 'es' ? 'Selecciona un objetivo' : 'Select a goal';
    if (!formData.actividad) newErrors.actividad = idioma === 'es' ? 'Selecciona un nivel de actividad' : 'Select an activity level';
    if (!formData.accept_terms) newErrors.accept_terms = idioma === 'es' ? 'Acepta los términos' : 'Accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const siguientePaso = () => {
    if (step === 1 && validarPaso1()) {
      setStep(2);
      setErrors({});
    }
  };

  const anteriorPaso = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarPaso2()) return;

    setErrors({});
    setLoading(true);
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await api.post('register/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);
      redireccion('/login');
    } catch (error) {
      setLoading(false);
      const responseErrors = error.response?.data;
      if (responseErrors) {
        setErrors(responseErrors);
      } else {
        alert(idioma === 'es' ? 'Error del servidor' : 'Server error');
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
    {!loading && (
      <div className="d-flex justify-content-center align-items-center px-3" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow form-card" style={{ maxWidth: '400px', width: '100%' }}>
          <h3 className="text-center mb-4">
            {idioma === 'es' ? 'Registro de Usuario' : 'User Registration'}
          </h3>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                {/* Parte 1: Datos básicos */}
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={validateUsername}
                    placeholder={idioma === 'es' ? 'Nombre de usuario' : 'Username'}
                    required
                  />
                  {errors.username && <small className="text-danger">{errors.username}</small>}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder={idioma === 'es' ? 'Nombre' : 'First Name'}
                    required
                  />
                  {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder={idioma === 'es' ? 'Apellido' : 'Last Name'}
                    required
                  />
                  {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={validateEmail}
                    placeholder="Email"
                    required
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

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
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={idioma === 'es' ? 'Confirmar contraseña' : 'Confirm Password'}
                    required
                  />
                  {errors.confirm_password && <small className="text-danger">{errors.confirm_password}</small>}
                </div>

                <button type="button" onClick={siguientePaso} className="btn boton w-100">
                  {idioma === 'es' ? 'Siguiente' : 'Next'}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                {/* Parte 2: Datos adicionales */}
                <div className="mb-3">
                  <input
                    type="number"
                    name="altura"
                    className="form-control"
                    value={formData.altura}
                    onChange={handleChange}
                    placeholder={idioma === 'es' ? 'Altura (cm)' : 'Height (cm)'}
                    required
                  />
                  {errors.altura && <small className="text-danger">{errors.altura}</small>}
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    name="peso"
                    className="form-control"
                    value={formData.peso}
                    onChange={handleChange}
                    placeholder={idioma === 'es' ? 'Peso (kg)' : 'Weight (kg)'}
                    required
                  />
                  {errors.peso && <small className="text-danger">{errors.peso}</small>}
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    name="edad"
                    className="form-control"
                    value={formData.edad}
                    onChange={handleChange}
                    placeholder={idioma === 'es' ? 'Edad' : 'Age'}
                    required
                  />
                  {errors.edad && <small className="text-danger">{errors.edad}</small>}
                </div>

                <div className="mb-3">
                  <select
                    name="genero"
                    className="form-control"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{idioma === 'es' ? 'Género' : 'Gender'}</option>
                    <option value="Masculino">{idioma === 'es' ? 'Masculino' : 'Male'}</option>
                    <option value="Femenino">{idioma === 'es' ? 'Femenino' : 'Female'}</option>
                  </select>
                  {errors.genero && <small className="text-danger">{errors.genero}</small>}
                </div>

                <div className="mb-3">
                  <select
                    name="objetivo"
                    className="form-control"
                    value={formData.objetivo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{idioma === 'es' ? 'Objetivo' : 'Goal'}</option>
                    <option value="Perder peso">{idioma === 'es' ? 'Perder peso' : 'Lose weight'}</option>
                    <option value="Mantener peso">{idioma === 'es' ? 'Mantener peso' : 'Maintain weight'}</option>
                    <option value="Ganar peso">{idioma === 'es' ? 'Ganar peso' : 'Gain weight'}</option>
                  </select>
                  {errors.objetivo && <small className="text-danger">{errors.objetivo}</small>}
                </div>

                <div className="mb-3">
                  <select
                    name="actividad"
                    className="form-control"
                    value={formData.actividad}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{idioma === 'es' ? 'Nivel de actividad' : 'Activity level'}</option>
                    <option value="Nula">{idioma === 'es' ? 'Nula' : 'None'}</option>
                    <option value="1 a 2 veces en semana">{idioma === 'es' ? '1 a 2 veces en semana' : '1 to 2 times per week'}</option>
                    <option value="3 a 5 veces en semana">{idioma === 'es' ? '3 a 5 veces en semana' : '3 to 5 times per week'}</option>
                    <option value="6 a 7 veces en semana">{idioma === 'es' ? '6 a 7 veces en semana' : '6 to 7 times per week'}</option>
                    <option value="Ejercicio intenso a diario">{idioma === 'es' ? 'Ejercicio intenso a diario' : 'Intense exercise daily'}</option>
                  </select>
                  {errors.actividad && <small className="text-danger">{errors.actividad}</small>}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    name="notificaciones"
                    className="form-check-input"
                    checked={formData.notificaciones}
                    onChange={handleChange}
                    id="notificaciones"
                  />
                  <label htmlFor="notificaciones" className="form-check-label">
                    {idioma === 'es' ? 'Quiero recibir notificaciones' : 'I want to receive notifications'}
                  </label>
                </div>

                <div className="mb-3">
                  <input
                    type="file"
                    name="imagen_Perfil"
                    className="form-control"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    name="accept_terms"
                    className="form-check-input"
                    checked={formData.accept_terms}
                    onChange={handleChange}
                    id="accept_terms"
                    required
                  />
                  <label htmlFor="accept_terms" className="form-check-label">
                    {idioma === 'es' ? (<>Acepto los <Link to="/registro/terminosYcondiciones">Términos y Condiciones</Link> y la  <Link to="/registro/PoliticaPrivacidad">Política de Privacidad</Link>.</>) : (<>I accept the <Link to="/registro/terminosYcondiciones">Terms and Conditions</Link> and the <Link to="/registro/PoliticaPrivacidad">Privacy Policy</Link>.</>)}
                  </label>
                  {errors.accept_terms && <small className="text-danger">{errors.accept_terms}</small>}
                </div>

                <div className="d-flex justify-content-between">
                  <button type="button" onClick={anteriorPaso} className="btn btn-secondary">
                    {idioma === 'es' ? 'Anterior' : 'Previous'}
                  </button>
                  <button type="submit" className="btn boton">
                    {idioma === 'es' ? 'Registrarse' : 'Register'}
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="mt-3 text-center">
            {idioma === 'es' ? '¿Ya tienes cuenta?' : 'Already have an account?'} <Link to="/login">{idioma === 'es' ? 'Inicia sesión' : 'Login'}</Link>
          </p>
        </div>
      </div>
      )}
    </>
  );
}
