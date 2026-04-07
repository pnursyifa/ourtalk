const ActionType = {
  SET_LOADING: 'SET_LOADING',
};

function setLoadingActionCreator(loading) {
  return {
    type: ActionType.SET_LOADING,
    payload: { loading },
  };
}

export {
  ActionType,
  setLoadingActionCreator,
};