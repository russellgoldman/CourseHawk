import { Actions } from 'react-native-router-flux';
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

export const registerFirstNameChange = (firstName) => {
  return {
    type: REGISTER_FIRST_NAME_CHANGE,
    payload: firstName,
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
  };
};

export const registerSpinnerStart = () => {
  return {
    type: REGISTER_SPINNER_START,
    payload: true,
  };
};

// obj = { email: '', password: '', error: '', loading: false }
export const registerSpinnerOK = (obj) => {
  return {
    type: REGISTER_SPINNER_OK,
    payload: obj,
  };
};

// obj = { loading: false, error: 'Authentication Failed.' }
export const registerSpinnerReject = (obj) => {
  return {
    type: REGISTER_SPINNER_REJECT,
    payload: obj,
  };
};

export const loginEmailChange = (email) => {
  return {
    type: LOGIN_EMAIL_CHANGE,
    payload: email,
  };
};

export const loginPasswordChange = (password) => {
  return {
    type: LOGIN_PASSWORD_CHANGE,
    payload: password,
  };
};

export const loginSpinnerStart = () => {
  return {
    type: LOGIN_SPINNER_START,
    payload: true,
  };
};

// obj = { email: '', password: '', error: '', loading: false }
export const loginSpinnerOK = (obj) => {
  return {
    type: LOGIN_SPINNER_OK,
    payload: obj,
  };
};

// obj = { loading: false, error: 'Authentication Failed.' }
export const loginSpinnerReject = (obj) => {
  return {
    type: LOGIN_SPINNER_REJECT,
    payload: obj,
  };
};
