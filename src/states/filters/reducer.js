import { ActionType } from './action';

const initialState = {
  searchQuery: '',
  category: '',
};

function filtersReducer(filters = initialState, action = {}) {
  switch (action.type) {
  case ActionType.SET_SEARCH_QUERY:
    return { ...filters, searchQuery: action.payload.query };
  case ActionType.SET_CATEGORY:
    return { ...filters, category: action.payload.category };
  default:
    return filters;
  }
}

export default filtersReducer;