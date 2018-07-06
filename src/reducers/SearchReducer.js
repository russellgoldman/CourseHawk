import {
  CHANGE_SEARCH_TEXT,
  CLEAR_SEARCH_TEXT,
} from '../actions/types';

const INITIAL_STATE = {
  searchText: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TEXT:
      return { searchText: action.payload };
    case CLEAR_SEARCH_TEXT:
      return { searchText: action.payload };
    default:
      return state;
  }
};
