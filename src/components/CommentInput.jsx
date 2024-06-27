import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function CommentInput({ addComment }) {
  const [comment, onCommentChange, setComment] = useInput('');

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    addComment(comment);
    setComment('');
  };

  return (
    <div className="comment-input-wrapper">
      <span className="comment-input-label">Beri Komentar</span>
      <form className="comment-input-form" onSubmit={handleCommentSubmit}>
        <textarea
          className="comment-input-textarea"
          value={comment}
          onChange={onCommentChange}
          rows="5"
        />
        <button type="submit" className="comment-input-submit">
          Kirim
        </button>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};
