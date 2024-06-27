import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import useInput from '../hooks/useInput';

export default function RegisterForm({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleRegister = (event) => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="input-register" onSubmit={handleRegister}>
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={onNameChange}
          placeholder="Name"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">E-Mail</FormLabel>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
        />
      </FormControl>
      <Button type="submit" mt={4} colorScheme="blue">
        Register
      </Button>
    </form>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};
