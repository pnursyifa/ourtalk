import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Typography,
  Chip,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';

function ThreadCard({ thread }) {
  const navigate = useNavigate();
  const { id, title, body, category, createdAt, upVotesBy, totalComments, user } = thread;

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardActionArea onClick={() => navigate(`/threads/${id}`)}>
        <CardContent>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Avatar src={user?.avatar} alt={user?.name} sx={{ width: 28, height: 28 }} />
            <Typography variant="body2" color="text.secondary">
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              {postedAt(createdAt)}
            </Typography>
          </Box>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
            dangerouslySetInnerHTML={{ __html: body }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {category && (
              <Chip label={category} size="small" variant="outlined" />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
              <ThumbUpIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {upVotesBy?.length || 0}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CommentIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {totalComments || 0}
              </Typography>
            </Box>
          </Box>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ThreadCard.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    totalComments: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

export default ThreadCard;