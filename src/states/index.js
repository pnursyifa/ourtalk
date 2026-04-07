import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import usersReducer from './users/reducer';
import leaderboardReducer from './leaderboard/reducer';
import isPreloadReducer from './isPreload/reducer';
import filtersReducer from './filters/reducer';
import loadingReducer from './loading/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
    leaderboard: leaderboardReducer,
    isPreload: isPreloadReducer,
    filters: filtersReducer,
    loading: loadingReducer,
  },
});

export default store;