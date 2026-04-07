import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tabs, Tab, Chip, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { asyncGetAllThreads } from '../states/threads/action';
import { asyncGetAllUsers } from '../states/users/action';
import { setCategoryActionCreator } from '../states/filters/action';

import ThreadCard from '../components/ThreadCard';
import ThreadCardSkeleton from '../components/ThreadCardSkeleton';

function HomePage() {
  const navigate = useNavigate();
  const {
    threads = [],
    users = [],
    filters = {},
    loading = false,
  } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(asyncGetAllThreads());
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const categories = [
    'All',
    ...new Set(threads.map((t) => t.category).filter(Boolean)),
  ];

  const filteredThreads = threadList
    .filter((thread) => {
      const matchSearch = thread.title
        .toLowerCase()
        .includes((filters.searchQuery || '').toLowerCase());
      const matchCategory =
        !filters.category ||
        filters.category === 'All' ||
        thread.category === filters.category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (tab === 0) return new Date(b.createdAt) - new Date(a.createdAt);
      return (b.upVotesBy?.length || 0) - (a.upVotesBy?.length || 0);
    });

  return (
    <Box sx={{ p: 3, position: 'relative', minHeight: '100%' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome to OurTalk
      </Typography>

      <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)} sx={{ mb: 2 }}>
        <Tab label="Latest" />
        <Tab label="Top" />
      </Tabs>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() =>
              dispatch(setCategoryActionCreator(cat === 'All' ? '' : cat))
            }
            color={
              filters.category === cat || (cat === 'All' && !filters.category)
                ? 'primary'
                : 'default'
            }
            variant={
              filters.category === cat || (cat === 'All' && !filters.category)
                ? 'filled'
                : 'outlined'
            }
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {loading
          ? [...Array(5)].map((_, i) => <ThreadCardSkeleton key={i} />)
          : filteredThreads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
      </Box>

      <Fab
        color="inherit"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        onClick={() => navigate('/threads/create')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default HomePage;