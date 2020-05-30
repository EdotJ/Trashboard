import { weatherConstants } from "../constants";
import { authHeader } from "../helpers/auth-header";

export const weatherActions = {
  fetchAlertDataIfNeeded,
  fetchForecastDataIfNeeded,
};

function fetchAlertDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAlertData(getState().weather)) {
      return dispatch(fetchAlertData());
    }
  };
}

function shouldFetchAlertData(weatherData) {
  if (!weatherData) {
    return true;
  } else if (weatherData.isLoading) {
    return false;
  } else {
    return true;
  }
}

function fetchAlertData() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    dispatch(requestAlertData());
    const response = await fetch(
      `${process.env.config.apiUrl}/api/weather/alerts`,
      requestOptions
    );
    const json = await response.json();
    return dispatch(receiveAlertData(json));
  };
}

function requestAlertData() {
  return { type: weatherConstants.REQUEST_ALERT };
}

function receiveAlertData(json) {
  return {
    type: weatherConstants.RECEIVE_ALERT,
    data: json,
    lastFetched: new Date(),
  };
}

function fetchForecastDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchForecastData(getState().weather)) {
      return dispatch(fetchForecastData());
    }
  };
}

function shouldFetchForecastData(data) {
  if (!data) {
    return true;
  } else if (data.isLoading) {
    return false;
  } else {
    return true;
  }
}

function fetchForecastData() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    dispatch(requestForecastData());
    const response = await fetch(
      `${process.env.config.apiUrl}/api/weather/forecasts`,
      requestOptions
    );
    const json = await response.json();
    return dispatch(receiveForecastData(json));
  };
}

function requestForecastData() {
  return { type: weatherConstants.REQUEST_FORECAST };
}

function receiveForecastData(json) {
  return {
    type: weatherConstants.RECEIVE_FORECAST,
    data: json.data,
    lastFetched: new Date(),
  };
}
