// components/GoogleLoginButton.jsx
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



export default function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    const decoded = jwtDecode(idToken);
    console.log("Usuario Google:", decoded);

    try {
     const res = await axios.post(
        "http://localhost:8000/usuarios/api/auth/google-id-token/",
        {
          id_token: credentialResponse.credential, // SOLO este campo en el body
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Token JWT:", res.data);

      const token = res.data.access; // o res.data.key, según tu backend
      localStorage.setItem('token', token);

      alert('Login con Google exitoso!');
      navigate("/dashboard");

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
