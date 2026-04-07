import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
        textAlign: 'center',
        p: 3,
      }}
    >
      <ForumIcon sx={{ fontSize: 80, color: 'primary.main', opacity: 0.5 }} />
      <Typography variant="h3" fontWeight="bold">
        404 | Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        OurTalk can&apos;t seem to find what you&apos;re looking for.
        <br />
        Maybe it&apos;s their talk?
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
        Back to Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;