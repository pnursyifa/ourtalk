import React from 'react';
import { TextField, Button } from '@mui/material';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmit = () => {
    register({ name, email, password });
  };

  return (
    <form className="register-input">
      <TextField
        required
        id="register-name"
        label="Name"
        type="text"
        value={name}
        onChange={onNameChange}
        fullWidth
      />
      <TextField
        required
        id="register-email"
        label="Email"
        type="email"
        value={email}
        onChange={onEmailChange}
        fullWidth
      />
      <TextField
        required
        id="register-password"
        label="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        fullWidth
      />
      <Button variant="contained" onClick={onSubmit} fullWidth>
        Register
      </Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;