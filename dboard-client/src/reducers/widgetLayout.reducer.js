import { widgetLayoutConstants } from "../constants/widgetLayout.constants";
import { userConstants } from "../constants";

let layoutsLS = localStorage.getItem("widgetLayout");
let initialState = layoutsLS ? JSON.parse(layoutsLS) : { desk: [], mob: [] };

export const widgetLayout = (state = initialState, action) => {
  switch (action.type) {
    case widgetLayoutConstants.UPDATE:
      return {
        ...state,
        ...action.layouts,
      };
    case widgetLayoutConstants.CLEAR:
      return { desk: [], mob: [] };
    case widgetLayoutConstants.ADD:
      const mobileWidget = action.payload.mob;
      const desktopWidget = action.payload.desk;
      return {
        desk: [...state.desk, { ...desktopWidget }],
        mob: [...state.mob, { ...mobileWidget }],
      };
    case widgetLayoutConstants.REMOVE:
      return {
        ...state,
        desk: state.desk.filter((el) => el.i !== action.id),
        mob: state.mob.filter((el) => el.i !== action.id),
      };
    case userConstants.LOGOUT:
      return { desk: [], mob: [] };
    case widgetLayoutConstants.UPDATE_STATE:
      return { ...action.payload };
    default:
      return state;
  }
};
