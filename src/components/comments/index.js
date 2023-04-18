import { useState, useEffect } from 'react';
import axios from 'axios';
import { connectToDatabase, insertComment, updateCommentLikes} from '../../../config/mongodb';

function Comments({ postId }) {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const { db } = await connectToDatabase();
      const comments = await db.collection('comments').find({ postId: postId }).toArray();
      setComments(comments);
    }
    fetchComments();
  }, [postId]);

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
    <div className='bg-gray-100 mt-10'>
      <h1 className='text-center pt-10 mb-2 text-3xl uppercase'> Comentários</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center py-10'> 
        <label htmlFor="email"></label>
        <input 
          id="email"
          type="email"
          placeholder="E M A I L"
          className="rounded-lg py-2 px-4 w-64 placeholder-gray-400 text-sm text-black my-2"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="comment"></label>
        <textarea
          id="comment"
          placeholder="C O M E N T Á R I O"
          className="rounded-lg pb-8 pt-2 px-2 w-64 placeholder-gray-400 text-sm text-black my-2"
          required
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <button type="submit" 
          className="inline-block bg-gray-300 rounded-full my-5 px-5 py-3 text-md font-semibold 
          text-gray-700 mr-2 mb-2 hover:bg-gray-400">
          Enviar comentário
          </button>
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


