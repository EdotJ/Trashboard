import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

const loggerMiddleware = createLogger();

const persistedState = localStorage.getItem("draggables")
  ? JSON.parse(localStorage.getItem("draggables"))
  : {};

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

store.subscribe(() => {
  localStorage.setItem(
    "widgets",
    JSON.stringify(store.getState().widgets)
  );
});
