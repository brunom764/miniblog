import React, { useState } from 'react';

function CommentAnswer({ commentId, addAnswer }) {
  const [emailA, setEmailA] = useState('');
  const [answer, setAnswer] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    addAnswer(commentId, emailA, answer);
    setEmailA('');
    setAnswer('');
  }

  return (
    <div className='flex mt-3'>
      <form onSubmit={handleSubmit} className='flex items-center flex-col xl:flex-row'>
        <label htmlFor="email" className='mr-2'></label>
        <input
          id="email"
          type="email"
          placeholder="Seu e-mail"
          className="rounded-lg pb-3 pt-3 pl-4 pr-8 m-2 w-full placeholder-gray-400 text-sm text-black"
          required
          value={emailA}
          onChange={(event) => setEmailA(event.target.value)}
        />
        <label htmlFor="answer" className='mr-2'></label>
        <textarea
          id="answer"
          placeholder="Digite aqui para responder"
          className="rounded-lg pb-8 pt-2 pl-4 pr-8 m-2 w-full placeholder-gray-400 text-sm text-black"
          required
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
        <button  
          className="bg-gray-300 rounded-full px-3 m-2 py-2 text-sm font-semibold 
            text-gray-700 hover:bg-gray-400" 
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default CommentAnswer;


