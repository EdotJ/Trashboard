import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

const loggerMiddleware = createLogger();

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

store.subscribe(() => {
  saveLayout(store);
  saveWidgets(store);
  saveTodos(store);
  saveNotes(store);
  saveWeatherData(store);
  saveRss(store);
});

const saveLayout = (store) => {
  const stateLayout = store.getState().widgetLayout;
  if (
    stateLayout &&
    stateLayout.desk &&
    stateLayout.desk.length > 0 &&
    stateLayout.mob &&
    stateLayout.mob.length > 0
  ) {
    localStorage.setItem(
      "widgetLayout",
      JSON.stringify(store.getState().widgetLayout)
    );
  }
};

const saveWidgets = (store) => {
  const widgets = store.getState().widgets;
  if (
    widgets &&
    widgets.nextId &&
    widgets.widgets
    // widgets.widgets.length > 0
  ) {
    localStorage.setItem("widgets", JSON.stringify(store.getState().widgets));
  }
};

const saveTodos = (store) => {
  const todos = store.getState().todos;
  if (todos && todos.nextId && todos.nextId !== 100) {
    localStorage.setItem("todos", JSON.stringify(store.getState().todos));
  }
};

const saveNotes = (store) => {
  const notes = store.getState().notes;
  if (notes.length > 0) {
    localStorage.setItem("notes", JSON.stringify(store.getState().notes));
  }
};

const saveWeatherData = (store) => {
  const weatherData = store.getState().weather;
  if (
    Object.keys(weatherData.alerts).length > 0 ||
    Object.keys(weatherData.forecasts).length > 0
  ) {
    localStorage.setItem(
      "weatherData",
      JSON.stringify(store.getState().weather)
    );
  }
};

const saveRss = (store) => {
  const rssData = store.getState().rss;
  if (rssData.length > 0) {
    localStorage.setItem("rss", JSON.stringify(store.getState().rss));
  }
};
