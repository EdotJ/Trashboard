import React from "react";
import { ReactComponent as LightRain } from "../../assets/img/weather/light-rain.svg";
import { ReactComponent as Snow } from "../../assets/img/weather/snow.svg";
import { ReactComponent as Rain } from "../../assets/img/weather/rainy.svg";
import { ReactComponent as ThunderRain } from "../../assets/img/weather/thunder-rain.svg";
import { ReactComponent as NoRain } from "../../assets/img/weather/no-rain.svg";

export const WeatherAlertIcon = ({ outcome }) => {
  const iconMap = {
    rainStorm: ThunderRain,
    lightRain: LightRain,
    rain: Rain,
    snow: Snow,
    noRain: NoRain,
  };
  const Component = iconMap[outcome];
  return <Component className="weather-icon" />;
};
