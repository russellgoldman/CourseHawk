import {
  CHANGE_SEARCH_TEXT,
  CLEAR_SEARCH_TEXT,
  UPDATE_RESULTS,
} from '../actions/types';

const INITIAL_STATE = {
  searchText: '',
  results: [],    // search/filter results
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TEXT:
      return { ...state, searchText: action.payload };
    case CLEAR_SEARCH_TEXT:
      return { ...state, searchText: action.payload };
    case UPDATE_RESULTS:
      return { ...state, results: action.payload };
    default:
      return state;
  }
};
