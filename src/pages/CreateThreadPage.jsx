import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { asyncCreateThread } from '../states/threads/action';
import CreateThreadInput from '../components/CreateThreadInput';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ title, body, category }) => {
    await dispatch(asyncCreateThread({ title, body, category }));
    navigate('/');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create Thread
      </Typography>
      <CreateThreadInput onSubmit={onSubmit} />
    </Box>
  );
}

export default CreateThreadPage;