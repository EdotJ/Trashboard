import React from "react";

export const WeatherAlertMessage = ({ outcome }) => {
  const messageMap = {
    rainStorm: "A rainy thunderstorm is coming!",
    lightRain: "Slight rain is coming!",
    rain: "It's going to rain!",
    snow: "It's going to snow!",
    drizzle: "It will be a drizzle!",
    noRain: "No precipitation :)",
  };
  return <> {messageMap[outcome]} </>;
};
