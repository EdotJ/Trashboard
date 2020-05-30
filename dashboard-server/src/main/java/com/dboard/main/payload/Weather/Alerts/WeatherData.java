package com.dboard.main.payload.Weather.Alerts;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherData {

    @JsonProperty("weather")
    private List<WeatherDescription> weatherDescriptionList;

    @JsonProperty("main")
    private Main parameters;

    @JsonProperty("dt_txt")
    private String date;

    public Main getParameters() {
        return parameters;
    }

    public void setParameters(Main parameters) {
        this.parameters = parameters;
    }

    public List<WeatherDescription> getWeatherDescriptionList() {
        return weatherDescriptionList;
    }

    public void setWeatherDescriptionList(List<WeatherDescription> weatherDescriptionList) {
        this.weatherDescriptionList = weatherDescriptionList;
    }
}
