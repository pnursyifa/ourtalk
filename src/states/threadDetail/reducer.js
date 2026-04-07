import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.SET_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.UPVOTE_THREAD:
    return {
      ...threadDetail,
      upVotesBy: [...threadDetail.upVotesBy, action.payload.vote.userId],
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.vote.userId),
    };
  case ActionType.DOWNVOTE_THREAD:
    return {
      ...threadDetail,
      downVotesBy: [...threadDetail.downVotesBy, action.payload.vote.userId],
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.vote.userId),
    };
  case ActionType.NEUTRALIZE_THREAD_VOTE:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.vote.userId),
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.vote.userId),
    };
  case ActionType.UPVOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return comment;
        return {
          ...comment,
          upVotesBy: [...comment.upVotesBy, action.payload.vote.userId],
          downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.vote.userId),
        };
      }),
    };
  case ActionType.DOWNVOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return comment;
        return {
          ...comment,
          downVotesBy: [...comment.downVotesBy, action.payload.vote.userId],
          upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.vote.userId),
        };
      }),
    };
  case ActionType.NEUTRALIZE_COMMENT_VOTE:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return comment;
        return {
          ...comment,
          upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.vote.userId),
          downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.vote.userId),
        };
      }),
    };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;