import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function LoginForm({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleLogin = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form className="input-login" onSubmit={handleLogin}>
      <label htmlFor="email">
        E-Mail
        <input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email"
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
        />
      </label>
      <button type="submit">
        Login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};
