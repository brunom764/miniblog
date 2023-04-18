import { useState, useEffect } from 'react';
import axios from 'axios';

function Comments({ postId }) {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const response = await axios.get('/api/comments');
      setComments(response.data);
    }
    fetchComments();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await axios.post('/api/comments', {
      email,
      comment,
      postId,
    });

    setEmail('');
    setComment('');

    setComments((prevComments) => [...prevComments, response.data]);
  }

  async function handleLike(commentId) {
    const response = await axios.put(`/api/comments/${commentId}`);

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? { ...comment, likes: response.data.likes } : comment
      )
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="comment">Comentário:</label>
        <textarea
          id="comment"
          required
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <button type="submit">Enviar comentário</button>
      </form>

      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.comment}</p>
            <p>
              Likes: {comment.likes}{' '}
              <button onClick={() => handleLike(comment._id)}>Curtir</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;


