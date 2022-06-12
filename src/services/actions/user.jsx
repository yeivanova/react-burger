import {
  checkResponse,
  setCookie,
  getCookie,
  deleteCookie,
} from "../../utils/utils";
import { baseUrl } from "../../utils/api";

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

const COOKIE_EXPIRES = 1200; //20 minutes

const apiUrls = {
  token: `${baseUrl}/auth/token`,
  login: `${baseUrl}/auth/login`,
  logout: `${baseUrl}/auth/logout`,
  register: `${baseUrl}/auth/register`,
  forgotPassword: `${baseUrl}/password-reset`,
  resetPassword: `${baseUrl}/password-reset/reset`,
  userData: `${baseUrl}/auth/user`,
};

function getUserRequest() {
  return {
    type: GET_USER_REQUEST,
  };
}

function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user: user,
  };
}

function getUserFailed() {
  return {
    type: GET_USER_FAILED,
  };
}

function updateUserRequest() {
  return {
    type: UPDATE_USER_REQUEST,
  };
}

function updateUserSuccess(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    user: user,
  };
}

function updateUserFailed() {
  return {
    type: UPDATE_USER_FAILED,
  };
}

function clearUserData() {
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

function getLoginRequest() {
  return {
    type: GET_LOGIN_REQUEST,
  };
}

function getLoginSuccess(user) {
  return {
    type: GET_LOGIN_SUCCESS,
    user: user,
  };
}

function getLoginFailed() {
  return {
    type: GET_LOGIN_FAILED,
  };
}

function getLogoutRequest() {
  return {
    type: GET_LOGOUT_REQUEST,
  };
}

function getLogoutSuccess() {
  return {
    type: GET_LOGOUT_SUCCESS,
  };
}

function getLogoutFailed() {
  return {
    type: GET_LOGOUT_FAILED,
  };
}

function getRegistrationRequest() {
  return {
    type: GET_REGISTRATION_REQUEST,
  };
}

function getRegistrationSuccess(user) {
  return {
    type: GET_REGISTRATION_SUCCESS,
    user: user,
  };
}

function getRegistrationFailed() {
  return {
    type: GET_REGISTRATION_FAILED,
  };
}

function getForgotPasswordRequest() {
  return {
    type: GET_FORGOT_PASSWORD_REQUEST,
  };
}

function getForgotPasswordSuccess() {
  return {
    type: GET_FORGOT_PASSWORD_SUCCESS,
  };
}

function getForgotPasswordFailed() {
  return {
    type: GET_FORGOT_PASSWORD_SUCCESS,
  };
}

function isPasswordRequested() {
  return {
    type: IS_PASSWORD_REQUESTED,
  };
}

function getResetPasswordRequest() {
  return {
    type: GET_RESET_PASSWORD_REQUEST,
  };
}

function getResetPasswordSuccess(user) {
  return {
    type: GET_RESET_PASSWORD_SUCCESS,
    user: user,
  };
}

function getResetPasswordFailed() {
  return {
    type: GET_RESET_PASSWORD_FAILED,
  };
}

function isPasswordReseted() {
  return {
    type: IS_PASSWORD_RESETED,
  };
}

export function tokenRequest() {
  const refreshToken = getCookie("refreshToken");
  if (typeof refreshToken === "undefined") return false;
  return fetch(apiUrls.token, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: refreshToken,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      setCookie("accessToken", res.accessToken.split("Bearer ")[1], {
        expires: COOKIE_EXPIRES,
      });
      setCookie("refreshToken", res.refreshToken);
    });
}

export function loginRequest(form) {
  return function (dispatch) {
    dispatch(getLoginRequest());
    fetch(apiUrls.login, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((data) => {
        const accessToken = data.accessToken.split("Bearer ")[1];
        if (data && data.success && accessToken) {
          setCookie("accessToken", data.accessToken.split("Bearer ")[1], {
            expires: COOKIE_EXPIRES,
          });
          data.refreshToken && setCookie("refreshToken", data.refreshToken);

          dispatch(getLoginSuccess(data.user));
          dispatch(autheticateUser());
        } else {
          dispatch(getLoginFailed());
          dispatch(unautheticateUser());
        }
      })
      .catch((err) => {
        dispatch(getLoginFailed());
      });
  };
}

export function logoutRequest(refreshToken) {
  return function (dispatch) {
    dispatch(getLogoutRequest());
    fetch(apiUrls.logout, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        token: refreshToken,
      }),
    })
      .then(checkResponse)
      .then((data) => {
        if (data && data.success) {
          dispatch(getLogoutSuccess());
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
        } else {
          dispatch(getLogoutFailed());
        }
      })
      .catch((err) => {
        dispatch(getLogoutFailed());
      });
  };
}

export function registrationRequest(form) {
  return function (dispatch) {
    dispatch(getRegistrationRequest());
    fetch(apiUrls.register, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((data) => {
        const accessToken = data.accessToken.split("Bearer ")[1];
        if (data && data.success && accessToken) {
          setCookie("accessToken", data.accessToken.split("Bearer ")[1], {
            expires: COOKIE_EXPIRES,
          });
          data.refreshToken && setCookie("refreshToken", data.refreshToken);
          dispatch(getRegistrationSuccess(data.user));
          dispatch(autheticateUser());
        } else {
          dispatch(getRegistrationFailed());
          dispatch(unautheticateUser());
        }
      })
      .catch((err) => {
        dispatch(getRegistrationFailed());
      });
  };
}

export function passwordForgotRequest(form) {
  return function (dispatch) {
    dispatch(getForgotPasswordRequest());
    fetch(apiUrls.forgotPassword, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
      }),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then(checkResponse)
      .then((data) => {
        if (data && data.success) {
          dispatch(getForgotPasswordSuccess());
        } else {
          dispatch(getForgotPasswordFailed());
        }
      })
      .catch((err) => {
        dispatch(getForgotPasswordFailed());
      });
  };
}

export function resetPasswordRequest(form) {
  return function (dispatch) {
    dispatch(getResetPasswordRequest());
    fetch(apiUrls.resetPassword, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: form.password,
        token: form.token,
      }),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then(checkResponse)
      .then((data) => {
        if (data && data.success) {
          dispatch(getResetPasswordSuccess(data.data));
        } else {
          dispatch(getResetPasswordFailed());
        }
      })
      .catch((err) => {
        dispatch(getResetPasswordFailed());
      });
  };
}

export function getUserDataRequest() {
  return async function (dispatch) {
    dispatch(getUserRequest());

    if (typeof getCookie("accessToken") === "undefined") {
      await tokenRequest();
    }

    fetch(apiUrls.userData, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie("accessToken")}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then(checkResponse)
      .then((data) => {
        if (data && data.success) {
          dispatch(getUserSuccess(data.user));
        } else {
          dispatch(getUserFailed());
        }
      })
      .catch((err) => {
        dispatch(getUserFailed());
      });
  };
}

export function updateUserDataRequest(form) {
  return async function (dispatch) {
    dispatch(getUserRequest());

    if (typeof getCookie("accessToken") === "undefined") {
      await tokenRequest();
    }

    fetch(apiUrls.userData, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify(form),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then(checkResponse)
      .then((data) => {
        if (data && data.success) {
          dispatch(updateUserSuccess(data.user));
        } else {
          dispatch(updateUserFailed());
        }
      })
      .catch((err) => {
        dispatch(updateUserFailed());
      });
  };
}
