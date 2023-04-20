import { useState } from 'react';

function CommentForm({ addComment }) {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    addComment(email, comment);
    setEmail('');
    setComment('');
  }

  return (
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

      <button 
        type="submit" 
        className="inline-block bg-gray-300 rounded-full my-5 px-5 py-3 text-md font-semibold 
        text-gray-700 mr-2 mb-2 hover:bg-gray-400"
      >
        Enviar comentário
      </button>
    </form>
  );
}

export default CommentForm
