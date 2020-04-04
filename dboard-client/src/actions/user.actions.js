import { userConstants } from "../constants";
import { userService } from "../services";
import { history } from "../helpers";
import { alertActions } from "./alert.actions";
import { buildErrors } from "../helpers";

export const userActions = {
  login,
  logout,
  register
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        const errorMessage =
          error.message.toString() === "Bad credentials"
            ? "Incorrect username or password"
            : "Something happened. Try again.";
        dispatch(alertActions.error(errorMessage));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success());
        history.push("/login");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(buildErrors(error)));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }

  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}
