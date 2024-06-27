import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button } from '@chakra-ui/react';
import VoteButton from '../components/VoteButton';
import { calculatePostedTime } from '../utils';

export default function ThreadDetail({
  id,
  title,
  body,
  owner,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  upVoteThreadDetail,
  downVoteThreadDetail,
  neutralizeVoteThreadDetail,
  authUser,
}) {
  return (
    <Box className="thread-detail">
      <Button variant="outline" className="thread-item__category">
        #{category}
      </Button>

      <Box>
        <h1>{title}</h1>
        <p className="thread-detail__body">{body}</p>
      </Box>

      <Box>
        <VoteButton
          id={id}
          authUser={authUser}
          upVote={upVoteThreadDetail}
          downVote={downVoteThreadDetail}
          neutralizeVote={neutralizeVoteThreadDetail}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
        />
        <span className="thread-item__user-name">
          Dibuat oleh{' '}
          <Avatar
            src={owner.avatar}
            alt={owner.name}
            width={8}
            height={8}
          />
          <strong>{owner.name}</strong>{' '}
          {calculatePostedTime(createdAt)}
        </span>
      </Box>
    </Box>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVoteThreadDetail: PropTypes.func.isRequired,
  downVoteThreadDetail: PropTypes.func.isRequired,
  neutralizeVoteThreadDetail: PropTypes.func.isRequired,
};
