import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, UnorderedList, ListItem } from '@chakra-ui/react';

export default function Navigation({ authUser = null, logout = () => { } }) {
  return (
    <Box
      as="nav"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="1rem"
      bg="gray.100"
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
      borderRadius="8px"
    >
      <Box>
        <UnorderedList
          display="flex"
          listStyleType="none"
          m={0}
          p={0}
        >
          {authUser !== null && (
            <>
              <ListItem>
                <Link to="/leaderboard">
                  <Button
                    variant="outline"
                    mr="1rem"
                  >
                    Leaderboard
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/">
                  <Button
                    variant="outline"
                    mr="1rem"
                  >
                    Home
                  </Button>
                </Link>
              </ListItem>
            </>
          )}
        </UnorderedList>
      </Box>
      <Box>
        {authUser !== null && (
          <Button
            variant="outline"
            onClick={logout}
            borderColor="gray.300"
            color="gray.700"
            _hover={{ bg: 'gray.200' }}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
}
