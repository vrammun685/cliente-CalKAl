import { useState } from "react";
import api from "../../../auth/axiosConfig"; // Asegúrate de importar tu API configurada
import "./FormularioPerfil.css";
import { useNavigate } from 'react-router-dom';

export default function FormularioPerfil({ datosUsuarioInicial, imagenPerfil, idioma }) {
  const [datosUsuario, setDatosUsuario] = useState(datosUsuarioInicial);
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [preview, setPreview] = useState(imagenPerfil);
  const [errors, setErrors] = useState({});
  const redireccion = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosUsuario({
      ...datosUsuario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNuevaImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGuardar = () => {
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

  const handleSolicitarCambioPassword = async e => {
    e.preventDefault();
    try{
      setErrors({})
      await api.post('solicitar-contraseña/', { email: datosUsuario.email });
    }
    catch (error){
      if (error.response && error.response.status === 400) {
        setErrors({
          es: 'Email no registrado',
          en: 'Email not found'
        });
      }
    }
};

  const handleEliminarCuenta = () => {
    if (window.confirm("⚠️ ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.")) {
      api.delete("/perfil/")
        .then(() => {
          alert("👋 Cuenta eliminada correctamente");
          redireccion('/login');
          // Redirigir a login o cerrar sesión
        })
        .catch(() => alert("❌ Error al eliminar la cuenta"));
    }
  };

  return (
    <div className="formulario-perfil container mt-4">
      <div className="row">
        {/* DATOS PERSONALES */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <div className="text-center">
              <img
                src={preview}
                alt="Perfil"
                className="foto-perfil mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImagenChange}
                className="form-control mb-3"
              />
            </div>
            <h5>Datos personales</h5>
            <input className="form-control mb-2" value={datosUsuario.username} readOnly />
            <input className="form-control mb-2" value={datosUsuario.email} readOnly />
            <input
              className="form-control mb-2"
              name="first_name"
              value={datosUsuario.first_name || ""}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <input
              className="form-control mb-2"
              name="last_name"
              value={datosUsuario.last_name || ""}
              onChange={handleChange}
              placeholder="Apellido"
            />
          </div>
        </div>

        {/* MEDIDAS Y OBJETIVOS */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Medidas y objetivos</h5>
            <input
              className="form-control mb-2"
              type="number"
              name="peso"
              value={datosUsuario.peso || ""}
              onChange={handleChange}
              placeholder="Peso (kg)"
            />
            <input
              className="form-control mb-2"
              type="number"
              name="altura"
              value={datosUsuario.altura || ""}
              onChange={handleChange}
              placeholder="Altura (cm)"
            />
            <input
              className="form-control mb-2"
              type="number"
              name="edad"
              value={datosUsuario.edad || ""}
              onChange={handleChange}
              placeholder="Edad"
            />
            {/* GÉNERO */}
            <select
            className="form-control mb-2"
            name="genero"
            value={datosUsuario.genero || ""}
            onChange={handleChange}
            >
            <option value="">Selecciona tu género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            </select>

            {/* OBJETIVO */}
            <select
            className="form-control mb-2"
            name="objetivo"
            value={datosUsuario.objetivo || ""}
            onChange={handleChange}
            >
            <option value="">Selecciona tu objetivo</option>
            <option value="Perder peso">Perder peso</option>
            <option value="Mantener peso">Mantener peso</option>
            <option value="Ganar peso">Ganar peso</option>
            </select>

            {/* ACTIVIDAD */}
            <select
            className="form-control mb-2"
            name="actividad"
            value={datosUsuario.actividad || ""}
            onChange={handleChange}
            >
            <option value="">Nivel de actividad</option>
            <option value="Nula">Nula</option>
            <option value="1 a 2 veces en semana">1 a 2 veces en semana</option>
            <option value="3 a 5 veces en semana">3 a 5 veces en semana</option>
            <option value="6 a 7 veces en semana">6 a 7 veces en semana</option>
            <option value="Ejercicio intenso a diario">Ejercicio intenso a diario</option>
            </select>
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

      {/* BOTONES */}
      <div className="botones mt-4 d-flex justify-content-end gap-2">
        <button className="btn btn-primary" onClick={handleGuardar}>
          Guardar cambios
        </button>
        <button className="btn btn-warning" onClick={handleSolicitarCambioPassword}>
          Cambiar contraseña
        </button>
        <button className="btn btn-danger" onClick={handleEliminarCuenta}>
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}
