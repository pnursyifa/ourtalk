import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ForumIcon from '@mui/icons-material/Forum';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';

import { setSearchQueryActionCreator } from '../states/filters/action';

function Navigation({ authUser, signOut, onToggleSidebar }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const onAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onSignOut = () => {
    onMenuClose();
    signOut();
  };


  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, pl: '12px !important', pr: '16px !important' }}>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={onToggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}>
            <ForumIcon />
            <Typography variant="h6" fontWeight="bold">OURTALK</Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1, maxWidth: 480 }}>
          <InputBase
            fullWidth
            placeholder="Search threads..."
            onChange={(e) => dispatch(setSearchQueryActionCreator(e.target.value))}
            startAdornment={<SearchIcon sx={{ mr: 1, opacity: 0.7 }} />}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 2,
              px: 2,
              py: 0.5,
              color: 'inherit',
              width: '100%',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onAvatarClick}>
            <Avatar src={authUser.avatar} alt={authUser.name} sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onMenuClose}>
            <MenuItem disabled>{authUser.name}</MenuItem>
            <MenuItem onClick={onSignOut}>Logout</MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Navigation;