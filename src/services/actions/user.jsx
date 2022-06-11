import { setCookie, getCookie, deleteCookie } from "../../utils/utils";
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
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
    .then((res) => {
      setCookie("accessToken", res.accessToken.split("Bearer ")[1], {
        expires: COOKIE_EXPIRES,
      });
      setCookie("refreshToken", res.refreshToken);
    });
}

export function loginRequest(form) {
  return function (dispatch) {
    dispatch({
      type: GET_LOGIN_REQUEST,
    });
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
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((data) => {
        let accessToken;
        accessToken = data.accessToken.split("Bearer ")[1];
        if (data && data.success && accessToken) {
          setCookie("accessToken", data.accessToken.split("Bearer ")[1], {
            expires: COOKIE_EXPIRES,
          });
          data.refreshToken && setCookie("refreshToken", data.refreshToken);

          dispatch({
            type: GET_LOGIN_SUCCESS,
            user: data.user,
          });
          dispatch({
            type: AUTHENTICATE_USER,
          });
        } else {
          dispatch({
            type: GET_LOGIN_FAILED,
          });
          dispatch({
            type: UNAUTHENTICATE_USER,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_LOGIN_FAILED,
        });
      });
  };
}

export function logoutRequest(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: GET_LOGOUT_REQUEST,
    });
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
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_LOGOUT_SUCCESS,
          });
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
        } else {
          dispatch({
            type: GET_LOGOUT_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_LOGOUT_FAILED,
        });
      });
  };
}

export function registrationRequest(form) {
  return function (dispatch) {
    dispatch({
      type: GET_REGISTRATION_REQUEST,
    });
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
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((data) => {
        let accessToken;
        accessToken = data.accessToken.split("Bearer ")[1];
        if (data && data.success && accessToken) {
          setCookie("accessToken", data.accessToken.split("Bearer ")[1], {
            expires: COOKIE_EXPIRES,
          });
          data.refreshToken && setCookie("refreshToken", data.refreshToken);
          dispatch({
            type: GET_REGISTRATION_SUCCESS,
            user: data.user,
          });
          dispatch({
            type: AUTHENTICATE_USER,
          });
        } else {
          dispatch({
            type: GET_REGISTRATION_FAILED,
          });
          dispatch({
            type: UNAUTHENTICATE_USER,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_REGISTRATION_FAILED,
        });
      });
  };
}

export function passwordForgotRequest(form) {
  return function (dispatch) {
    dispatch({
      type: GET_RESET_PASSWORD_REQUEST,
    });
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
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_FORGOT_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({
            type: GET_FORGOT_PASSWORD_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_FORGOT_PASSWORD_FAILED,
        });
      });
  };
}

export function resetPasswordRequest(form) {
  return function (dispatch) {
    dispatch({
      type: GET_RESET_PASSWORD_REQUEST,
    });
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
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_RESET_PASSWORD_SUCCESS,
            user: data.data,
          });
        } else {
          dispatch({
            type: GET_RESET_PASSWORD_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function getUserDataRequest() {
  return async function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });

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
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: data.user,
          });
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
}

export function updateUserDataRequest(form) {
  return async function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });

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
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: data.user,
          });
        } else {
          dispatch({
            type: UPDATE_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
}
