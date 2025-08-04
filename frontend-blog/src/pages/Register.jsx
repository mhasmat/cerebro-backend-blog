import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register/', { username, email, password });
      navigate('/login');
    } catch (err) {
      alert(`Register failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Registro</h2>
      <input 
        type="text" 
        value={username} 
        onChange={e => setUsername(e.target.value)} placeholder="nombre de usuario" 
        className="input" 
        required 
      />
      <br />
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} placeholder='ejemplo@mail.com' 
        className='input' 
        required 
      />
      <br />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} placeholder="contraseña" 
        className="input mt-2" 
        required 
      />
      <br /><br />
      <button type="submit" className="btn mt-4">Registrarse</button>
    </form>
  );
}

export default Register;
