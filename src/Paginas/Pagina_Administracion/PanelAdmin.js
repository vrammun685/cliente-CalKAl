import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../auth/axiosConfig';
import ListaAlimentosAdmin from '../../Componentes/Listados/ListadosAdmin/ListadoAlimentosAdmin/ListadoAlimentosAdmin';

export default function AdminPanel() {
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "es");


  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>
        <div>
          {/* Sección Usuarios */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Usuarios Registrados</h2>

          {/* Sección Alimentos */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Listado de Alimentos</h2>
          <ListaAlimentosAdmin idioma={idioma}/>
          
        </div>
    </div>
  </div>
);
}
