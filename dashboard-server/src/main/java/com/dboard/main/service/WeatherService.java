package com.dboard.main.service;

import com.dboard.main.payload.Weather.Alerts.AlertData;
import com.dboard.main.payload.Weather.Alerts.WeatherData;
import com.dboard.main.payload.Weather.Forecasts.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {
    private final Environment env;

    private final RestTemplate restTemplate;

    private static final Logger logger =
            LoggerFactory.getLogger(WeatherService.class);

    public WeatherService(RestTemplate template, Environment env) {
        this.restTemplate = template;
        this.env = env;
    }

    @Cacheable("weatherAlertsData")
    public WeatherData getWeatherAlertsData() {
        logger.info("ACCESSING WEATHER ALERTS API");
        String url = buildAlertsUrl();
        AlertData alertForecast = null;
        try {
            alertForecast = restTemplate.getForObject(url, AlertData.class);
        } catch (RestClientException e) {
            logger.error("Failed fetching alert data");
        }
        return alertForecast != null ? alertForecast.getWeatherDataList().get(2) : null;
    }

    @Cacheable("forecastData")
    public Response getWeatherForecastData() {
        logger.info("ACCESSING WEATHER FORECAST API");
        String url = buildForecastUrl();
        Response forecast = null;
        try {
            forecast = restTemplate.getForObject(url, Response.class);
        } catch (RestClientException e) {
            logger.error("Failed fetching forecast data");
        }
        return forecast;
    }

    private String buildAlertsUrl() {
        return env.getProperty("weatherAlerts.apiUrl") +
                "?q=" + env.getProperty("weatherAlerts.city") +
                "&appid=" + env.getProperty("weatherAlerts.apiAppId") +
                "&units=" + env.getProperty("weatherAlerts.units");
    }

    private String buildForecastUrl() {
        return env.getProperty("weatherForecasts.apiUrl")
                + "?key="
                + env.getProperty("weatherForecasts.apiKey")
                + env.getProperty("weatherForecasts.params");
    }
}
