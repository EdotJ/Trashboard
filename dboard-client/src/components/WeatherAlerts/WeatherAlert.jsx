import React, { useEffect } from "react";
import { BaseCard } from "../BaseCard";
import { useDispatch, useSelector } from "react-redux";
import { addHours } from "../../utils/dateUtils";
import { weatherActions } from "../../actions/weather.actions";
import { Loader } from "../Loader";
import { WeatherAlertIcon } from "./WeatherAlertIcon";
import { WeatherAlertMessage } from "./WeatherAlertMessage";
import { resolveAlertOutcome } from "../../utils/weatherUtils";

export const WeatherAlert = ({ id }) => {
  const styleMap = {
    rainStorm: "rain-bg",
    lightRain: "snow-bg",
    rain: "rain-bg",
    snow: "snow-bg",
    drizzle: "snow-bg",
    noRain: "",
  };
  const dispatch = useDispatch();
  const data = useSelector((state) => state.weather.alerts);

  useEffect(() => {
    if (addHours(new Date(data.lastFetched), 1) < new Date()) {
      dispatch(weatherActions.fetchAlertDataIfNeeded());
    }
  }, [dispatch, data.lastFetched]);

  return (
    <BaseCard
      className={`weather-alert-base ${
        styleMap[resolveAlertOutcome(data.weather && data.weather.id)]
      }`}
      id={id}
    >
      {data.isLoading ? (
        <Loader size="medium" />
      ) : (
        <>
          <WeatherAlertIcon
            outcome={resolveAlertOutcome(data.weather && data.weather.id)}
          />
          <div className="weather-alert-message">
            <WeatherAlertMessage
              outcome={resolveAlertOutcome(data.weather && data.weather.id)}
            />
          </div>
        </>
      )}
    </BaseCard>
  );
};
