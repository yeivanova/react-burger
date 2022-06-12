import { getCookie } from "../../utils/utils";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  CLEAR_USER_DATA,
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
} from "../actions/user";

const userState = {
  userData: {
    name: null,
    email: null,
    password: null,
  },
  userDataRequest: {
    userRequest: false,
    userFailed: false,
  },
  userDataUpdateRequest: {
    userRequest: false,
    userFailed: false,
  },
  login: {
    loginRequest: false,
    loginFailed: false,
  },
  logout: {
    logoutRequest: false,
    logoutFailed: false,
  },
  registration: {
    registrationRequest: false,
    registrationFailed: false,
  },
  forgotPassword: {
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    isTokenRequested: false,
  },
  resetPassword: {
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    isPasswordReseted: false,
  },
  isAuthenticated:
    typeof getCookie("refreshToken") === "undefined" ? false : true,
};

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER: {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case UNAUTHENTICATE_USER: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case CLEAR_USER_DATA: {
      return {
        ...state,
        userData: userState,
      };
    }
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        login: {
          ...state.login,
          loginRequest: true,
        },
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        login: {
          ...state.login,
          loginRequest: false,
        },
        userData: action.user,
      };
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        login: {
          loginFailed: true,
          loginRequest: false,
        },
        userData: {},
      };
    }
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        logout: {
          ...state.logout,
          logoutRequest: true,
        },
      };
    }
    case GET_LOGOUT_SUCCESS: {
      return {
        ...state,
        logout: {
          ...state.logout,
          logoutRequest: false,
        },
        userData: {},
        isAuthenticated: false,
      };
    }
    case GET_LOGOUT_FAILED: {
      return {
        ...state,
        logout: {
          logoutFailed: true,
          logoutRequest: false,
        },
      };
    }
    case GET_REGISTRATION_REQUEST: {
      return {
        ...state,
        registration: {
          ...state.registration,
          registrationRequest: true,
        },
      };
    }
    case GET_REGISTRATION_SUCCESS: {
      return {
        ...state,
        registration: {
          ...state.registration,
          registrationRequest: false,
        },
        userData: action.user,
      };
    }
    case GET_REGISTRATION_FAILED: {
      return {
        ...state,
        registration: {
          registrationFailed: true,
          registrationRequest: false,
        },
        userData: {},
      };
    }
    case GET_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          forgotPasswordRequest: true,
        },
      };
    }
    case GET_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          forgotPasswordRequest: false,
          isTokenRequested: true,
        },
      };
    }
    case GET_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPassword: {
          forgotPasswordFailed: true,
          forgotPasswordRequest: false,
          isTokenRequested: false,
        },
      };
    }
    case IS_PASSWORD_REQUESTED: {
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          isTokenRequested: true,
        },
      };
    }
    case IS_PASSWORD_RESETED: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          isPasswordReseted: true,
        },
      };
    }
    case GET_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          resetPasswordRequest: true,
        },
      };
    }
    case GET_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          resetPasswordRequest: false,
        },
      };
    }
    case GET_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPassword: {
          resetPasswordFailed: true,
          resetPasswordRequest: false,
        },
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        userDataRequest: {
          ...state.userDataRequest,
          userRequest: true,
        },
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userDataRequest: {
          ...state.userDataRequest,
          userRequest: false,
        },
        userData: action.user,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userDataRequest: {
          userFailed: true,
          userRequest: false,
        },
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        userDataUpdateRequest: {
          ...state.userDataUpdateRequest,
          userRequest: true,
        },
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        userData: action.user,
        userDataUpdateRequest: {
          ...state.userDataUpdateRequest,
          userRequest: false,
        },
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        userDataUpdateRequest: {
          userFailed: true,
          userRequest: false,
        },
      };
    }
    default:
      return state;
  }
};
