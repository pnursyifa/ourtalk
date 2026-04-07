import React from 'react';
import { TextField, Button } from '@mui/material';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmit = () => {
    login({ email, password });
  };

  return (
    <form className="login-input">
      <TextField
        required
        id="login-email"
        label="Email"
        type="email"
        value={email}
        onChange={onEmailChange}
        fullWidth
      />
      <TextField
        required
        id="login-password"
        label="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        fullWidth
      />
      <Button variant="contained" onClick={onSubmit} fullWidth>
        Login
      </Button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;