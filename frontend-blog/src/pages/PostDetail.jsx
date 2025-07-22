import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    api.get(`/posts/${id}/`).then(res => setPost(res.data));
    api.get(`/posts/${id}/comments/`).then(res => setComments(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/posts/${id}/comments/`, { author, text });
      setAuthor('');
      setText('');
      const res = await api.get(`/posts/${id}/comments/`);
      setComments(res.data);
    } catch {
      alert('Error al enviar comentario');
    }
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl mb-2 font-bold">{post.title}</h2>
      <p className="mb-6">{post.content}</p>

      <h3 className="text-xl mb-2 font-semibold">Comentarios</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Tu nombre" className="input w-full mb-2" required />
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Comentario" className="input w-full mb-2" required />
        <button type="submit" className="btn">Enviar comentario</button>
      </form>
      {comments.map(c => (
        <div key={c.id} className="border p-2 mb-2">
          <p className="font-bold">{c.author}</p>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export default PostDetail;
