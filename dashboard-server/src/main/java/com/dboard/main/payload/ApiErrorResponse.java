package com.dboard.main.payload;

import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;

public class ApiErrorResponse {
    private Date timestamp;

    private HttpStatus status;

    private List<ApiError> errors;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public List<ApiError> getErrors() {
        return errors;
    }

    public void setErrors(List<ApiError> errors) {
        this.errors = errors;
    }
}
