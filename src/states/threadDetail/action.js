import api from '../../utils/api';
import { setLoadingActionCreator } from '../loading/action';

const ActionType = {
  SET_THREAD_DETAIL: 'SET_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALIZE_THREAD_VOTE: 'NEUTRALIZE_THREAD_VOTE',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
  NEUTRALIZE_COMMENT_VOTE: 'NEUTRALIZE_COMMENT_VOTE',
};

function setThreadDetailActionCreator(threadDetail) {
  return { type: ActionType.SET_THREAD_DETAIL, payload: { threadDetail } };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function addCommentActionCreator(comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
}

function upvoteThreadActionCreator(vote) {
  return { type: ActionType.UPVOTE_THREAD, payload: { vote } };
}

function downvoteThreadActionCreator(vote) {
  return { type: ActionType.DOWNVOTE_THREAD, payload: { vote } };
}

function neutralizeThreadVoteActionCreator(vote) {
  return { type: ActionType.NEUTRALIZE_THREAD_VOTE, payload: { vote } };
}

function upvoteCommentActionCreator(commentId, vote) {
  return { type: ActionType.UPVOTE_COMMENT, payload: { commentId, vote } };
}

function downvoteCommentActionCreator(commentId, vote) {
  return { type: ActionType.DOWNVOTE_COMMENT, payload: { commentId, vote } };
}

function neutralizeCommentVoteActionCreator(commentId, vote) {
  return { type: ActionType.NEUTRALIZE_COMMENT_VOTE, payload: { commentId, vote } };
}

function asyncGetThreadDetail(id) {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator(true));
    try {
      const threadDetail = await api.getThreadDetail(id);
      dispatch(setThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setLoadingActionCreator(false));
    }
  };
}

function asyncCreateComment(threadId, { content }) {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator(true));
    try {
      const comment = await api.createComment(threadId, { content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setLoadingActionCreator(false));
    }
  };
}

function asyncUpvoteThread(id) {
  return async (dispatch) => {
    try {
      const vote = await api.upvoteThread(id);
      dispatch(upvoteThreadActionCreator(vote));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownvoteThread(id) {
  return async (dispatch) => {
    try {
      const vote = await api.downvoteThread(id);
      dispatch(downvoteThreadActionCreator(vote));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralizeThreadVote(id) {
  return async (dispatch) => {
    try {
      const vote = await api.neutralizeThreadVote(id);
      dispatch(neutralizeThreadVoteActionCreator(vote));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpvoteComment(threadId, commentId) {
  return async (dispatch) => {
    try {
      const vote = await api.upvoteComment(threadId, commentId);
      dispatch(upvoteCommentActionCreator(commentId, vote));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownvoteComment(threadId, commentId) {
  return async (dispatch) => {
    try {
      const vote = await api.downvoteComment(threadId, commentId);
      dispatch(downvoteCommentActionCreator(commentId, vote));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralizeCommentVote(threadId, commentId) {
  return async (dispatch) => {
    try {
      const vote = await api.neutralizeCommentVote(threadId, commentId);
      dispatch(neutralizeCommentVoteActionCreator(commentId, vote));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  setThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  upvoteThreadActionCreator,
  downvoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
  upvoteCommentActionCreator,
  downvoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
  asyncGetThreadDetail,
  asyncCreateComment,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralizeThreadVote,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralizeCommentVote,
};