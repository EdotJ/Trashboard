import { widgetLayoutConstants } from "../constants/widgetLayout.constants";

let layoutsLS = localStorage.getItem("widgetLayout");
let initialState = layoutsLS
  ? JSON.parse(layoutsLS)
  : { desk: [], mob: [] };

export const widgetLayout = (state = initialState, action) => {
  switch (action.type) {
    case widgetLayoutConstants.UPDATE:
      return {
        ...state,
        ...action.layouts
      };
    case widgetLayoutConstants.CLEAR:
      return { desk: [], mob: [] }
    default:
      return state;
  }
};
