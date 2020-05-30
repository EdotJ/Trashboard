package com.dboard.main.payload.Weather.Forecasts;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Response {

    @JsonProperty("data")
    private List<ForecastData> forecastDataList;
}
