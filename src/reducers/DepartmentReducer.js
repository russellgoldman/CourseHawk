import {
  SELECT_DEPARTMENT,
  SPINNER_VISIBLE,
} from '../actions/types';

const INITIAL_STATE = {
  selectedDepartment: '',   // none selected if ''
  visible: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_DEPARTMENT:
      // unclicking the department
      if (state.selectedDepartment === action.payload) {
        return { selectedDepartment: '' };
      }
      return { selectedDepartment: action.payload };
    case SPINNER_VISIBLE:
      return { visible: !action.payload };
    default:
      return state;
  }
};
