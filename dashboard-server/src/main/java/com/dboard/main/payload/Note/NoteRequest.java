package com.dboard.main.payload.Note;

import com.fasterxml.jackson.annotation.JsonAlias;

import javax.validation.constraints.Size;

public class NoteRequest {

    @Size(
            max = 140,
            message = "{note.title.size}"
    )
    private String title;

    private String body;

    private Long widgetId;

    private Long serverId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getWidgetId() {
        return widgetId;
    }

    @JsonAlias({"widgetId", "clientId"})
    public void setWidgetId(Long widgetId) {
        this.widgetId = widgetId;
    }

    public Long getServerId() {
        return serverId;
    }

    public void setServerId(Long serverId) {
        this.serverId = serverId;
    }
}
