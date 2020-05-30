import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BaseCard } from "../BaseCard";
import { addHours, addDays, getDayOfWeek } from "../../utils/dateUtils";
import { weatherActions } from "../../actions";
import { WeatherReportIcon } from "./WeatherReportIcon";
import { resolveWeatherOutcome } from "../../utils/weatherUtils";

export const WeatherReports = ({ id }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.weather.forecasts);

  useEffect(() => {
    if (
      addHours(new Date(data.lastFetched), 1) < new Date() ||
      !data.lastFetched
    ) {
      dispatch(weatherActions.fetchForecastDataIfNeeded());
    }
  }, [data.lastFetched, dispatch]);

  const resolveDay = (i) => {
    const day = addDays(new Date(), i).getDay();
    return getDayOfWeek(day);
  };

  return (
    <BaseCard className="weather-report-base" id={id}>
      {data.data &&
        data.data.map((el, i) => {
          return (
            <div key={i} className="weather-report-element">
              <div className="weather-report-day">{resolveDay(i)}</div>
              <WeatherReportIcon
                className="weather-report-icon"
                outcome={resolveWeatherOutcome(el.weather.code)}
              />
              <div className="weather-report-temperature">{el.temp}C&deg;</div>
            </div>
          );
        })}
    </BaseCard>
  );
};
