package com.dboard.main.payload.Weather.Alerts;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WeatherDescription {

  @JsonProperty("id") private String id;

  @JsonProperty("main") private String outcome;

  @JsonProperty("description") private String description;
}
