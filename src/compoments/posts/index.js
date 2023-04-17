import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('https://news-api.lublot.dev/api/posts?_start=0&_end=5');
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
      <h1>Últimas publicações</h1>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {Array.isArray(posts) && posts.map((post) => (
        <div key={post.id} className="mb-5 text-center lg:mb-0 lg:flex lg:text-left">
        <a
          href='#'
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
            {post.title}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p
            className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
          >
            {post.author}
          </p>
        </a>
      </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;


