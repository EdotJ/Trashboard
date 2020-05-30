import { todosConstants } from "../constants";

const add = (widgetId) => {
  return { type: todosConstants.ADD_TODO, widgetId };
};

const remove = (widgetId, id) => {
  return { type: todosConstants.REMOVE_TODO, widgetId, id };
};

const check = (widgetId, id) => {
  return { type: todosConstants.CHECK_TODO, widgetId, id };
};

const fetchAll = (widgetId) => {
  return { type: todosConstants.GET_TODOS, widgetId };
};

const updateText = (widgetId, id, text) => {
  return { type: todosConstants.UPDATE_TEXT, widgetId, id, text };
};

const removeWidget = (widgetId) => {
  return { type: todosConstants.REMOVE_WIDGET, id: widgetId };
};

const updateState = (payload) => {
  return { type: todosConstants.UPDATE_STATE, payload };
};

export const todosActions = {
  add,
  remove,
  check,
  fetchAll,
  updateText,
  removeWidget,
  updateState,
};
