import { useState} from 'react';
import { useComments } from './useComments';


function Comments(postId) {
  const { comments, addComment, addLike, addAnswer } = useComments(postId);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [answer, setAnswer] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    addComment(email, comment);
    setEmail('');
    setComment('');
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
     .filter(comment => comment.id == postId.postId  && comment.email)
     .map((comment) => (
      <li className='p-3 m-3 border border-black rounded-xl bg-gray-100' key={comment.key}>
        <div className='flex items-center mb-3'>
          <img className='h-10 w-10 rounded-full mr-3'
           src='https://source.unsplash.com/random' alt='Profile'/>
          <div>
            <h5 className='text-sm font-semibold'>{comment.email}</h5>
            <p className='text-gray-700'>{comment.comment}</p>
          </div>
        </div>

        <div className='flex items-center mt-3'>
        <button
          className='inline-flex items-center px-4 py-2 border border-transparent 
             rounded-full shadow-sm text-sm font-medium text-gray-700 
             bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
             focus:ring-offset-2 focus:ring-gray-500'
          onClick={() => addLike(comment.key)}>
         <span>{comment.like} curtidas</span>
        </button>

          <label htmlFor="answer" className='mr-2'></label>
          <textarea
            id="answer"
            placeholder="Digite aqui para responder"
            className="rounded-lg pb-8 pt-2 px-2 mx-2 w-full placeholder-gray-400 text-sm text-black"
            required
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />
          <button  
            className="bg-gray-300 rounded-full px-2 py-1 text-sm font-semibold 
              text-gray-700 hover:bg-gray-400" 
              onClick={() => addAnswer(comment.key, answer)}>
              Enviar
            </button>
          </div>
          {comment.answer && comment.answer.length > 0 && (
          <ul>
            {comment.answer.map((answer) => (
              answer.text.length > 0 && (
                <li key={answer.id}>
                  <span className='text-gray-700'>
                    Pessoa {parseInt(answer.id)} respondeu esse comentário: 
                  </span>
                  {answer.text}
                </li>
              )
            ))}
          </ul>
        )}
        </li>
      ))}
    </ul>
  </section>

    </div>
  );
}

export default Comments;


