/**
 * test scenario for threadsReducer
 *
 *  - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by SET_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

const fakeThreads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T08:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeNewThread = {
  id: 'thread-3',
  title: 'Thread Ketiga',
  body: 'Ini adalah thread ketiga',
  category: 'General',
  createdAt: '2021-06-21T09:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = fakeThreads;
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by SET_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'SET_THREADS',
      payload: { threads: fakeThreads },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(fakeThreads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    const initialState = fakeThreads;
    const action = {
      type: 'ADD_THREAD',
      payload: { thread: fakeNewThread },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
    expect(nextState).toHaveLength(3);
  });
});