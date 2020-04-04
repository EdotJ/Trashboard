import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { alert } from "./alert.reducer";
import { widgets } from "./widgets.reducer";
import { widgetLayout } from "./widgetLayout.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  widgets,
  widgetLayout
});

export default rootReducer;
