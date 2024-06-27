import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import extend-expect untuk asersi yang lebih baik
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('renders LoginForm component correctly', () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(<LoginForm login={() => { }} />);
    expect(getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(getByText(/Login/i)).toBeInTheDocument();
  });

  it('handles form submission correctly', () => {
    const loginMock = jest.fn();
    const { getByLabelText, getByText } = render(<LoginForm login={loginMock} />);
    const emailInput = getByLabelText(/Email Address/i);
    const passwordInput = getByLabelText(/Password/i);
    const submitButton = getByText(/Login/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(loginMock).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
  });
});
