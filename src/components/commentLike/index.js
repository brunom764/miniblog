import React from 'react';

function CommentLike({ commentId, likes, addLike }) {
  return (
    <button
      className='inline-flex items-center px-4 py-2 border border-transparent 
        rounded-full shadow-sm text-sm font-medium text-gray-700 
        bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-gray-500'
      onClick={() => addLike(commentId)}
    >
      <span>{likes} curtidas</span>
    </button>
  );
}

export default CommentLike;

