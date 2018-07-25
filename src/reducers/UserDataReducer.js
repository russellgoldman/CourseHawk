import {
  LOGIN,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  loggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: action.payload };
    case LOGOUT:
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
};
