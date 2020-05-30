import { userConstants } from "../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loadingToken: false, loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.SAVE:
      return state;
    case userConstants.CHECK_TOKEN_REQUEST:
      return {
        ...state,
        loadingToken: true,
      };
    case userConstants.CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        loadingToken: false,
      };
    case userConstants.CHECK_TOKEN_FAILURE:
      return {
        ...state,
        loadingToken: false,
      };
    default:
      return state;
  }
}
