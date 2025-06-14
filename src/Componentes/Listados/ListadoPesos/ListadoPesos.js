import { useState, useEffect } from 'react';
import "./ListadoPesos.css";

export default function ListadoPesos({ idioma, pesos, eliminar, editar }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const pesosOrdenados = [...pesos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const pesosPorPagina = 4;
  const totalPaginas = Math.ceil(pesosOrdenados.length / pesosPorPagina);

  const pesosPaginados = pesosOrdenados.slice(
    (paginaActual - 1) * pesosPorPagina,
    paginaActual * pesosPorPagina
  );

  const abrirImagen = (url) => setImagenSeleccionada(url);
  const cerrarModal = () => setImagenSeleccionada(null);
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  useEffect(() => {
    const totalPaginasActualizado = Math.ceil(pesosOrdenados.length / pesosPorPagina);
    if (paginaActual > totalPaginasActualizado) {
      setPaginaActual(totalPaginasActualizado || 1); // || 1 por si no queda ninguna página
    }
  }, [pesos, paginaActual]);

  return (
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
            {pesosPaginados.map((peso) => (
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
                  <div className="d-flex justify-content-center gap-2">
                    <button className="boton" onClick={() => editar(peso)}>
                      {idioma === 'es' ? "Editar" : "Update"}
                    </button>
                    <button className="boton" onClick={() => eliminar(peso.id)}>
                      {idioma === 'es' ? "Eliminar" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Controles de paginación */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-secondary me-2"
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            {idioma === 'es' ? "Anterior" : "Previous"}
          </button>
          <span className="align-self-center">
            {idioma === 'es' ? "Página" : "Page"} {paginaActual} / {totalPaginas}
          </span>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            {idioma === 'es' ? "Siguiente" : "Next"}
          </button>
        </div>
      )}

      {/* Modal de imagen ampliada */}
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
  );
}
