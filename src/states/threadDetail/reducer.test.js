/**
* test scenario for threadDetailReducer
*
*  - threadDetailReducer function
*  - should return the initial state when given by unknown action
*  - should return the threadDetail when given by SET_THREAD_DETAIL action
*  - should return null when given by CLEAR_THREAD_DETAIL action
*  - should return the threadDetail with the new comment when given by ADD_COMMENT action
*  - should return the threadDetail with the thread upvote by user id when given by UPVOTE_THREAD action
*  - should return the threadDetail with the thread downvote by user id when given by DOWNVOTE_THREAD action
*  - should return the threadDetail without any thread vote by user id when given by NEUTRALIZE_THREAD_VOTE action
*  - should return the threadDetail with the comment id upvote by user id when given by UPVOTE_COMMENT action
*  - should return the threadDetail with the comment id downvote by user id when given by DOWNVOTE_COMMENT action
*  - should return the threadDetail without any comment id vote by user id when given by NEUTRALIZE_COMMENT_VOTE action
*
*/

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg'
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg'
      },
      upVotesBy: [],
      downVotesBy: []
    }
  ]
};

describe('threadDetailReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = fakeThreadDetail;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threadDetail when given by SET_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'SET_THREAD_DETAIL',
      payload: {
        threadDetail: fakeThreadDetail
      }
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    const initialState = fakeThreadDetail;
    const action = {
      type: 'CLEAR_THREAD_DETAIL',
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(null);
  });

  it('should return the threadDetail with the new comment when given by ADD_COMMENT action', () => {
    const initialState = fakeThreadDetail;
    const newComment = {
      id: 'comment-2',
      content: 'Comment 2',
      createdAt: '2021-06-21T08:00:00.000Z',
      owner: {
        id: 'users-2',
        name: 'Not John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'ADD_COMMENT',
      payload: { comment: newComment },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0]).toEqual(newComment);
    expect(nextState.comments).toHaveLength(2);
  });

  it('should return the threadDetail with the thread upvote by user id when given by UPVOTE_THREAD action', () => {
    const initialState = fakeThreadDetail;
    const action = {
      type: 'UPVOTE_THREAD',
      payload: { vote: { userId: 'users-1' } },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).toContain('users-1');
    expect(nextState.downVotesBy).not.toContain('users-1');
  });

  it('should return the threadDetail with the thread downvote by user id when given by DOWNVOTE_THREAD action', () => {
    const initialState = fakeThreadDetail;
    const action = {
      type: 'DOWNVOTE_THREAD',
      payload: { vote: { userId: 'users-1' } },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.downVotesBy).toContain('users-1');
    expect(nextState.upVotesBy).not.toContain('users-1');
  });

  it('should return the threadDetail without any thread vote by user id when given by NEUTRALIZE_THREAD_VOTE action', () => {
    const initialState = {
      ...fakeThreadDetail,
      upVotesBy: ['users-1'],
      downVotesBy: ['users-2'],
    };
    const action = {
      type: 'NEUTRALIZE_THREAD_VOTE',
      payload: { vote: { userId: 'users-1' } },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).not.toContain('users-1');
    expect(nextState.downVotesBy).not.toContain('users-1');

    const action2 = {
      type: 'NEUTRALIZE_THREAD_VOTE',
      payload: { vote: { userId: 'users-2' } },
    };

    const nextState2 = threadDetailReducer(nextState, action2);

    expect(nextState2.upVotesBy).not.toContain('users-2');
    expect(nextState2.downVotesBy).not.toContain('users-2');
  });

  it('should return the threadDetail with the comment id upvote by user id when given by UPVOTE_COMMENT action', () => {
    const initialState = fakeThreadDetail;
    const action = {
      type: 'UPVOTE_COMMENT',
      payload: { commentId: 'comment-1', vote: { userId: 'users-1' } },
    };

    const nextState = threadDetailReducer(initialState, action);
    const updatedComment = nextState.comments.find((c) => c.id === 'comment-1');

    expect(updatedComment.upVotesBy).toContain('users-1');
    expect(updatedComment.downVotesBy).not.toContain('users-1');
  });

  it('should return the threadDetail with the comment id downvote by user id when given by DOWNVOTE_COMMENT action', () => {
    const initialState = fakeThreadDetail;
    const action = {
      type: 'DOWNVOTE_COMMENT',
      payload: { commentId: 'comment-1', vote: { userId: 'users-1' } },
    };

    const nextState = threadDetailReducer(initialState, action);
    const updatedComment = nextState.comments.find((c) => c.id === 'comment-1');

    expect(updatedComment.downVotesBy).toContain('users-1');
    expect(updatedComment.upVotesBy).not.toContain('users-1');
  });

  it('should return the threadDetail without any comment id vote by user id when given by NEUTRALIZE_COMMENT_VOTE action', () => {
    const initialState = {
      ...fakeThreadDetail,
      comments: [
        {
          ...fakeThreadDetail.comments[0],
          upVotesBy: ['users-1'],
          downVotesBy: ['users-2'],
        },
      ],
    };
    const action = {
      type: 'NEUTRALIZE_COMMENT_VOTE',
      payload: { commentId: 'comment-1', vote: { userId: 'users-1' } },
    };

    const nextState = threadDetailReducer(initialState, action);
    const updatedComment = nextState.comments.find((c) => c.id === 'comment-1');

    expect(updatedComment.upVotesBy).not.toContain('users-1');
    expect(updatedComment.downVotesBy).not.toContain('users-1');

    const action2 = {
      type: 'NEUTRALIZE_COMMENT_VOTE',
      payload: { commentId: 'comment-1', vote: { userId: 'users-2' } },
    };

    const nextState2 = threadDetailReducer(nextState, action2);
    const updatedComment2 = nextState2.comments.find((c) => c.id === 'comment-1');

    expect(updatedComment2.upVotesBy).not.toContain('users-2');
    expect(updatedComment2.downVotesBy).not.toContain('users-2');
  });
});