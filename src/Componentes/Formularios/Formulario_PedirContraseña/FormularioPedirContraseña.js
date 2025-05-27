import { useState} from 'react';
import api from '../../../auth/axiosConfig';

export default function FormularioPedirEmail({idioma}){
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      setErrors({})
      await api.post('solicitar-contraseña/', { email });
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

  return(
    <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '400px' }}>
      <h4 className="mb-3">{idioma === 'es' ? 'Recuperar contraseña' : 'Recover password'}</h4>
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
      <button type="submit" className="btn btn-primary w-100">Solicitar correo</button>
    </form>
  )

}