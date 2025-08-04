import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts/').then(res => setPosts(res.data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Posts públicos</h2>
      {posts.map(post => (
        <div key={post.id} className="border p-4 mb-2">
          <h3 className="font-bold text-lg">{post.titulo}</h3>
          <p>{post.contenido.slice(0, 100)}...</p>
          <Link to={`/post/${post.id}`} className="text-blue-600">Leer más</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
