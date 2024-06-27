import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiOutlineDislike,
} from 'react-icons/ai';
import { Box } from '@chakra-ui/react';

function VoteButton({
  id,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
  upVotesBy,
  downVotesBy,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = () => {
    upVote(id);
  };

  const onDownVoteClick = () => {
    downVote(id);
  };

  const onNeutralizeVoteClick = () => {
    neutralizeVote(id);
  };

  return (
    <Box className="vote-button" display="flex" alignItems="center">
      {isUpVoted ? (
        <AiFillLike onClick={onNeutralizeVoteClick} />
      ) : (
        <AiOutlineLike onClick={onUpVoteClick} />
      )}
      <p className="vote-button__upvotes">{upVotesBy.length}</p>
      {isDownVoted ? (
        <AiFillDislike onClick={onNeutralizeVoteClick} />
      ) : (
        <AiOutlineDislike onClick={onDownVoteClick} />
      )}
      <p className="vote-button__downvotes">{downVotesBy.length}</p>
    </Box>
  );
}

VoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VoteButton;
