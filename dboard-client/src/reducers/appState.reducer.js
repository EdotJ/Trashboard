import { appStateConstants } from "../constants";
const initialState = { isDrawerExpanded: false };
export function appState(state = initialState, action) {
  switch (action.type) {
    case appStateConstants.TOGGLE_EXPANSION:
      return { ...state, isDrawerExpanded: !state.isDrawerExpanded };
    default:
      return state;
  }
}
