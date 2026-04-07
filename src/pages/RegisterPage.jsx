import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ForumIcon from '@mui/icons-material/Forum';

import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <ForumIcon sx={{ fontSize: 160 }} />
        <h1>OURTALK</h1>
      </header>
      <article className="register-page__main">
        <h2>
          Join us!
          <br />
          This is
          {' '}
          <strong>OurTalk</strong>
          {' '}
          <ForumIcon sx={{ fontSize: 32 }} />
        </h2>

        <RegisterInput register={onRegister} />
        <p>
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;