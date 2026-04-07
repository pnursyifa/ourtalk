import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';

import ForumIcon from '@mui/icons-material/Forum';

import LoginInput from '../components/LoginInput';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <ForumIcon sx={{ fontSize: 160 }} />
        <h1>OURTALK</h1>
      </header>
      <article className="login-page__main">
        <h2>
          Speak up!
          <br />
          This is
          {' '}
          <strong>OurTalk</strong>
          {' '}
          <ForumIcon sx={{ fontSize: 32 }}/>
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;