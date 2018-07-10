import { Actions } from 'react-native-router-flux';
import {
  CHANGE_SEARCH_TEXT,
  CLEAR_SEARCH_TEXT,
  UPDATE_RESULTS,
} from './types';

export const changeSearchText = (searchText) => {
  return {
    type: CHANGE_SEARCH_TEXT,
    payload: searchText.toUpperCase(),
  };
};

export const clearSearchText = () => {
  return {
    type: CLEAR_SEARCH_TEXT,
    payload: '',
  };
};

// applies to search and filters
export const updateResults = (results) => {
  return {
    type: UPDATE_RESULTS,
    payload: results,
  };
};
