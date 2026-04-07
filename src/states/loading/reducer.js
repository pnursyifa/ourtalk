import { ActionType } from './action';

function loadingReducer(loading = false, action = {}) {
  switch (action.type) {
  case ActionType.SET_LOADING:
    return action.payload.loading;
  default:
    return loading;
  }
}

export default loadingReducer;