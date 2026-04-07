import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PropTypes from 'prop-types';

const navItems = [
  { label: 'Threads', icon: <ForumIcon />, path: '/' },
  { label: 'Create Thread', icon: <AddCircleIcon />, path: '/threads/create' },
  { label: 'Leaderboard', icon: <LeaderboardIcon />, path: '/leaderboard' },
];

function SideBar({ open }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: open ? 220 : 64,
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <List disablePadding>
        {navItems.map(({ label, icon, path }) => (
          <Tooltip key={label} title={!open ? label : ''} placement="right">
            <ListItemButton
              selected={location.pathname === path}
              onClick={() => navigate(path)}
              sx={{ justifyContent: open ? 'flex-start' : 'center', pl: '24px !important', height: 64 }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {icon}
              </ListItemIcon>
              {open && <ListItemText primary={label} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
}

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default SideBar;