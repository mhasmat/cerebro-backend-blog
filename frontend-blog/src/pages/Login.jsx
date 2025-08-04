import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // obtener token de acceso
      const res = await api.post('/token/', { username, password });
      // guardar token en el localStorage
      localStorage.setItem('token', res.data.access);
      // obtener datos del perfil usando el token
      const perfilRes = await api.get('/perfil/', {
        headers: {
          'Authorization': `Bearer ${res.data.access}`,
          'Content-Type': 'application/json'
        }
      });
      // guardar datos del usuario en localStorage
      localStorage.setItem('username', perfilRes.data.username);
      localStorage.setItem('user_id', perfilRes.data.id);
      navigate('/dashboard');
    } catch (err) {
        alert('Login failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <input 
        type="text" 
        value={username} 
        onChange={e => setUsername(e.target.value)} placeholder="Usuario" 
        className="input" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} placeholder="Contraseña" 
        className="input mt-2" 
        required 
      />
      <button type="submit" className="btn mt-4">Login</button>
    </form>
  );
}

export default Login;
