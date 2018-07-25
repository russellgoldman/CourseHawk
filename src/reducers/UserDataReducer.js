import {
  LOGIN,
  LOGOUT,
  REGISTER_EMAIL_CHANGE,
  REGISTER_PASSWORD_CHANGE,
  REGISTER_SPINNER_START,
  REGISTER_SPINNER_OK,
  REGISTER_SPINNER_REJECT,
} from '../actions/types';

const INITIAL_STATE = {
  // global
  globalLoggedIn: false,
  // login
  loginEmail: '',
  loginPassword: '',
  loginError: '',
  loginLoading: false,
  // register
  registerEmail: '',
  registerPassword: '',
  registerError: '',
  registerLoading: false,
  // registerCode
  registerCodeToken: '',
  registerCodeError: '',
  registerCodeLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: action.payload };
    case LOGOUT:
      return { ...state, loggedIn: action.payload };
    case REGISTER_EMAIL_CHANGE:
      return { ...state, registerEmail: action.payload };
    case REGISTER_PASSWORD_CHANGE:
      return { ...state, registerPassword: action.payload };
    case REGISTER_SPINNER_START:
      return { ...state, registerLoading: action.payload };
    case REGISTER_SPINNER_OK:
      var { email, password, error, loading } = action.payload;
      return {
        ...state,
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
    default:
      return state;
  }
};
