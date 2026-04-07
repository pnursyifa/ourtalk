import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PropTypes from 'prop-types';

function VoteButtons({ upVotesBy, downVotesBy, isUpvoted, isDownvoted, onUpvote, onDownvote }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton onClick={onUpvote} color={isUpvoted ? 'primary' : 'default'}>
        <ThumbUpIcon />
      </IconButton>
      <Typography variant="body2">{upVotesBy.length}</Typography>

      <IconButton onClick={onDownvote} color={isDownvoted ? 'error' : 'default'}>
        <ThumbDownIcon />
      </IconButton>
      <Typography variant="body2">{downVotesBy.length}</Typography>
    </Box>
  );
}

VoteButtons.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  isUpvoted: PropTypes.bool.isRequired,
  isDownvoted: PropTypes.bool.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default VoteButtons;