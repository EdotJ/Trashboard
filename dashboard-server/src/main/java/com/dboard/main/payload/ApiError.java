package com.dboard.main.payload;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ApiError {

    @JsonProperty("field_name")
    private String fieldName;

    private String message;


    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
