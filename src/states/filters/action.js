const ActionType = {
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_CATEGORY: 'SET_CATEGORY',
};

function setSearchQueryActionCreator(query) {
  return {
    type: ActionType.SET_SEARCH_QUERY,
    payload: { query },
  };
}

function setCategoryActionCreator(category) {
  return {
    type: ActionType.SET_CATEGORY,
    payload: { category },
  };
}

export {
  ActionType,
  setSearchQueryActionCreator,
  setCategoryActionCreator,
};