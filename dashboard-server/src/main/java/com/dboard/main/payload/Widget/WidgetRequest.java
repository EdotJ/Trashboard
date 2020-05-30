package com.dboard.main.payload.Widget;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class WidgetRequest {
    @NotBlank
    private String type;

    @NotBlank
    private String props;

    @NotNull
    private Long clientId;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProps() {
        return props;
    }

    public void setProps(String props) {
        this.props = props;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }
}
