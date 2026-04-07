import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateThreadPage from './pages/CreateThreadPage';

import Navigation from './components/Navigation';
import SideBar from './components/SideBar';

import { asyncUnsetAuthUser } from './states/authUser/action';
import { asyncPreloadProcess } from './states/isPreload/action';

function App() {
  const { authUser = null, isPreload = true } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <ForumIcon sx={{ fontSize: 80 }} />
        <Typography variant="h4" fontWeight="bold">
          OURTALK
        </Typography>
        <CircularProgress color="inherit" sx={{ mt: 2 }} />
      </Box>
    );
  }

  if (authUser === null) {
    return (
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    );
  }

  return (
    <div className="app-container">
      <header>
        <Navigation
          authUser={authUser}
          signOut={onSignOut}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
      </header>
      <aside>
        <SideBar open={sidebarOpen} />
      </aside>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/threads/create" element={<CreateThreadPage />} />
          <Route path="/threads/:id" element={<ThreadDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;