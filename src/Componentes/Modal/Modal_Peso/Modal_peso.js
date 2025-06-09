import { useState, useEffect } from "react";
import api from "../../../auth/axiosConfig";
import "./Modal_peso.css";

export default function ModalFormularioPeso({ show, cerrar, pesos, setPesos, pesoEditar, setPesoEditar, idioma }) {
  const [fecha, setFecha] = useState("");
  const [peso, setPeso] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  

  const imagenPorDefecto = "media/img/imagenSinPerfil.jpg";

  useEffect(() => {
    if (pesoEditar) {
      setFecha(pesoEditar.fecha || "");
      setPeso(pesoEditar.peso || "");
      setPreview(pesoEditar.foto_pesaje || null);
    } else {
      setFecha("");
      setPeso("");
      setImagen(null);
      setPreview(null);
    }
    setErrors({});
  }, [pesoEditar, show]);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, imagen: idioma === "es" ? "Solo imágenes PNG o JPG" : "Only PNG or JPG images" }));
        setImagen(null);
        setPreview(null);
        return;
      }
      setImagen(file);
      setPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, imagen: null }));
    }
  };

  const handleFechaChange = (e) => {
    const valor = e.target.value;
    setFecha(valor);
    const hoy = new Date().toISOString().split("T")[0];
    if (valor > hoy) {
      setErrors(prev => ({ ...prev, fecha: idioma === "es" ? "La fecha no puede ser futura" : "Date cannot be in the future" }));
    } else {
      setErrors(prev => ({ ...prev, fecha: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hoy = new Date().toISOString().split("T")[0];
    if (fecha > hoy) {
      setErrors(prev => ({ ...prev, fecha: idioma === "es" ? "La fecha no puede ser futura" : "Date cannot be in the future" }));
      return;
    }

    const formData = new FormData();
    formData.append("fecha", fecha);
    formData.append("peso", peso);
    if (imagen) formData.append("imagen", imagen);

    try {
      if (pesoEditar) {
        await api.put(`/pesos/${pesoEditar.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Peso actualizado correctamente");
        setPesoEditar(null);
      } else {
        await api.post("/pesos/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Peso creado correctamente");
      }

      const res = await api.get("/pesos/");
      setPesos(res.data.pesos);
      handleCancelar();
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Hubo un error al guardar el registro");
    }
  };

  const handleCancelar = () => {
    setPesoEditar(null);
    setFecha("");
    setPeso("");
    setImagen(null);
    setPreview(null);
    setErrors({});
    cerrar();
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={handleCancelar}></div>
      <div className="modal-container p-4 rounded shadow bg-white">
        <h5 className="mb-3 text-center">
          {pesoEditar
            ? idioma === "es" ? "Editar Registro de Peso" : "Edit Weight Record"
            : idioma === "es" ? "Nuevo Registro de Peso" : "New Weight Record"}
        </h5>

        <div className="text-center mb-3">
          <img
            src={preview || imagenPorDefecto}
            alt="Preview"
            className="preview-img rounded"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">{idioma === "es" ? "Fecha" : "Date"}</label>
            <input
              type="date"
              className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
              value={fecha}
              onChange={handleFechaChange}
              required
            />
            {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">{idioma === "es" ? "Peso (kg)" : "Weight (kg)"}</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={peso}
              onChange={e => setPeso(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{idioma === "es" ? "Imagen (opcional)" : "Image (optional)"}</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleImagenChange}
              className={`form-control ${errors.imagen ? "is-invalid" : ""}`}
            />
            {errors.imagen && <div className="invalid-feedback">{errors.imagen}</div>}
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
              {idioma === "es" ? "Cancelar" : "Cancel"}
            </button>
            <button type="submit" className="btn btn-primary">
              {pesoEditar
                ? idioma === "es" ? "Guardar cambios" : "Save changes"
                : idioma === "es" ? "Crear" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
