import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevId, setPrevId] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      if (id !== prevId) { // Verifica se o ID é diferente do ID da postagem anterior
        try {
          const res = await fetch(`https://news-api.lublot.dev/api/posts/${id}`);
          const data = await res.json();
          setPost(data);
          setLoading(false);
          setPrevId(id); // Armazena o ID da postagem atual como ID da postagem anterior
        } catch (error) {
          setError('Ocorreu um erro ao buscar o post.');
          setLoading(false);
        }
      }
    }
    fetchPost();
  }, [id, prevId]);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>oi</h2>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;