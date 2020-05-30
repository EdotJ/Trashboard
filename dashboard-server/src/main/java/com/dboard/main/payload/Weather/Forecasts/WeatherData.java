package com.dboard.main.payload.Weather.Forecasts;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WeatherData {

    @JsonProperty("code")
    private String code;

    @JsonProperty("description")
    private String description;
}
