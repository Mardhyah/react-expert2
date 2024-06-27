import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Text, Flex } from '@chakra-ui/react';
import { userShape } from './Thread/ThreadItem';

export default function LeaderboardsItems({ user, score }) {
  return (
    <Flex alignItems="center" className="leaderboard_item">
      <Avatar
        className="leaderboard_item-avatar"
        src={user.avatar}
        alt={user.name}
        boxSize={12}
      />
      <Text className="leaderboard_item-name" ml="3">{user.name}</Text>
      <Text className="leaderboard_item-score" ml="auto">{score}</Text>
    </Flex>
  );
}

LeaderboardsItems.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};
