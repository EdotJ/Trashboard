import { widgetsConstants, userConstants } from "../constants";

let widgetsLS = JSON.parse(localStorage.getItem("widgets"));
const initialState = widgetsLS ? widgetsLS : { nextId: 100, widgets: [] };

export const widgets = (state = initialState, action) => {
  switch (action.type) {
    case widgetsConstants.ADD:
      return {
        ...state,
        nextId: state.nextId + 1,
        widgets: [
          ...state.widgets,
          {
            id: state.nextId,
            props: action.props,
            type: action.widgetType,
          },
        ],
      };
    case widgetsConstants.UPDATE:
      return {
        ...state,
        widgets: state.widgets.map((widget) =>
          widget.id === action.id
            ? {
                ...widget,
                props: action.props,
              }
            : widget
        ),
      };
    case widgetsConstants.REMOVE:
      return {
        ...state,
        widgets: state.widgets.filter(({ id }) => id !== action.id),
      };
    case widgetsConstants.REMOVE_ALL:
      return [];
    case widgetsConstants.INCREMENT:
      return { ...state, nextId: state.nextId + 1 };
    case widgetsConstants.UPDATE_STATE:
      return { ...action.payload };
    case userConstants.LOGOUT:
      return { nextId: 100, widgets: [] };
    default:
      return state;
  }
};
