import { useState} from 'react';
import "./ListadoPesos.css"
export default function ListadoPesos({idioma, pesos, eliminar, editar}){
  const pesosOrdenados = [...pesos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const abrirImagen = (url) => setImagenSeleccionada(url);
  const cerrarModal = () => setImagenSeleccionada(null);

  
  return(
    <div className="container mt-4">
  <h3 className="text-center mb-4">{idioma === 'es' ? "Historial de Pesos" : "Weight History"}</h3>
  
  <div className="table-responsive">
    <table className="table table-striped align-middle text-center">
      <thead className="table-light">
        <tr>
          <th>{idioma === 'es' ? "Fecha" : "Date"}</th>
          <th>{idioma === 'es' ? "Peso" : "Weight"}</th>
          <th>{idioma === 'es' ? "Foto" : "Photo"}</th>
          <th>{idioma === 'es' ? "Acciones" : "Actions"}</th>
        </tr>
      </thead>
      <tbody>
        {pesosOrdenados.map((peso) => (
          <tr key={peso.id}>
            <td>{peso.fecha}</td>
            <td>{peso.peso}Kg</td>
            <td>
              {peso.foto_pesaje ? (
                <img
                  src={peso.foto_pesaje}
                  alt="Foto de pesaje"
                  className="img-thumbnail"
                  style={{ width: '50px', cursor: 'pointer' }}
                  onClick={() => abrirImagen(peso.foto_pesaje)}
                />
              ) : (
                <span className="text-muted">{idioma === 'es' ? "Sin Foto" : "No Photo"}</span>
              )}
            </td>
            <td>
              <div className="d-flex justify-content-center">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editar(peso)}>
                  {idioma === 'es' ? "Editar" : "Update"}
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(peso.id)}>
                  {idioma === 'es' ? "Eliminar" : "Delete"}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {imagenSeleccionada && (
    <div
      className="modal-backdrop"
      onClick={cerrarModal}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <img
        src={imagenSeleccionada}
        alt="Ampliada"
        style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '10px' }}
      />
    </div>
  )}
</div>

  )
}