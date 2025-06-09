export default function ModalConfirmacion({ mostrar, onCancelar, onConfirmar, idioma }) {
  if (!mostrar) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{idioma === 'es' ? '¿Estás seguro?' : 'Are you sure?'}</h5>
            <button type="button" className="btn-close" onClick={onCancelar}></button>
          </div>
          <div className="modal-body">
            <p>{idioma === 'es' ? 'Esta acción no se puede deshacer.' : 'This action cannot be undone.'}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancelar}>
              {idioma === 'es' ? 'Cancelar' : 'Cancel'}
            </button>
            <button className="btn btn-danger" onClick={onConfirmar}>
              {idioma === 'es' ? 'Confirmar' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
