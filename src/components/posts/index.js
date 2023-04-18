import { useState, useEffect } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('https://news-api.lublot.dev/api/posts?_start=0&_end=6');
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError('Ocorreu um erro ao buscar os posts.');
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);
  

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className='text-center m-5 text-gray-600'>Últimas publicações</h1>
      <div className="mb-5 grid text-center lg:grid-cols-3 lg:text-left">
        {Array.isArray(posts) && posts.map((post) => (
        <div key={post.id} class="max-w-sm rounded overflow-hidden shadow-lg mx-2 my-6">
        <img class="w-full" src={post.coverImage} alt="Sunset in the mountains"/>
        <div class="px-6 py-4">
          <h2 class="font-bold text-xl mb-2">{post.title}</h2>
          <p class="text-gray-700 text-base">
          {post.content.substr(0, 120).replace(/\s\S*$/, '...')}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-5 py-3 text-md font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-400">
            <a  href={`/post/${post.id}`} target="_blank">Ver mais</a></span>
        </div>
      </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;

