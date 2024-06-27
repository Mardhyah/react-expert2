import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/actions';
import RegisterForm from '../components/RegisterForm';
import { Box, Heading, Link, Text } from '@chakra-ui/react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box className="form-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box className="register-page__main">
        <Heading size="lg">Create an Account</Heading>
        <RegisterForm register={onRegister} />
        <Text>
          Already have an account?{' '}
          <Link as={RouterLink} to="/" textDecoration="underline" color="blue">
            Log In
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
