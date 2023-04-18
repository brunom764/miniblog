import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Lógica para obter comentários do MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(process.env.MONGODB_DB);
    const comments = await db.collection('comments').find().toArray();
    res.json(comments);
  } else if (req.method === 'POST') {
    // Lógica para adicionar comentário ao MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(process.env.MONGODB_DB);
    const { email, comment, postId } = req.body;
    const result = await db.collection('comments').insertOne({
      email,
      comment,
      postId,
      createdAt: new Date(),
    });
    res.json(result.ops[0]);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
