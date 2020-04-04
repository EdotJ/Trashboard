import { widgetsConstants } from "../constants";

let widgetsLS = JSON.parse(localStorage.getItem("widgets"));
const initialState = widgetsLS ? widgetsLS : [];

export const widgets = (state = initialState, action) => {
  switch (action.type) {
    case widgetsConstants.ADD:
      return [
        ...state,
        {
          id: action.id,
          props: action.props,
          type: action.widgetType
        }
      ];
    case widgetsConstants.UPDATE:
      return state.map(widget =>
        widget.id === action.id
          ? {
              ...widget,
              props: action.props,
            }
          : widget
      );
    case widgetsConstants.REMOVE:
      return state.filter(({ id }) => id !== action.id);
    case widgetsConstants.REMOVE_ALL:
      return [];
    default:
      return state;
  }
};
