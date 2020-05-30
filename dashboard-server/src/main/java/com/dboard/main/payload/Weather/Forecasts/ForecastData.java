package com.dboard.main.payload.Weather.Forecasts;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ForecastData {

    @JsonProperty("weather")
    private WeatherData weatherData;

    @JsonProperty("temp")
    private double averageTemperature;
}
