import { rssConstants } from "../constants";

const rssLS = localStorage.getItem("rss");
const initialState = rssLS ? JSON.parse(rssLS) : [];

export const rss = (state = initialState, action) => {
  switch (action.type) {
    case rssConstants.REQUEST_RSS:
      return {
        ...state,
        [action.id]: { ...state[action.id], isLoading: true },
      };
    case rssConstants.RECEIVE_RSS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isLoading: false,
          feed: action.data,
        },
      };
    case rssConstants.ADD_RSS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isLoading: false,
        },
      };
    case rssConstants.REMOVE_WIDGET:
      delete state[action.id];
      return state;
    default:
      return state;
  }
};
