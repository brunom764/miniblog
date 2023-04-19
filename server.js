const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors()); 

app.get('/api/comments', async (req, res) => {
  try {
    const comments = JSON.parse(fs.readFileSync('./src/data/comments.json'));
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const { postId, email, comment } = req.body;
    const comments = JSON.parse(fs.readFileSync('./src/data/comments.json'));
    const newComment = {
      id: postId,
      key: email,
      email: email,
      comment: comment,
      like: 0,
      answer: {
        id: 0,
        text: ''
      }
    };
    const updatedComments = [...comments, newComment];
    fs.writeFileSync('./src/data/comments.json', JSON.stringify(updatedComments, null, 2));
    res.json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
