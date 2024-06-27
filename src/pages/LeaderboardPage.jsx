import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboards/actions';
import { Box, Heading, Flex, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export default function LeaderboardsPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  if (!leaderboards) {
    return null;
  }

  return (
    <Box as="section" className="leaderboards-page">
      <Box className="leaderboards-page card">
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Heading as="h2">Active User Leaderboard</Heading>
          <Heading as="h2">Score</Heading>
        </Flex>
        <Table className="table">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboards.map(({ user, score }) => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
