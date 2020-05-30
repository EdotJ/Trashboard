package com.dboard.main.controller;

import com.dboard.main.payload.Weather.Alerts.WeatherData;
import com.dboard.main.payload.Weather.Forecasts.Response;
import com.dboard.main.security.JwtTokenProvider;
import com.dboard.main.service.WeatherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/weather")
@CrossOrigin(origins = "http://localhost")
public class WeatherController {
    private static final Logger logger =
            LoggerFactory.getLogger(WeatherController.class);

    final JwtTokenProvider tokenProvider;

    final WeatherService weatherService;

    public WeatherController(JwtTokenProvider tokenProvider,
                             WeatherService service) {
        this.tokenProvider = tokenProvider;
        this.weatherService = service;
    }

    @GetMapping("alerts")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getWeatherAlerts() {
        WeatherData data = weatherService.getWeatherAlertsData();
        return data != null
                ? ResponseEntity.ok(data)
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("forecasts")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getWeatherForecasts() {
        Response data = weatherService.getWeatherForecastData();
        return data != null
                ? ResponseEntity.ok(data)
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
