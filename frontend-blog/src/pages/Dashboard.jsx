import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if(!token || !storedUsername) {
      navigate('/login');
    } else {
      setUsername(storedUsername);
      fetchPosts();
      fetchPerfil();
    }
  }, [navigate]);

  async function fetchPerfil() {
    const token = localStorage.getItem('token');

    if(!token) return;

    try {
      const response = await api.get('/perfil/', {
        headers: {'Authorization': token}
      });
      setUsername(response.data.username);
      localStorage.setItem('username', response.data.username);
    } catch(error) {
      alert('Error obteniendo perfil:', error);
    } 
  }

  const fetchPosts = async () => {
    const res = await api.get('/posts/');
    setPosts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/posts/${editingId}/`, { title, content });
      } else {
        await api.post('/posts/', { title, content });
      }
      setTitle('');
      setContent('');
      setEditingId(null);
      fetchPosts();
    } catch (err) {
      alert('Error saving post', err);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingId(post.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}/`);
      fetchPosts();
    } catch {
      alert('Error deleting post');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Mis Posts</h2>
      <h3 className="text-2xl mb-4">Bienvenido {username}!</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} placeholder="Título" 
          className="input w-full mb-2" 
          required 
        />
        <textarea 
          value={content} 
          onChange={e => setContent(e.target.value)} placeholder="Contenido" 
          className="input w-full mb-2" 
          required 
        />
        <button type="submit" className="btn">{editingId ? 'Actualizar' : 'Crear'}</button>
      </form>
      {posts.map(post => (
        <div key={post.id} className="border p-4 mb-2">
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p>{post.content}</p>
          <div className="space-x-2 mt-2">
            <button onClick={() => handleEdit(post)} className="btn-sm">Editar</button>
            <button onClick={() => handleDelete(post.id)} className="btn-sm">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
