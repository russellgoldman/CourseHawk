import { Actions } from 'react-native-router-flux';
import {
  CHANGE_SEARCH_TEXT,
  CLEAR_SEARCH_TEXT,
} from './types';

export const changeSearchText = (searchText) => {
  return {
    type: CHANGE_SEARCH_TEXT,
    payload: searchText,
  };
};

export const clearSearchText = () => {
  return {
    type: CLEAR_SEARCH_TEXT,
    payload: '',
  };
};
