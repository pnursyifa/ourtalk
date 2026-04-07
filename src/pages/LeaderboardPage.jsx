import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Skeleton,
} from '@mui/material';
import { asyncGetLeaderboard } from '../states/leaderboard/action';

function LeaderboardPage() {
  const { leaderboard = [], loading = false } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Leaderboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Top contributors in OurTalk
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {loading
          ? [...Array(5)].map((_, i) => (
            <Paper
              key={i}
              variant="outlined"
              sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 3 }}
            >
              <Skeleton variant="text" width={32} height={32} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" width="50%" sx={{ flex: 1 }} />
              <Skeleton variant="text" width={40} />
            </Paper>
          ))
          : leaderboard.map((item, index) => (
            <Paper
              key={item.user.id}
              variant="outlined"
              sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 3 }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ width: 32, textAlign: 'center' }}>
                {index + 1}
              </Typography>
              <Avatar src={item.user.avatar} alt={item.user.name} />
              <Typography variant="body1" fontWeight="medium" sx={{ flex: 1 }}>
                {item.user.name}
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="primary">
                {item.score}
              </Typography>
            </Paper>
          ))}
      </Box>
    </Box>
  );
}

export default LeaderboardPage;