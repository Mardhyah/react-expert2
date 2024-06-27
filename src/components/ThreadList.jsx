import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadsList({
  threads, upVote, downVote, neutralVote,
}) {
  return (
    <Box className="threads-list card" borderWidth="1px" borderRadius="lg" overflow="hidden">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          upVote={upVote}
          downVote={downVote}
          neutralVote={neutralVote}
        />
      ))}
    </Box>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export default ThreadsList;
