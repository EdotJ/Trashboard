import { notesConstants, userConstants } from "../constants";

let notesLS = JSON.parse(localStorage.getItem("notes"));
const initialState = notesLS ? notesLS : [];

export const notes = (state = initialState, action) => {
  switch (action.type) {
    case notesConstants.ADD:
      return [
        ...state,
        {
          id: action.id,
          title: "",
          body: "",
        },
      ];
    case notesConstants.UPDATE:
      return state.map((el) =>
        el.id === action.id
          ? {
              ...el,
              body: action.note.body,
              title: action.note.title,
              serverId: action.note.serverId,
            }
          : el
      );
    case notesConstants.REMOVE_WIDGET: {
      return state.filter((el) => el.id !== action.id);
    }
    case notesConstants.UPDATE_STATE: {
      return action.payload;
    }
    case userConstants.LOGOUT:
      return [];
    default:
      return state;
  }
};
