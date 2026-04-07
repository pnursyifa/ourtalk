import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Avatar, Typography, Divider } from '@mui/material';
import {
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralizeCommentVote,
} from '../states/threadDetail/action';
import VoteButtons from './VoteButtons';
import { postedAt } from '../utils';
import PropTypes from 'prop-types';

function CommentItem({ comment, threadId, authUserId }) {
  const dispatch = useDispatch();
  const { id, content, createdAt, owner, upVotesBy, downVotesBy } = comment;

  const isUpvoted = upVotesBy.includes(authUserId);
  const isDownvoted = downVotesBy.includes(authUserId);

  const onUpvote = () => {
    if (isUpvoted) {
      dispatch(asyncNeutralizeCommentVote(threadId, id));
    } else {
      dispatch(asyncUpvoteComment(threadId, id));
    }
  };

  const onDownvote = () => {
    if (isDownvoted) {
      dispatch(asyncNeutralizeCommentVote(threadId, id));
    } else {
      dispatch(asyncDownvoteComment(threadId, id));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Avatar src={owner?.avatar} alt={owner?.name} sx={{ width: 28, height: 28 }} />
        <Typography variant="body2" fontWeight="bold">{owner?.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
          {postedAt(createdAt)}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={{ __html: content }}
        sx={{ mb: 1 }}
      />
      <VoteButtons
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        isUpvoted={isUpvoted}
        isDownvoted={isDownvoted}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
      />
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  threadId: PropTypes.string.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default CommentItem;