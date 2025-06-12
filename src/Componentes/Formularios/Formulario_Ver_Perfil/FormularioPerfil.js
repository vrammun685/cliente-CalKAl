import { useState, useEffect } from "react";
import api from "../../../auth/axiosConfig";
import "./FormularioPerfil.css";
import { useNavigate } from 'react-router-dom';
import ModalConfirmacion from '../../Modal/Modal_Confirmacion/ModalConfirmacion';

export default function FormularioPerfil({ datosUsuarioInicial, imagenPerfil, idioma }) {
  const [datosUsuario, setDatosUsuario] = useState(datosUsuarioInicial);
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [preview, setPreview] = useState(imagenPerfil);
  const [errors, setErrors] = useState({});
  const redireccion = useNavigate();
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);


  const traducciones = {
    username: { es: "Nombre de usuario", en: "Username" },
    email: { es: "Correo electrónico", en: "Email" },
    first_name: { es: "Nombre", en: "First name" },
    last_name: { es: "Apellido", en: "Last name" },
    peso: { es: "Peso (kg)", en: "Weight (kg)" },
    altura: { es: "Altura (cm)", en: "Height (cm)" },
    edad: { es: "Edad", en: "Age" },
    genero: { es: "Género", en: "Gender" },
    objetivo: { es: "Objetivo", en: "Goal" },
    actividad: { es: "Nivel de actividad", en: "Activity level" },
  };

  const generarMensajesDeError = (datos) => {
    const nuevosErrores = {};
    if (!datos.first_name) nuevosErrores.first_name = idioma === 'es' ? 'Campo requerido' : 'Required field';
    if (!datos.last_name) nuevosErrores.last_name = idioma === 'es' ? 'Campo requerido' : 'Required field';
    if (!datos.peso || datos.peso <= 0) nuevosErrores.peso = idioma === 'es' ? 'Peso debe ser mayor a 0' : 'Weight must be greater than 0';
    if (!datos.altura || datos.altura <= 0) nuevosErrores.altura = idioma === 'es' ? 'Altura debe ser mayor a 0' : 'Height must be greater than 0';
    if (!datos.edad || datos.edad < 12) nuevosErrores.edad = idioma === 'es' ? 'Edad mínima 12 años' : 'Minimum age is 12';
    if (!datos.genero) nuevosErrores.genero = idioma === 'es' ? 'Selecciona tu género' : 'Select your gender';
    if (!datos.objetivo) nuevosErrores.objetivo = idioma === 'es' ? 'Selecciona tu objetivo' : 'Select your goal';
    if (!datos.actividad) nuevosErrores.actividad = idioma === 'es' ? 'Selecciona nivel de actividad' : 'Select activity level';
    return nuevosErrores;
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrors(generarMensajesDeError(datosUsuario));
    }
  }, [idioma]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosUsuario({
      ...datosUsuario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/png", "image/jpeg"].includes(file.type)) {
      setNuevaImagen(file);
      setPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, imagen: null }));
    } else {
      setErrors(prev => ({
        ...prev,
        imagen: idioma === 'es' ? 'Solo se permiten imágenes .png o .jpg' : 'Only .png or .jpg images are allowed',
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = generarMensajesDeError(datosUsuario);
    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardar = () => {
    const nuevosErrores = generarMensajesDeError(datosUsuario);

    // Verificar si hay error de imagen
    if (nuevaImagen && !["image/png", "image/jpeg"].includes(nuevaImagen.type)) {
      nuevosErrores.imagen = idioma === 'es'
        ? 'Solo se permiten imágenes .png o .jpg'
        : 'Only .png or .jpg images are allowed';
    }

    setErrors(nuevosErrores);

    // Si hay errores, no enviar
    if (Object.keys(nuevosErrores).length > 0) return;

    const formData = new FormData();
    for (const key in datosUsuario) {
      formData.append(key, datosUsuario[key]);
    }
    if (nuevaImagen) {
      formData.append("imagen_Perfil", nuevaImagen);
    }

    api.put("/perfil/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => alert("✅ Cambios guardados correctamente"))
      .catch(() => alert("❌ Error al guardar los cambios"));
  };

  const handleSolicitarCambioPassword = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      await api.post('solicitar-contraseña/', { email: datosUsuario.email });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ correo: idioma === 'es' ? 'Email no registrado' : 'Email not found' });
      }
    }
  };

  const handleEliminarCuenta = () => {
    api.delete("/perfil/")
      .then(() => {
        redireccion('/login');
      })
      .catch(() => alert("❌ Error al eliminar la cuenta"));
  };

  return (
    <div className="formulario-perfil container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <div className="text-center">
              <img src={preview} alt="Perfil" className="foto-perfil mb-2" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImagenChange}
                className="form-control mb-2"
              />
              {errors.imagen && <div className="text-danger">{errors.imagen}</div>}
            </div>
            <h5>Datos personales</h5>

            <label>{traducciones.username[idioma]}</label>
            <input className="form-control mb-2" value={datosUsuario.username} readOnly disabled />

            <label>{traducciones.email[idioma]}</label>
            <input className="form-control mb-2" value={datosUsuario.email} readOnly disabled />

            <label>{traducciones.first_name[idioma]}</label>
            <input
              className="form-control mb-1"
              name="first_name"
              value={datosUsuario.first_name || ""}
              onChange={handleChange}
            />
            {errors.first_name && <div className="text-danger mb-2">{errors.first_name}</div>}

            <label>{traducciones.last_name[idioma]}</label>
            <input
              className="form-control mb-1"
              name="last_name"
              value={datosUsuario.last_name || ""}
              onChange={handleChange}
            />
            {errors.last_name && <div className="text-danger mb-2">{errors.last_name}</div>}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Medidas y objetivos</h5>

            <label>{traducciones.peso[idioma]}</label>
            <input
              className="form-control mb-1"
              type="number"
              name="peso"
              value={datosUsuario.peso || ""}
              onChange={handleChange}
            />
            {errors.peso && <div className="text-danger mb-2">{errors.peso}</div>}

            <label>{traducciones.altura[idioma]}</label>
            <input
              className="form-control mb-1"
              type="number"
              name="altura"
              value={datosUsuario.altura || ""}
              onChange={handleChange}
            />
            {errors.altura && <div className="text-danger mb-2">{errors.altura}</div>}

            <label>{traducciones.edad[idioma]}</label>
            <input
              className="form-control mb-1"
              type="number"
              name="edad"
              value={datosUsuario.edad || ""}
              onChange={handleChange}
            />
            {errors.edad && <div className="text-danger mb-2">{errors.edad}</div>}

            <label>{traducciones.genero[idioma]}</label>
            <select
              className="form-control mb-1"
              name="genero"
              value={datosUsuario.genero || ""}
              onChange={handleChange}
            >
              <option value="">{idioma === 'es' ? 'Selecciona tu género' : 'Select your gender'}</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            {errors.genero && <div className="text-danger mb-2">{errors.genero}</div>}

            <label>{traducciones.objetivo[idioma]}</label>
            <select
              className="form-control mb-1"
              name="objetivo"
              value={datosUsuario.objetivo || ""}
              onChange={handleChange}
            >
              <option value="">{idioma === 'es' ? 'Selecciona tu objetivo' : 'Select your goal'}</option>
              <option value="Perder peso">Perder peso</option>
              <option value="Mantener peso">Mantener peso</option>
              <option value="Ganar peso">Ganar peso</option>
            </select>
            {errors.objetivo && <div className="text-danger mb-2">{errors.objetivo}</div>}

            <label>{traducciones.actividad[idioma]}</label>
            <select
              className="form-control mb-1"
              name="actividad"
              value={datosUsuario.actividad || ""}
              onChange={handleChange}
            >
              <option value="">{idioma === 'es' ? 'Nivel de actividad' : 'Activity level'}</option>
              <option value="Nula">Nula</option>
              <option value="1 a 2 veces en semana">1 a 2 veces en semana</option>
              <option value="3 a 5 veces en semana">3 a 5 veces en semana</option>
              <option value="6 a 7 veces en semana">6 a 7 veces en semana</option>
              <option value="Ejercicio intenso a diario">Ejercicio intenso a diario</option>
            </select>
            {errors.actividad && <div className="text-danger mb-2">{errors.actividad}</div>}

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="notificaciones"
                checked={datosUsuario.notificaciones}
                onChange={handleChange}
                id="notificaciones"
              />
              <label className="form-check-label" htmlFor="notificaciones">
                Recibir notificaciones
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="botones mt-4 gap-2">
        <button className="btn btn-primary" onClick={handleGuardar}>
          {idioma === 'es' ? 'Guardar cambios' : 'Save changes'}
        </button>
        <button className="btn btn-warning" onClick={handleSolicitarCambioPassword}>
          {idioma === 'es' ? 'Cambiar contraseña' : 'Change password'}
        </button>
        {errors.correo && <div className="alert alert-danger">{errors.correo}</div>}
        <button className="btn btn-danger" onClick={() => setMostrarModalConfirmacion(true)}>
          {idioma === 'es' ? 'Eliminar cuenta' : 'Delete account'}
        </button>
      </div>


      <ModalConfirmacion
        mostrar={mostrarModalConfirmacion}
        idioma={idioma}
        onCancelar={() => setMostrarModalConfirmacion(false)}
        onConfirmar={() => {
          setMostrarModalConfirmacion(false);
          handleEliminarCuenta();
        }}
      />
    </div>
  );
}
