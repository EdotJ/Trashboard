import { authHeader } from "../helpers/auth-header";
import {
  widgetsActions,
  widgetLayoutActions,
  notesActions,
  todosActions,
  alertActions,
} from "../actions";
import { handleResponse } from "../utils/responseUtils";
import { userConstants } from "../constants";

export const userService = {
  login,
  logout,
  register,
  getById,
  update,
  getState,
  checkToken,
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usernameOrEmail: username, password }),
  };
  return fetch(`${process.env.config.apiUrl}/api/auth/signin`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${process.env.config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function checkToken(dispatch) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    dispatch(request());
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.accessToken }),
    };
    return fetch(
      `${process.env.config.apiUrl}/api/auth/checkToken`,
      requestOptions
    )
      .then(handleInvalidToken)
      .then(
        (data) => {
          dispatch(success());
        },
        (error) => {
          dispatch(failure());
          dispatch(
            alertActions.error(
              "Your session has expired. Please sign in again :)"
            )
          );
        }
      );
  }
}

function handleInvalidToken(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        userService.logout();
      }
      const error = data || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function request() {
  return { type: userConstants.CHECK_TOKEN_REQUEST };
}

function success() {
  return { type: userConstants.CHECK_TOKEN_SUCCESS };
}

function failure() {
  return { type: userConstants.CHECK_TOKEN_FAILURE };
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(
    `${process.env.config.apiUrl}/api/auth/signup`,
    requestOptions
  ).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: JSON.stringify(user),
  };

  return fetch(
    `${process.env.config.apiUrl}/users/${user.id}`,
    requestOptions
  ).then(handleResponse);
}

function getState(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${process.env.config.apiUrl}/api/user/state`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      const widgets = getWidgetsFromServerState(data.widgets);
      const layout = getLayoutFromServerState(data.layout);
      const todos = getTodosFromServerState(data.todos);
      const notes = getNotesFromServerState(data.notes);
      if (widgets && layout) {
        localStorage.setItem("widgets", JSON.stringify(widgets));
        localStorage.setItem("widgetLayout", JSON.stringify(layout));
        updateState(dispatch);
        if (todos) {
          localStorage.setItem("todos", JSON.stringify(todos));
          updateTodoState(dispatch, todos);
        }
        if (notes) {
          localStorage.setItem("notes", JSON.stringify(notes));
          updateNoteState(dispatch, notes);
        }
      }
    });
}

function updateState(dispatch) {
  dispatch(
    widgetsActions.updateWidgetState(
      JSON.parse(localStorage.getItem("widgets"))
    )
  );
  dispatch(
    widgetLayoutActions.updateState(
      JSON.parse(localStorage.getItem("widgetLayout"))
    )
  );
}

function updateNoteState(dispatch, notes) {
  dispatch(notesActions.updateState(notes));
}

function updateTodoState(dispatch, todos) {
  dispatch(todosActions.updateState(todos));
}

function getWidgetsFromServerState(data) {
  return (
    data.widgetList.length > 0 && {
      nextId: data.nextId,
      widgets: data.widgetList.map((el) => {
        return {
          type: el.type,
          props: JSON.parse(el.props),
          id: el.clientId,
          serverId: el.id,
        };
      }),
    }
  );
}

function getLayoutFromServerState(data) {
  const isDefined = data && data.desk && data.mob;
  return (
    isDefined && {
      desk: data.desk.map((el) => {
        return {
          serverId: el.id,
          i: el.webKey.toString(),
          x: el.x,
          y: el.y,
          w: el.w,
          h: el.h,
          minW: el.minW,
          minH: el.minH,
          static: el.static,
        };
      }),
      mob: data.mob.map((el) => {
        return {
          serverId: el.id,
          i: el.webKey.toString(),
          x: el.x,
          y: el.y,
          w: el.w,
          h: el.h,
          minW: el.minW,
          minH: el.minH,
          static: el.static,
        };
      }),
    }
  );
}

function getTodosFromServerState(data) {
  const todos =
    Object.entries(data.todos).length > 0 &&
    Object.entries(data.todos)
      .map(([k, v]) => ({
        [k]: v.map((e) => ({
          id: e.webKey,
          isChecked: e.checked,
          text: e.title,
          widgetId: e.widget.clientId,
          serverId: e.id,
        })),
      }))
      .reduce((acc, cur) => Object.assign({ ...acc, ...cur }));
  return (
    todos && {
      nextId: data.nextId,
      todos,
    }
  );
}

function getNotesFromServerState(data) {
  return (
    data.notes.length > 0 &&
    data.notes.map((e) => {
      return {
        id: e.widget.clientId,
        title: e.title,
        body: e.body,
        serverId: e.id,
      };
    })
  );
}
