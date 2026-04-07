import api from '../../utils/api';
import { setLoadingActionCreator } from '../loading/action';

const ActionType = {
  SET_LEADERBOARD: 'SET_LEADERBOARD',
};

function setLeaderboardActionCreator(leaderboard) {
  return { type: ActionType.SET_LEADERBOARD, payload: { leaderboard } };
}

function asyncGetLeaderboard() {
  return async (dispatch) => {
    dispatch(setLoadingActionCreator(true));
    try {
      const leaderboard = await api.getLeaderboards();
      dispatch(setLeaderboardActionCreator(leaderboard));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(setLoadingActionCreator(false));
    }
  };
}

export {
  ActionType,
  setLeaderboardActionCreator,
  asyncGetLeaderboard,
};