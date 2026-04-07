import api from '../../utils/api';
import { setLoadingActionCreator } from '../loading/action';

const ActionType = {
  SET_USERS: 'SET_USERS',
};

function setUsersActionCreator(users) {
  return { type: ActionType.SET_USERS, payload: { users } };
}

function asyncGetAllUsers() {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator(true));
    try {
      const users = await api.getAllUsers();
      dispatch(setUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setLoadingActionCreator(false));
    }
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator(true));
    try {
      await api.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setLoadingActionCreator(false));
    }
  };
}

export {
  ActionType,
  setUsersActionCreator,
  asyncGetAllUsers,
  asyncRegisterUser,
};