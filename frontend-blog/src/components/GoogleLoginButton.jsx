// components/GoogleLoginButton.jsx
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function GoogleLoginButton() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:8000/api/auth/social/login/', {
        access_token: credentialResponse.credential,
        provider: 'google',
      });

      const token = res.data.access; // o res.data.key, según tu backend
      localStorage.setItem('jwt', token);

      alert('Login con Google exitoso!');
    } catch (error) {
      console.error('Error al autenticar con el backend:', error);
      alert('Falló el login con Google');
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          alert('Falló el login con Google');
        }}
        useOneTap
      />
    </div>
  );
}
