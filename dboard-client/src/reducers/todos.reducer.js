import { todosConstants, userConstants } from "../constants";

let todosLS = JSON.parse(localStorage.getItem("todos"));
const initialState = todosLS ? todosLS : { nextId: 100, todos: {} };

const addWhenWidgetEmpty = (state, action) => {
  return {
    ...state,
    nextId: state.nextId + 1,
    todos: {
      ...state.todos,
      [action.widgetId]: [
        {
          id: state.nextId,
          text: "",
          isChecked: false,
          widgetId: action.widgetId,
        },
      ],
    },
  };
};

const addWhenWidgetHasTodos = (state, action) => {
  return {
    ...state,
    nextId: state.nextId + 1,
    todos: {
      ...state.todos,
      [action.widgetId]: [
        ...state.todos[action.widgetId],
        {
          id: state.nextId,
          text: "",
          isChecked: false,
          widgetId: action.widgetId,
        },
      ],
    },
  };
};

export const todos = (state = initialState, action) => {
  switch (action.type) {
    case todosConstants.ADD_TODO:
      return state.todos[action.widgetId]
        ? addWhenWidgetHasTodos(state, action)
        : addWhenWidgetEmpty(state, action);
    case todosConstants.REMOVE_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.widgetId]: state.todos[action.widgetId].filter(
            ({ id }) => id !== action.id
          ),
        },
      };
    case todosConstants.CHECK_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.widgetId]: state.todos[action.widgetId].map((todo) =>
            todo.id === action.id
              ? {
                  ...todo,
                  isChecked: !todo.isChecked,
                }
              : todo
          ),
        },
      };
    case todosConstants.UPDATE_TEXT:
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.widgetId]: state.todos[action.widgetId].map((todo) =>
            todo.id === action.id
              ? {
                  ...todo,
                  text: action.text,
                }
              : todo
          ),
        },
      };
    case todosConstants.GET_TODOS:
      return state.todos[action.widgetId];
    case todosConstants.REMOVE_WIDGET:
      delete state.todos[action.id];
      return state;
    case todosConstants.UPDATE_STATE:
      return { ...action.payload };
    case userConstants.LOGOUT:
      return { nextId: 100, todos: {} };
    default:
      return state;
  }
};
