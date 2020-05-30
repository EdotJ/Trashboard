import React from "react";
import { ReactComponent as CloudedSunny } from "../../assets/img/weather/clouded-sunny.svg";
import { ReactComponent as LightRain } from "../../assets/img/weather/light-rain.svg";
import { ReactComponent as Rain } from "../../assets/img/weather/rainy.svg";
import { ReactComponent as Snow } from "../../assets/img/weather/snow.svg";
import { ReactComponent as Sunny } from "../../assets/img/weather/sunny.svg";
import { ReactComponent as ThunderRain } from "../../assets/img/weather/thunder-rain.svg";
import { ReactComponent as ThunderNoRain } from "../../assets/img/weather/thunder-no-rain.svg";

export const WeatherReportIcon = ({ outcome }) => {
  const iconMap = {
    rainStorm: ThunderRain,
    lightRain: LightRain,
    rain: Rain,
    snow: Snow,
    drizzle: LightRain,
    sunny: Sunny,
    cloudedSunny: CloudedSunny,
    thunderstorm: ThunderNoRain,
  };
  const Component = iconMap[outcome];
  return <Component className="weather-icon" />;
};
