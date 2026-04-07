import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip, Avatar, Divider } from '@mui/material';
import {
  asyncGetThreadDetail,
  clearThreadDetailActionCreator,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralizeThreadVote,
  asyncCreateComment,
} from '../states/threadDetail/action';
import { postedAt } from '../utils';
import VoteButtons from '../components/VoteButtons';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';
import ThreadDetailSkeleton from '../components/ThreadDetailSkeleton';

function ThreadDetailPage() {
  const { id } = useParams();
  const { threadDetail, authUser, loading = false } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetThreadDetail(id));
    return () => dispatch(clearThreadDetailActionCreator());
  }, [dispatch, id]);

  if (loading) return <ThreadDetailSkeleton />;
  if (!threadDetail) return null;

  const { title, body, category, createdAt, owner, upVotesBy, downVotesBy, comments } = threadDetail;

  const isUpvoted = upVotesBy.includes(authUser.id);
  const isDownvoted = downVotesBy.includes(authUser.id);

  const onUpvote = () => {
    if (isUpvoted) {
      dispatch(asyncNeutralizeThreadVote(id));
    } else {
      dispatch(asyncUpvoteThread(id));
    }
  };

  const onDownvote = () => {
    if (isDownvoted) {
      dispatch(asyncNeutralizeThreadVote(id));
    } else {
      dispatch(asyncDownvoteThread(id));
    }
  };

  const onComment = (content) => {
    dispatch(asyncCreateComment(id, { content }));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      {category && <Chip label={category} size="small" variant="outlined" sx={{ mb: 2 }} />}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Avatar src={owner?.avatar} alt={owner?.name} sx={{ width: 32, height: 32 }} />
        <Typography variant="body2" color="text.secondary">
          {owner?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          · {postedAt(createdAt)}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{ mb: 3 }}
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <VoteButtons
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        isUpvoted={isUpvoted}
        isDownvoted={isDownvoted}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
      />
      <Divider sx={{ my: 3 }} />
      <CommentInput onSubmit={onComment} />
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Comments ({comments.length})
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            threadId={id}
            authUserId={authUser.id}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ThreadDetailPage;