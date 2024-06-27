import React from 'react';
import PropTypes from 'prop-types';
import { calculatePostedTime } from '../utils/index';
import VoteButton from './VoteButton';

export default function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralizeVote,
  authUser,
}) {
  return (
    <section className="comment-wrapper">
      <div className="comment-wrapper-container">
        <div className="comment-wrapper-profile">
          <img
            className="comment-wrapper-user-avatar"
            src={owner.avatar}
            alt={owner.name}
          />
          <p className="comment-wrapper-user-name">{owner.name}</p>
        </div>
        <span className="comment-wrapper-created">{calculatePostedTime(createdAt)}</span>
      </div>
      <p className="comment-wrapper-user-content">{content}</p>
      <div className="comment-wrapper-actions">
        <VoteButton
          id={id}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
        />
      </div>
    </section>
  );
}

const userShape = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};

CommentItem.propTypes = commentShape;

export { commentShape };
