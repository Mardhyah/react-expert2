import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import useInput from '../hooks/useInput';

export default function ChakraLoginForm({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleLogin = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={6}>
        <FormControl id="email">
          <FormLabel fontSize="lg">Email Address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Enter your email"
            size="lg"
            borderRadius="md"
            borderColor="gray.400"
            _hover={{ borderColor: 'blue.400' }}
            _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel fontSize="lg">Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Enter your password"
            size="lg"
            borderRadius="md"
            borderColor="gray.400"
            _hover={{ borderColor: 'blue.400' }}
            _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg" borderRadius="md">
          Login
        </Button>
      </Stack>
    </form>
  );
}

ChakraLoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};
