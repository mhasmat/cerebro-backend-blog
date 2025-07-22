import { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchPosts = async () => {
    const res = await api.get('/posts/');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
      alert('Error saving post');
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
      <form onSubmit={handleSubmit} className="mb-6">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="input w-full mb-2" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Contenido" className="input w-full mb-2" required />
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
