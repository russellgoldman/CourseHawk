import { Actions } from 'react-native-router-flux';
import {
  SELECT_DEPARTMENT,
  SPINNER_VISIBLE
} from './types';

export const selectDepartment = (department) => {
  return {
    type: SELECT_DEPARTMENT,
    payload: department,
  };
};

export const spinnerVisible = (visibility) => {
  return {
    type: SPINNER_VISIBLE,
    payload: visibility,
  };
};
