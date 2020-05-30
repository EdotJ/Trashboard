import { authHeader } from "../helpers/auth-header";
import { handleResponse } from "../utils/responseUtils";

export const todosService = {
  addTodo,
  updateTodo,
};

function addTodo(todoId, widgetId) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      webKey: todoId,
      widgetId: widgetId,
      title: "",
      checked: false,
    }),
  };
  fetch(`${process.env.config.apiUrl}/api/todos`, requestOptions).then(
    handleResponse
  );
}

function updateTodo(todo) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({
      webKey: todo.id,
      widgetId: todo.widgetId,
      title: todo.text,
      checked: todo.isChecked,
    }),
  };
  fetch(`${process.env.config.apiUrl}/api/todos`, requestOptions).then(
    handleResponse
  );
}
