const express = require('express');
const { MongoClient } = require('mongodb');


const app = express();

app.get('/api/comments', async (req, res) => {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(process.env.MONGODB_DB);
    const comments = await db.collection('comments').find().toArray();
    res.json(comments);
  });

  
  app.post('/api/comments', async (req, res) => {
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
  });

  
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  