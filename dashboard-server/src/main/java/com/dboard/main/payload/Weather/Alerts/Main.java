package com.dboard.main.payload.Weather.Alerts;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Main {

  @JsonProperty("temp") private double temperature;

  @JsonProperty("feels_like") private double feelsLike;
}
