import { weatherConstants } from "../constants";

const weatherData = localStorage.getItem("weatherData");
const initialState = weatherData
  ? JSON.parse(weatherData)
  : {
      isLoadingAlerts: false,
      isLoadingForecasts: false,
      alerts: {},
      forecasts: {},
    };

export const weather = (state = initialState, action) => {
  switch (action.type) {
    case weatherConstants.REQUEST_ALERT:
      return { ...state, isLoadingAlerts: true };
    case weatherConstants.REQUEST_FORECAST:
      return { ...state, isLoadingForecasts: true };
    case weatherConstants.RECEIVE_ALERT:
      return {
        ...state,
        isLoadingAlerts: false,
        alerts: {
          weather: action.data.weather[0],
          info: action.data.main,
          lastFetched: action.lastFetched,
        },
      };
    case weatherConstants.RECEIVE_FORECAST:
      return {
        ...state,
        forecasts: {
          data: action.data,
          lastFetched: action.lastFetched,
        },
      };
    default:
      return state;
  }
};
