import { useState, useEffect } from "react";
import api from "../../../auth/axiosConfig";
import "./FormularioPerfil.css";
import { useNavigate } from 'react-router-dom';
import ModalConfirmacion from '../../Modal/Modal_Confirmacion/ModalConfirmacion';

export default function FormularioPerfil({ datosUsuarioInicial, imagenPerfil, idioma }) {
  const [datosUsuario, setDatosUsuario] = useState(datosUsuarioInicial);
  const [nuevaImagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(imagenPerfil || "/media/img/imagenSinPerfil.jpg");
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
  if (!datos.peso || datos.peso <= 0) nuevosErrores.peso = idioma === 'es' ? 'El peso debe ser mayor a 0' : 'Weight must be greater than 0';
  if (!datos.altura || datos.altura <= 0) nuevosErrores.altura = idioma === 'es' ? 'La altura debe ser mayor a 0' : 'Height must be greater than 0';
  if (!datos.edad || datos.edad < 12) nuevosErrores.edad = idioma === 'es' ? 'Edad mínima 12 años' : 'Minimum age is 12';
  if (!datos.genero) nuevosErrores.genero = idioma === 'es' ? 'Selecciona un género' : 'Select a gender';
  if (!datos.objetivo) nuevosErrores.objetivo = idioma === 'es' ? 'Selecciona un objetivo' : 'Select a goal';
  if (!datos.actividad) nuevosErrores.actividad = idioma === 'es' ? 'Selecciona un nivel de actividad' : 'Select an activity level';
  return nuevosErrores;
};

useEffect(() => {
  if (Object.keys(errors).length > 0) {
    const erroresGenerados = generarMensajesDeError(datosUsuario);
    const nuevosErrores = {};

    for (const campo in errors) {
      if (erroresGenerados[campo]) {
        // Si es un campo que se puede traducir (peso, edad, etc.)
        nuevosErrores[campo] = erroresGenerados[campo];
      } else {
        // Si es un error personalizado como imagen, lo conservamos
        nuevosErrores[campo] = errors[campo];
      }
    }

    setErrors(nuevosErrores);
  }
}, [idioma]);

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setDatosUsuario(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));

  if (errors[name]) {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }
};

const handleImagenChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const validTypes = ["image/jpeg", "image/png"];
    const validExtensions = [".jpg", ".jpeg", ".png"];
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!validTypes.includes(file.type) || !validExtensions.includes(fileExtension)) {
      setErrors(prev => ({
        ...prev,
        imagen: idioma === "es"
          ? "Solo se permiten imágenes en formato PNG o JPG"
          : "Only PNG or JPG image formats are allowed"
      }));
      return;
    }

    setImagen(file);
    setPreview(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, imagen: null }));
  }
};


  const validarFormulario = () => {
  const nuevosErrores = generarMensajesDeError(datosUsuario);

  setErrors(prev => ({
    ...prev,
    ...nuevosErrores
  }));

  return {
    ...errors,
    ...nuevosErrores
  };
};

  const handleGuardar = async () => {
  const errores = validarFormulario();

  // Bloquear envío si hay errores (incluido el de imagen)
  if (Object.keys(errores).length > 0) {
    return;
  }

  // --- Opcional: asegurar explícitamente que no haya error de imagen ---
  if (errores.imagen) {
    return; // Por si acaso
  }

  const formData = new FormData();
  for (const key in datosUsuario) {
    if (datosUsuario[key] !== undefined && datosUsuario[key] !== null) {
      formData.append(key, datosUsuario[key]);
    }
  }
  if (nuevaImagen) {
    formData.append("imagen_Perfil", nuevaImagen);
  }

  try {
    await api.put("/perfil/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    redireccion('/home');
  } catch (error) {
    if (error.response?.data) {
      setErrors(error.response.data);
    } else {
      alert("Algo ha ido mal. Por favor, inténtalo de nuevo más tarde.");
    }
  }
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
      .catch(() => alert("Error al eliminar la cuenta"));
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
                accept=".png,.jpg,.jpeg"
                onChange={handleImagenChange}
                className="form-control mb-2"
              />
              {errors.imagen && <div className="text-danger">{errors.imagen}</div>}
            </div>
            <h5>{idioma === 'es' ? 'Datos Personales' : 'Personal Data'}</h5>

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
            <h5>{idioma === 'es' ? 'Medidas y objetivos' : 'Measurements and goals'}</h5>
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
        <button className="boton" onClick={handleGuardar}>
          {idioma === 'es' ? 'Guardar cambios' : 'Save changes'}
        </button>
        <button className="boton" onClick={handleSolicitarCambioPassword}>
          {idioma === 'es' ? 'Cambiar contraseña' : 'Change password'}
        </button>
        {errors.correo && <div className="alert alert-danger">{errors.correo}</div>}
        <button className="boton" onClick={() => setMostrarModalConfirmacion(true)}>
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
