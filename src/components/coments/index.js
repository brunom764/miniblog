import { useState } from 'react';
import { MongoClient } from 'mongodb';

function Comments({ postId }) {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);

    await db.collection('comments').insertOne({
      email,
      comment,
      postId,
      likes: 0,
      createdAt: new Date(),
    });

    setEmail('');
    setComment('');

    const newComments = await db
      .collection('comments')
      .find({ postId })
      .sort({ createdAt: -1 })
      .toArray();
    setComments(newComments);
  }

  async function handleLike(commentId) {
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);

    const result = await db
      .collection('comments')
      .findOneAndUpdate(
        { _id: commentId },
        { $inc: { likes: 1 } },
        { returnOriginal: false }
      );

    const updatedComment = result.value;
    const updatedComments = comments.map((c) =>
      c._id === updatedComment._id ? updatedComment : c
    );
    setComments(updatedComments);
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

