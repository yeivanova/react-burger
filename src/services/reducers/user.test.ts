import { userReducer as reducer, userState as state } from "./user";
import {
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  updateUserRequest,
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
  isPasswordRequested,
  getResetPasswordRequest,
  getResetPasswordSuccess,
  getResetPasswordFailed,
  isPasswordReseted,
} from "../actions/user";
import { testUser } from "../../utils/mock-data";

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(state);
  });

  it("should handle GET_USER_REQUEST", () => {
    expect(reducer(state, getUserRequest())).toEqual({
      ...state,
      userDataRequest: {
        ...state.userDataRequest,
        userRequest: true,
      },
    });
  });

  it("should handle GET_USER_SUCCESS", () => {
    expect(reducer(state, getUserSuccess(testUser))).toEqual({
      ...state,
      userDataRequest: {
        ...state.userDataRequest,
        userRequest: false,
      },
      userData: testUser,
    });
  });

  it("should handle GET_USER_FAILED", () => {
    expect(reducer(state, getUserFailed())).toEqual({
      ...state,
      userDataRequest: {
        userFailed: true,
        userRequest: false,
      },
    });
  });

  it("should handle UPDATE_USER_REQUEST", () => {
    expect(reducer(state, updateUserRequest())).toEqual({
      ...state,
      userDataUpdateRequest: {
        ...state.userDataUpdateRequest,
        userRequest: true,
      },
    });
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    expect(reducer(state, updateUserSuccess(testUser))).toEqual({
      ...state,
      userData: testUser,
      userDataUpdateRequest: {
        ...state.userDataUpdateRequest,
        userRequest: false,
      },
    });
  });

  it("should handle UPDATE_USER_FAILED", () => {
    expect(reducer(state, updateUserFailed())).toEqual({
      ...state,
      userDataUpdateRequest: {
        userFailed: true,
        userRequest: false,
      },
    });
  });

  it("should handle AUTHENTICATE_USER", () => {
    expect(reducer(state, autheticateUser())).toEqual({
      ...state,
      isAuthenticated: true,
    });
  });

  it("should handle UNAUTHENTICATE_USER", () => {
    expect(reducer(state, unautheticateUser())).toEqual({
      ...state,
      isAuthenticated: false,
    });
  });

  it("should handle GET_LOGIN_REQUEST", () => {
    expect(reducer(state, getLoginRequest())).toEqual({
      ...state,
      login: {
        ...state.login,
        loginRequest: true,
      },
    });
  });

  it("should handle GET_LOGIN_SUCCESS", () => {
    expect(reducer(state, getLoginSuccess(testUser))).toEqual({
      ...state,
      login: {
        ...state.login,
        loginRequest: false,
      },
      userData: testUser,
    });
  });

  it("should handle GET_LOGIN_FAILED", () => {
    expect(reducer(state, getLoginFailed())).toEqual({
      ...state,
      login: {
        loginFailed: true,
        loginRequest: false,
      },
      userData: {},
    });
  });

  it("should handle GET_LOGOUT_REQUEST", () => {
    expect(reducer(state, getLogoutRequest())).toEqual({
      ...state,
      logout: {
        ...state.logout,
        logoutRequest: true,
      },
    });
  });

  it("should handle GET_LOGOUT_SUCCESS", () => {
    expect(reducer(state, getLogoutSuccess())).toEqual({
      ...state,
      logout: {
        ...state.logout,
        logoutRequest: false,
      },
      userData: {},
      isAuthenticated: false,
    });
  });

  it("should handle GET_LOGOUT_FAILED", () => {
    expect(reducer(state, getLogoutFailed())).toEqual({
      ...state,
      logout: {
        logoutFailed: true,
        logoutRequest: false,
      },
    });
  });

  it("should handle GET_REGISTRATION_REQUEST", () => {
    expect(reducer(state, getRegistrationRequest())).toEqual({
      ...state,
      registration: {
        ...state.registration,
        registrationRequest: true,
      },
    });
  });

  it("should handle GET_REGISTRATION_SUCCESS", () => {
    expect(reducer(state, getRegistrationSuccess(testUser))).toEqual({
      ...state,
      registration: {
        ...state.registration,
        registrationRequest: false,
      },
      userData: testUser,
    });
  });

  it("should handle GET_REGISTRATION_FAILED", () => {
    expect(reducer(state, getRegistrationFailed())).toEqual({
      ...state,
      registration: {
        registrationFailed: true,
        registrationRequest: false,
      },
      userData: {},
    });
  });

  it("should handle GET_FORGOT_PASSWORD_REQUEST", () => {
    expect(reducer(state, getForgotPasswordRequest())).toEqual({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        forgotPasswordRequest: true,
      },
    });
  });

  it("should handle GET_FORGOT_PASSWORD_SUCCESS", () => {
    expect(reducer(state, getForgotPasswordSuccess())).toEqual({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        forgotPasswordRequest: false,
        isTokenRequested: true,
      },
    });
  });

  it("should handle GET_FORGOT_PASSWORD_FAILED", () => {
    expect(reducer(state, getForgotPasswordFailed())).toEqual({
      ...state,
      forgotPassword: {
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
        isTokenRequested: false,
      },
    });
  });

  it("should handle IS_PASSWORD_REQUESTED", () => {
    expect(reducer(state, isPasswordRequested())).toEqual({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        isTokenRequested: true,
      },
    });
  });

  it("should handle GET_RESET_PASSWORD_REQUEST", () => {
    expect(reducer(state, getResetPasswordRequest())).toEqual({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        resetPasswordRequest: true,
      },
    });
  });

  it("should handle GET_RESET_PASSWORD_SUCCESS", () => {
    expect(reducer(state, getResetPasswordSuccess(testUser))).toEqual({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        resetPasswordRequest: false,
      },
    });
  });

  it("should handle GET_RESET_PASSWORD_FAILED", () => {
    expect(reducer(state, getResetPasswordFailed())).toEqual({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
      },
    });
  });

  it("should handle IS_PASSWORD_RESETED", () => {
    expect(reducer(state, isPasswordReseted())).toEqual({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        isPasswordReseted: true,
      },
    });
  });
});
