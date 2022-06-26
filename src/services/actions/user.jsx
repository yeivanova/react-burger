export const GET_USER_REQUEST = "USER/GET_REQUEST";
export const GET_USER_SUCCESS = "USER/GET_SUCCESS";
export const GET_USER_FAILED = "USER/GET_FAILED";

export const UPDATE_USER_REQUEST = "USER/UPDATE_REQUEST";
export const UPDATE_USER_SUCCESS = "USER/UPDATE_SUCCESS";
export const UPDATE_USER_FAILED = "USER/UPDATE_FAILED";

export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const UNAUTHENTICATE_USER = "UNAUTHENTICATE_USER";

export const GET_TOKEN_REQUEST = "TOKEN/GET_REQUEST";
export const GET_TOKEN_SUCCESS = "TOKEN/GET_SUCCESS";
export const GET_TOKEN_FAILED = "TOKEN/GET_FAILED";

export const GET_LOGIN_REQUEST = "LOGIN/GET_REQUEST";
export const GET_LOGIN_SUCCESS = "LOGIN/GET_SUCCESS";
export const GET_LOGIN_FAILED = "LOGIN/GET_FAILED";

export const GET_LOGOUT_REQUEST = "LOGOUT/GET_REQUEST";
export const GET_LOGOUT_SUCCESS = "LOGOUT/GET_SUCCESS";
export const GET_LOGOUT_FAILED = "LOGOUT/GET_FAILED";

export const GET_REGISTRATION_REQUEST = "REGISTRATION/GET_REQUEST";
export const GET_REGISTRATION_SUCCESS = "REGISTRATION/GET_SUCCESS";
export const GET_REGISTRATION_FAILED = "REGISTRATION/GET_FAILED";

export const GET_FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD/GET_REQUEST";
export const GET_FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD/GET_SUCCESS";
export const GET_FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD/GET_FAILED";
export const IS_PASSWORD_REQUESTED = "IS_PASSWORD_REQUESTED";

export const GET_RESET_PASSWORD_REQUEST = "RESET_PASSWORD/GET_REQUEST";
export const GET_RESET_PASSWORD_SUCCESS = "RESET_PASSWORD/GET_SUCCESS";
export const GET_RESET_PASSWORD_FAILED = "RESET_PASSWORD/GET_FAILED";
export const IS_PASSWORD_RESETED = "IS_PASSWORD_RESETED";

export function getUserRequest() {
  return {
    type: GET_USER_REQUEST,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user: user,
  };
}

export function getUserFailed() {
  return {
    type: GET_USER_FAILED,
  };
}

export function updateUserRequest() {
  return {
    type: UPDATE_USER_REQUEST,
  };
}

export function updateUserSuccess(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    user: user,
  };
}

export function updateUserFailed() {
  return {
    type: UPDATE_USER_FAILED,
  };
}

export function clearUserData() {
  return {
    type: CLEAR_USER_DATA,
  };
}

export function autheticateUser() {
  return {
    type: AUTHENTICATE_USER,
  };
}

export function unautheticateUser() {
  return {
    type: UNAUTHENTICATE_USER,
  };
}

export function getLoginRequest() {
  return {
    type: GET_LOGIN_REQUEST,
  };
}

export function getLoginSuccess(user) {
  return {
    type: GET_LOGIN_SUCCESS,
    user: user,
  };
}

export function getLoginFailed() {
  return {
    type: GET_LOGIN_FAILED,
  };
}

export function getLogoutRequest() {
  return {
    type: GET_LOGOUT_REQUEST,
  };
}

export function getLogoutSuccess() {
  return {
    type: GET_LOGOUT_SUCCESS,
  };
}

export function getLogoutFailed() {
  return {
    type: GET_LOGOUT_FAILED,
  };
}

export function getRegistrationRequest() {
  return {
    type: GET_REGISTRATION_REQUEST,
  };
}

export function getRegistrationSuccess(user) {
  return {
    type: GET_REGISTRATION_SUCCESS,
    user: user,
  };
}

export function getRegistrationFailed() {
  return {
    type: GET_REGISTRATION_FAILED,
  };
}

export function getForgotPasswordRequest() {
  return {
    type: GET_FORGOT_PASSWORD_REQUEST,
  };
}

export function getForgotPasswordSuccess() {
  return {
    type: GET_FORGOT_PASSWORD_SUCCESS,
  };
}

export function getForgotPasswordFailed() {
  return {
    type: GET_FORGOT_PASSWORD_SUCCESS,
  };
}

export function isPasswordRequested() {
  return {
    type: IS_PASSWORD_REQUESTED,
  };
}

export function getResetPasswordRequest() {
  return {
    type: GET_RESET_PASSWORD_REQUEST,
  };
}

export function getResetPasswordSuccess(user) {
  return {
    type: GET_RESET_PASSWORD_SUCCESS,
    user: user,
  };
}

export function getResetPasswordFailed() {
  return {
    type: GET_RESET_PASSWORD_FAILED,
  };
}

export function isPasswordReseted() {
  return {
    type: IS_PASSWORD_RESETED,
  };
}
