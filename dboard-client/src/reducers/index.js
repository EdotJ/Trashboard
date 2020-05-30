import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { alert } from "./alert.reducer";
import { widgets } from "./widgets.reducer";
import { widgetLayout } from "./widgetLayout.reducer";
import { appState } from "./appState.reducer";
import { todos } from "./todos.reducer";
import { notes } from "./notes.reducer";
import { weather } from "./weather.reducer";
import { userConstants } from "../constants";
import { rss } from "./rss.reducer";

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOGOUT) {
    window.localStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};

const appReducer = combineReducers({
  authentication,
  registration,
  alert,
  widgets,
  widgetLayout,
  appState,
  todos,
  notes,
  weather,
  rss,
});

export default rootReducer;
