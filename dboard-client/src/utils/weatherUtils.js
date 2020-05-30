export function resolveAlertOutcome(id) {
  const isRainyStorm = (id >= 200 && id <= 202) || (id >= 230 && id <= 232);
  const isLightRain = id === 500;
  const isDrizzly =
    (id >= 300 && id <= 302) || (id >= 310 && id <= 314) || id === 321;
  const isRainy = id >= 500 && id <= 531;
  const isSnowy = id >= 600 && id <= 622;
  if (isRainyStorm) {
    return "rainStorm";
  } else if (isLightRain) {
    return "lightRain";
  } else if (isRainy) {
    return "rain";
  } else if (isSnowy) {
    return "snow";
  } else if (isDrizzly) {
    return "drizzle";
  } else {
    return "noRain";
  }
}

export function resolveWeatherOutcome(id) {
  const isRainyStorm = (id >= 200 && id <= 202) || (id >= 230 && id <= 233);
  const isThunderstorm = id === 233;
  const isLightRain = id === 500 || id === 300;
  const isDrizzly = id >= 301 && id <= 302;
  const isRainy = id >= 500 && id <= 522;
  const isSnowy = id >= 600 && id <= 623;
  const isSunny = id === 800;
  if (isRainyStorm) {
    return "rainStorm";
  } else if (isThunderstorm) {
    return "thunderstorm";
  } else if (isLightRain) {
    return "lightRain";
  } else if (isRainy) {
    return "rain";
  } else if (isSnowy) {
    return "snow";
  } else if (isDrizzly) {
    return "drizzle";
  } else if (isSunny) {
    return "sunny";
  } else {
    return "cloudedSunny";
  }
}
