/**
 * test scenario
 *
 * - asyncGetAllThreads thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncCreateThread thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import api from '../../utils/api';
import {
  asyncGetAllThreads,
  asyncCreateThread,
  setThreadsActionCreator,
  addThreadActionCreator,
} from './action';
import { setLoadingActionCreator } from '../loading/action';

const fakeThreadsResponse = [
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
];

const fakeNewThreadResponse = {
  id: 'thread-2',
  title: 'Thread Kedua',
  body: 'Ini adalah thread kedua',
  category: 'General',
  createdAt: '2021-06-21T08:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncGetAllThreads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    const dispatch = vi.fn();

    // action
    await asyncGetAllThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setLoadingActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(setThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(setLoadingActionCreator(false));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncGetAllThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setLoadingActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(setLoadingActionCreator(false));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncCreateThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeNewThreadResponse);
    const dispatch = vi.fn();

    // action
    await asyncCreateThread({
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'General',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setLoadingActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeNewThreadResponse));
    expect(dispatch).toHaveBeenCalledWith(setLoadingActionCreator(false));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncCreateThread({
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'General',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setLoadingActionCreator(true));
    expect(dispatch).toHaveBeenCalledWith(setLoadingActionCreator(false));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});