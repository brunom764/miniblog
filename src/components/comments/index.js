import { useState, useEffect } from 'react';
import axios from 'axios';
import commentsData from '../../data/comments.json';


function Comments(postId) {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [answer, setAnswer] = useState('');
  const [comments, setComments] = useState(commentsData);


  useEffect(() => {
    async function fetchComments() {
      const response = await axios.get('http://localhost:4000/api/comments');
      setComments(response.data);
    }
    fetchComments();
  }, [postId]);

  async function handleSubmit(event) {
    event.preventDefault();
  
    const newComment = {
      key: email,
      email: email,
      text: comment,
      like: 0
    };
  
    // adiciona o novo comentário ao estado comments
    setComments([...comments, newComment]);


    // faz um post para o endpoint /api/comments para salvar o novo comentário no backend
    await axios.post("http://localhost:4000/api/comments", newComment);
  
    setEmail("");
    setComment("");
  }
  
  async function handleLike(commentKey) {
    const updatedComments = comments.map((c) => {
      if (c.key === commentKey) {
        return {
          ...c,
          like: c.like + 1,
        };
      }
      return c;
    });
  
    // atualiza o commentsData com o comentário que recebeu um like
    const comment = commentsData.find((c) => c.key === commentKey);
    comment.like += 1;
  
    // faz um post para o endpoint /api/comments para salvar o novo estado dos comentários no backend
    await axios.post("http://localhost:4000/api/comments", updatedComments);
  
    // atualiza o estado comments com o novo número de curtidas
    setComments(updatedComments);
  }

  async function handleAnswer(commentKey) {
    const c = commentsData.find((c) => c.key === commentKey);
  
    const newAnswer = {
      id: Math.random(),
      text: answer,
    };
  
    // Verifica se c.answer é um array antes de usar o operador spread
    const updatedComment = {
      ...c,
      answer: Array.isArray(c.answer) ? [...c.answer, newAnswer] : [newAnswer],
    };
  
    // atualiza o commentsData com a resposta ao comentário
    const index = commentsData.findIndex((c) => c.key === commentKey);
    commentsData[index] = updatedComment;
  
    // faz um post para o endpoint /api/comments para salvar o novo estado dos comentários no backend
    axios.post("http://localhost:4000/api/comments", updatedComment);
  
    // atualiza o estado comments com a nova resposta
    setComments(commentsData);
    setAnswer("");
  }
  
  
  
  return (
    <div className='bg-gray-100 mt-10'>
      <h1 className='text-center pt-10 mb-2 text-3xl uppercase'> Comente!</h1>
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

      <section className='bg-gray-200 py-10'>
        <h1 className='text-center pt-10 mb-2 text-3xl uppercase'> Comentários</h1>
        <ul className='m-5'>
        {comments
         .filter(comment => comment.email  && comment.text)
         .map((comment) => (
          <li className='p-3 m-3 border border-black rounded-xl bg-gray-100' key={comment.key}>
          <div className='flex'>
            <h5 className='pr-2'>{comment.email} comentou:</h5>
            <p className=''>{comment.text}</p>
          </div>

          <p className='my-3'>
           {comment.like}{' '} Curtidas
            <button className='border rounded-xl border-black uppercase p-2 mx-2' 
            onClick={() => handleLike(comment.key)}>Curtir</button>
          </p>
          <div className='flex'>
            <label htmlFor="answer"></label>
            <textarea
              id="answer"
              placeholder="Digite aqui para responder"
              className="rounded-lg pb-8 pt-2 px-2 w-64 placeholder-gray-400 text-sm text-black my-2"
              required
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
            <button  
              className="bg-gray-300 rounded-full mx-2 px-2 py-1 text-sm font-semibold 
                text-gray-700 mr-2 mb-2 hover:bg-gray-400" 
                onClick={() => handleAnswer(comment.key)}>
                Enviar Resposta
              </button>
              </div>
          </li>
        ))}
        </ul>
      </section>
    </div>
  );
}

export default Comments;


