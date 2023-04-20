import { useState, useEffect } from 'react';
import axios from 'axios';
import commentsData from '../../data/comments.json';

export function useComments(postId) {
  const [comments, setComments] = useState(commentsData);

  useEffect(() => {
    async function fetchComments() {
      const response = await axios.get('http://localhost:4000/api/comments');
      setComments(response.data);
    }
    fetchComments();
  }, [postId]);

  async function addComment(email, comment) {
    const newComment = {
      postId: postId.postId,
      key: email,
      email: email,
      comment: comment,
      like: 0,
      answer: {
        id: 0,
        text: ''
      }
    };

    setComments([...comments, newComment]);
    await axios.post("http://localhost:4000/api/comments", newComment);
  }

  async function addLike(commentKey) {
    const updatedComments = comments.map((c) => {
      if (c.key === commentKey) {
        return {
          ...c,
          like: c.like + 1,
        };
      }
      return c;
    });

    const comment = commentsData.find((c) => c.key === commentKey);
    comment.like += 1;

    await axios.put("http://localhost:4000/api/comments", updatedComments);

    setComments(updatedComments);
  }

  async function addAnswer(commentKey, answer) {
    const c = commentsData.find((c) => c.key === commentKey);

    const newAnswer = {
      id: Math.random() * 10,
      text: answer,
    };

    const updatedComment = {
      ...c,
      answer: newAnswer,
    };

    await axios.post("http://localhost:4000/api/comments/answer", updatedComment);

    setComments(commentsData);
  }

  return {
    comments,
    addComment,
    addLike,
    addAnswer,
  };
}
