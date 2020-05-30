package com.dboard.main.payload.Widget;

import javax.validation.constraints.NotNull;

public class WidgetDeleteRequest {

    @NotNull
    private Long clientId;

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }
}
