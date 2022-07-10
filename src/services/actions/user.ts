import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  AUTHENTICATE_USER,
  UNAUTHENTICATE_USER,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_FORGOT_PASSWORD_FAILED,
  IS_PASSWORD_REQUESTED,
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
  GET_RESET_PASSWORD_FAILED,
  IS_PASSWORD_RESETED,
} from "../constants/user";
import { TUserReq } from "../types/data";
import { TActionCreator } from "../types/index";

export type TGetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST;
};

export type TGetUserSuccessAction = TActionCreator<
  typeof GET_USER_SUCCESS,
  TUserReq
>;

export type TGetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED;
};

export type TUpdateUserRequestAction = {
  readonly type: typeof UPDATE_USER_REQUEST;
};

export type TUpdateUserSuccessAction = TActionCreator<
  typeof UPDATE_USER_SUCCESS,
  TUserReq
>;

export type TUpdateUserFailedAction = {
  readonly type: typeof UPDATE_USER_FAILED;
};

export type TAutheticateUserAction = {
  readonly type: typeof AUTHENTICATE_USER;
};

export type TUnautheticateUserAction = {
  readonly type: typeof UNAUTHENTICATE_USER;
};

export type TGetLoginRequestAction = {
  readonly type: typeof GET_LOGIN_REQUEST;
};

export type TGetLoginSuccessAction = TActionCreator<
  typeof GET_LOGIN_SUCCESS,
  TUserReq
>;

export type TGetLoginFailedAction = {
  readonly type: typeof GET_LOGIN_FAILED;
};

export type TGetLogoutRequestAction = {
  readonly type: typeof GET_LOGOUT_REQUEST;
};

export type TGetLogoutSuccessAction = {
  readonly type: typeof GET_LOGOUT_SUCCESS;
};

export type TGetLogoutFailedAction = {
  readonly type: typeof GET_LOGOUT_FAILED;
};

export type TGetRegistrationRequestAction = {
  readonly type: typeof GET_REGISTRATION_REQUEST;
};

export type TGetRegistrationSuccessAction = TActionCreator<
  typeof GET_REGISTRATION_SUCCESS,
  TUserReq
>;

export type TGetRegistrationFailedAction = {
  readonly type: typeof GET_REGISTRATION_FAILED;
};

export type TGetForgotPasswordRequestAction = {
  readonly type: typeof GET_FORGOT_PASSWORD_REQUEST;
};

export type TGetForgotPasswordSuccessAction = {
  readonly type: typeof GET_FORGOT_PASSWORD_SUCCESS;
};

export type TGetForgotPasswordFailedAction = {
  readonly type: typeof GET_FORGOT_PASSWORD_FAILED;
};

export type TIsPasswordRequestedAction = {
  readonly type: typeof IS_PASSWORD_REQUESTED;
};

export type TGetResetPasswordRequestAction = {
  readonly type: typeof GET_RESET_PASSWORD_REQUEST;
};

export type TGetResetPasswordSuccessAction = TActionCreator<
  typeof GET_RESET_PASSWORD_SUCCESS,
  TUserReq
>;

export type TGetResetPasswordFailedAction = {
  readonly type: typeof GET_RESET_PASSWORD_FAILED;
};

export type TIsPasswordResetedAction = {
  readonly type: typeof IS_PASSWORD_RESETED;
};

export type TUserActions =
  | TGetUserRequestAction
  | TGetUserSuccessAction
  | TGetUserFailedAction
  | TUpdateUserRequestAction
  | TUpdateUserSuccessAction
  | TUpdateUserFailedAction
  | TAutheticateUserAction
  | TUnautheticateUserAction
  | TGetLoginRequestAction
  | TGetLoginSuccessAction
  | TGetLoginFailedAction
  | TGetLogoutRequestAction
  | TGetLogoutSuccessAction
  | TGetLogoutFailedAction
  | TGetRegistrationRequestAction
  | TGetRegistrationSuccessAction
  | TGetRegistrationFailedAction
  | TGetForgotPasswordRequestAction
  | TGetForgotPasswordSuccessAction
  | TGetForgotPasswordFailedAction
  | TIsPasswordRequestedAction
  | TGetResetPasswordRequestAction
  | TGetResetPasswordSuccessAction
  | TGetResetPasswordFailedAction
  | TIsPasswordResetedAction;

export const getUserRequest = (): TGetUserRequestAction => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = (user: TUserReq): TGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailed = (): TGetUserFailedAction => ({
  type: GET_USER_FAILED,
});

export const updateUserRequest = (): TUpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (
  user: TUserReq
): TUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailed = (): TUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED,
});

export const autheticateUser = (): TAutheticateUserAction => ({
  type: AUTHENTICATE_USER,
});

export const unautheticateUser = (): TUnautheticateUserAction => ({
  type: UNAUTHENTICATE_USER,
});

export const getLoginRequest = (): TGetLoginRequestAction => ({
  type: GET_LOGIN_REQUEST,
});

export const getLoginSuccess = (user: TUserReq): TGetLoginSuccessAction => ({
  type: GET_LOGIN_SUCCESS,
  payload: user,
});

export const getLoginFailed = (): TGetLoginFailedAction => ({
  type: GET_LOGIN_FAILED,
});

export const getLogoutRequest = (): TGetLogoutRequestAction => ({
  type: GET_LOGOUT_REQUEST,
});

export const getLogoutSuccess = (): TGetLogoutSuccessAction => ({
  type: GET_LOGOUT_SUCCESS,
});

export const getLogoutFailed = (): TGetLogoutFailedAction => ({
  type: GET_LOGOUT_FAILED,
});

export const getRegistrationRequest = (): TGetRegistrationRequestAction => ({
  type: GET_REGISTRATION_REQUEST,
});

export const getRegistrationSuccess = (
  user: TUserReq
): TGetRegistrationSuccessAction => ({
  type: GET_REGISTRATION_SUCCESS,
  payload: user,
});

export const getRegistrationFailed = (): TGetRegistrationFailedAction => ({
  type: GET_REGISTRATION_FAILED,
});

export const getForgotPasswordRequest =
  (): TGetForgotPasswordRequestAction => ({
    type: GET_FORGOT_PASSWORD_REQUEST,
  });

export const getForgotPasswordSuccess =
  (): TGetForgotPasswordSuccessAction => ({
    type: GET_FORGOT_PASSWORD_SUCCESS,
  });

export const getForgotPasswordFailed = (): TGetForgotPasswordFailedAction => ({
  type: GET_FORGOT_PASSWORD_FAILED,
});

export const isPasswordRequested = (): TIsPasswordRequestedAction => ({
  type: IS_PASSWORD_REQUESTED,
});

export const getResetPasswordRequest = (): TGetResetPasswordRequestAction => ({
  type: GET_RESET_PASSWORD_REQUEST,
});

export const getResetPasswordSuccess = (user: TUserReq) => ({
  type: GET_RESET_PASSWORD_SUCCESS,
  payload: user,
});

export const getResetPasswordFailed = (): TGetResetPasswordFailedAction => ({
  type: GET_RESET_PASSWORD_FAILED,
});

export const isPasswordReseted = (): TIsPasswordResetedAction => ({
  type: IS_PASSWORD_RESETED,
});
