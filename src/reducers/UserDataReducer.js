import {
  LOGIN,
  LOGOUT,
  REGISTER_FIRST_NAME_CHANGE,
  REGISTER_EMAIL_CHANGE,
  REGISTER_PASSWORD_CHANGE,
  REGISTER_SPINNER_START,
  REGISTER_SPINNER_OK,
  REGISTER_SPINNER_REJECT,
  LOGIN_EMAIL_CHANGE,
  LOGIN_PASSWORD_CHANGE,
  LOGIN_SPINNER_START,
  LOGIN_SPINNER_OK,
  LOGIN_SPINNER_REJECT,
} from '../actions/types';

const INITIAL_STATE = {
  // global
  globalUserId: '',
  globalLoggedIn: false,
  // register
  registerFirstName: '',
  registerEmail: '',
  registerPassword: '',
  registerError: '',
  registerLoading: false,
  // login
  loginEmail: '',
  loginPassword: '',
  loginError: '',
  loginLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: action.payload };
    case LOGOUT:
      return { ...state, loggedIn: action.payload };
    case REGISTER_FIRST_NAME_CHANGE:
      return { ...state, registerFirstName: action.payload };
    case REGISTER_EMAIL_CHANGE:
      return { ...state, registerEmail: action.payload };
    case REGISTER_PASSWORD_CHANGE:
      return { ...state, registerPassword: action.payload };
    case REGISTER_SPINNER_START:
      return { ...state, registerLoading: action.payload };
    case REGISTER_SPINNER_OK:
      var { firstName, email, password, error, loading } = action.payload;
      return {
        ...state,
        registerFirstName: firstName,
        registerEmail: email,
        registerPassword: password,
        registerError: error,
        registerLoading: loading,
      };
    case REGISTER_SPINNER_REJECT:
      var { error, loading } = action.payload;
      return {
        ...state,
        registerError: error,
        registerLoading: loading,
      };
    case LOGIN_EMAIL_CHANGE:
      return { ...state, loginEmail: action.payload };
    case LOGIN_PASSWORD_CHANGE:
      return { ...state, loginPassword: action.payload };
    case LOGIN_SPINNER_START:
      return { ...state, loginLoading: action.payload };
    case LOGIN_SPINNER_OK:
      var { email, password, error, loading } = action.payload;
      return {
        ...state,
        loginEmail: email,
        loginPassword: password,
        loginError: error,
        loginLoading: loading,
      };
    case LOGIN_SPINNER_REJECT:
      var { error, loading } = action.payload;
      return {
        ...state,
        loginError: error,
        loginLoading: loading,
      };
    default:
      return state;
  }
};
