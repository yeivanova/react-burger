import { checkResponse, setCookie, getCookie, deleteCookie } from "./utils";
import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
} from "../services/actions/ingredients";
import {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
} from "../services/actions/order";
import {
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  updateUserSuccess,
  updateUserFailed,
  autheticateUser,
  unautheticateUser,
  getLoginRequest,
  getLoginSuccess,
  getLoginFailed,
  getLogoutRequest,
  getLogoutSuccess,
  getLogoutFailed,
  getRegistrationRequest,
  getRegistrationSuccess,
  getRegistrationFailed,
  getForgotPasswordRequest,
  getForgotPasswordSuccess,
  getForgotPasswordFailed,
  getResetPasswordRequest,
  getResetPasswordSuccess,
  getResetPasswordFailed,
} from "../services/actions/user";
import { TUserReq, TFetchOptions } from "../services/types/data";
import type { AppDispatch } from "../services/types";

export const baseUrl = "https://norma.nomoreparties.space/api";
export const wsUrl = "wss://norma.nomoreparties.space/orders/all";
export const wsAuthUrl = "wss://norma.nomoreparties.space/orders";

const apiUrls = {
  ingredients: `${baseUrl}/ingredients`,
  orders: `${baseUrl}/orders`,
  token: `${baseUrl}/auth/token`,
  login: `${baseUrl}/auth/login`,
  logout: `${baseUrl}/auth/logout`,
  register: `${baseUrl}/auth/register`,
  forgotPassword: `${baseUrl}/password-reset`,
  resetPassword: `${baseUrl}/password-reset/reset`,
  userData: `${baseUrl}/auth/user`,
};

export function loadData() {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequest());
    fetch(apiUrls.ingredients)
      .then(checkResponse)
      .then((items) => {
        if (items && items.success) {
          dispatch(getIngredientsSuccess(items.data));
        } else {
          dispatch(getIngredientsFailed());
        }
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
      });
  };
}

export function getOrder(orderContent: string[]) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("accessToken")}`,
    },
    body: JSON.stringify({
      ingredients: orderContent,
    }),
  };
  return async function (dispatch: AppDispatch) {
    if (typeof getCookie("accessToken") === "undefined") {
      await tokenRequest();
    }
    dispatch(getOrderRequest());
    fetch(apiUrls.orders, requestOptions)
      .then(checkResponse)
      .then((data) => {
        if (data && data.success) {
          dispatch(getOrderSuccess(data.order.number));
        } else {
          dispatch(getOrderFailed());
        }
      })
      .catch((err) => {
        dispatch(getOrderFailed());
      });
  };
}

export async function tokenRequest() {
  const refreshToken = getCookie("refreshToken");
  if (typeof refreshToken === "undefined") return false;
  return fetch(apiUrls.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkResponse);
}

export const fetchWithRefresh = async (url: string, options: TFetchOptions) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const updateData = await tokenRequest();
      setCookie("accessToken", updateData.accessToken.split("Bearer ")[1]);
      setCookie("refreshToken", updateData.refreshToken);
      options.headers.authorization = updateData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export function loginRequest(form: Partial<TUserReq>) {
  return function (dispatch: AppDispatch) {
    dispatch(getLoginRequest());
    fetch(apiUrls.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((data) => {
        const accessToken = data.accessToken.split("Bearer ")[1];
        if (data && data.success && accessToken) {
          setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
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

export function logoutRequest(refreshToken: string | undefined) {
  return function (dispatch: AppDispatch): void {
    if (refreshToken !== undefined) {
      dispatch(getLogoutRequest());
      fetch(apiUrls.logout, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    }
  };
}

export function registrationRequest(form: TUserReq) {
  return function (dispatch: AppDispatch) {
    dispatch(getRegistrationRequest());
    fetch(apiUrls.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((data) => {
        const accessToken = data.accessToken.split("Bearer ")[1];
        if (data && data.success && accessToken) {
          setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
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

export function passwordForgotRequest(form: { email: string }) {
  return function (dispatch: AppDispatch) {
    dispatch(getForgotPasswordRequest());
    fetch(apiUrls.forgotPassword, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
      }),
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

export function resetPasswordRequest(form: {
  password: string;
  token: string;
}) {
  return function (dispatch: AppDispatch) {
    dispatch(getResetPasswordRequest());
    fetch(apiUrls.resetPassword, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: form.password,
        token: form.token,
      }),
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
  return async function (dispatch: AppDispatch): Promise<void> {
    dispatch(getUserRequest());
    fetchWithRefresh(apiUrls.userData, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie("accessToken")}`,
      },
    })
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

export function updateUserDataRequest(form: TUserReq) {
  return async function (dispatch: AppDispatch): Promise<void> {
    dispatch(getUserRequest());
    return fetchWithRefresh(apiUrls.userData, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify(form),
    })
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
