import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/actions';
import { Box, Heading, Link as ChakraLink, Text, VStack } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

export default function ChakraLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async ({ email, password }) => {
    try {
      await dispatch(asyncSetAuthUser({ email, password }));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box className="chakra-form-page" p="4" bg="gray.100" minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <VStack spacing="6" w="full" maxW="400px">
        <Heading as="h2" size="lg" textAlign="center">User Login</Heading>
        <Box w="full" bg="white" boxShadow="md" rounded="md" p="6">
          <LoginForm login={onLogin} />
        </Box>
        <Text textAlign="center">
          Don't have an account?{' '}
          <ChakraLink as={Link} to="/register" textDecoration="underline" color="blue">
            Sign up here
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
}
