import api from '../../utils/api';
import { setLoadingActionCreator } from '../loading/action';

const ActionType = {
  SET_THREADS: 'SET_THREADS',
  ADD_THREAD: 'ADD_THREAD',
};

function setThreadsActionCreator(threads) {
  return {
    type: ActionType.SET_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function asyncGetAllThreads() {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator(true));
    try {
      const threads = await api.getAllThreads();
      dispatch(setThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setLoadingActionCreator(false));
    }
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator(true));
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setLoadingActionCreator(false));
    }
  };
}

export {
  ActionType,
  setThreadsActionCreator,
  addThreadActionCreator,
  asyncGetAllThreads,
  asyncCreateThread,
};