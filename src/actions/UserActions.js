import { Actions } from 'react-native-router-flux';
import {
  LOGIN,
  LOGOUT,
  REGISTER_EMAIL_CHANGE,
  REGISTER_PASSWORD_CHANGE,
  REGISTER_SPINNER_START,
  REGISTER_SPINNER_OK,
  REGISTER_SPINNER_REJECT,
} from './types';

export const login = () => {
  return {
    type: LOGIN,
    payload: true,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: false,
  };
};

export const registerEmailChange = (email) => {
  return {
    type: REGISTER_EMAIL_CHANGE,
    payload: email,
  };
};

export const registerPasswordChange = (password) => {
  return {
    type: REGISTER_PASSWORD_CHANGE,
    payload: password,
  }
};

export const registerSpinnerStart = () => {
  return {
    type: REGISTER_SPINNER_START,
    payload: true,
  }
}

// obj = { email: '', password: '', error: '', loading: false }
export const registerSpinnerOK = (obj) => {
  return {
    type: REGISTER_SPINNER_OK,
    payload: obj,
  }
};

// obj = { loading: false, error: 'Authentication Failed.' }
export const registerSpinnerReject = (obj) => {
  return {
    type: REGISTER_SPINNER_REJECT,
    payload: obj,
  }
};
