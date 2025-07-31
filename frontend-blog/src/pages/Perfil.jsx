import React, { useState } from 'react';
import api from '../services/api';

function Perfil() {
  const [nombre, setNombre] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleVerPerfil = async () => {
    const token = localStorage.getItem('token'); // el que guardaste en Login.jsx

    if (!token) {
      setMensaje('No hay token guardado. Iniciá sesión primero.');
      return;
    }

    try {
      const response = await api.get('/perfil/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNombre(response.data.nombre);
      setMensaje('');
    } catch (error) {
      setMensaje('Error al obtener el perfil: ' + (error.response?.status === 401 ? 'No autorizado' : error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl mb-4">Perfil del Usuario</h2>
      <button onClick={handleVerPerfil} className="btn mb-4">Ver Perfil</button>

      {nombre && <p className="text-lg">👤 Nombre: <strong>{nombre}</strong></p>}
      {mensaje && <p className="text-red-500 mt-2">{mensaje}</p>}
    </div>
  );
}
export default Perfil;