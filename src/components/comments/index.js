import { useComments } from './useComments';
import CommentForm from '../commentForm';
import CommentLike from '../commentLike';
import CommentAnswer from '../commentAnswer';

function Comments(postId) {
  const { comments, addComment, addLike, addAnswer } = useComments(postId);

  return (
    <div className='bg-gray-100 mt-10'>
      <h1 className='text-center pt-10 mb-2 text-3xl uppercase'> Comente!</h1>
      <CommentForm addComment={addComment} />

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
          <CommentLike 
                commentId={comment.key} 
                likes={comment.like} 
                addLike={addLike} />
          <CommentAnswer 
                commentId={comment.key} 
                addAnswer={addAnswer} />
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
