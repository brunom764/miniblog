import Comments from '@/components/comments';
import Header from '@/components/header';
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
      <Header/>
      <h1 className='text-center mt-10 mb-2 text-3xl uppercase'>{post.title}</h1>
      <h3 className='text-center opacity-80 mb-10'>{post.author}</h3>
      <div className='flex flex-col m-5 lg:flex-row'>
        <img src={post.coverImage} alt='picture' className='w-auto h-96 my-2 mx-5 object-cover'/>
        <p className='mx-5 text-justify'>{post.content}</p>
      </div>
      <Comments postId={id}/>
    </div>
  );
}

export default Post;
