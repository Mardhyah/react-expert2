import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { FaRegComment } from 'react-icons/fa';
import { calculatePostedTime } from '../utils/index';
import VoteButton from '../components/VoteButton';

export default function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  upVote,
  downVote,
  neutralVote,
  user,
  authUser,
}) {
  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  const bodyString = typeof body === 'string' ? body : '';
  const truncatedBody = bodyString.length > 100 ? `${bodyString.substring(0, 100)}...` : bodyString;

  return (
    <div className="thread-item-card">
      <div className="thread-item-detail">
        <div>
          <button type="button" className="thread-item-category">
            #
            {category}
          </button>
          <div
            role="button"
            tabIndex={0}
            className="thread-item-title"
            onClick={onThreadClick}
            onKeyDown={onThreadPress}
          >
            <h1>{title}</h1>
          </div>
          <br />
          <span className="thread-item-body">{parse(truncatedBody)}</span>
        </div>
        <Box as="footer" mt={4}>
          <HStack spacing={4}>
            <VoteButton
              id={id}
              authUser={authUser}
              upVote={upVote}
              downVote={downVote}
              neutralizeVote={neutralVote}
              upVotesBy={upVotesBy}
              downVotesBy={downVotesBy}
            />
            <HStack>
              <Icon as={FaRegComment} />
              <Text>{totalComments}</Text>
            </HStack>
            <Text>{calculatePostedTime(createdAt)}</Text>
            <Text>
              Created by <strong>{user.name}</strong>
            </Text>
          </HStack>
        </Box>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export { userShape, threadItemShape };
