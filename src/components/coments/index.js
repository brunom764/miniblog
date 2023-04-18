import { useState } from 'react';
import { MongoClient } from 'mongodb';

function Comments({ postId }) {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

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
      createdAt: new Date(),
    });

    setEmail('');
    setComment('');
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
    </div>
  );
}

export default Comments;

