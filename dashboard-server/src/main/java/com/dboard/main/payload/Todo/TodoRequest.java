package com.dboard.main.payload.Todo;

import javax.validation.constraints.Size;

public class TodoRequest {

    @Size(max = 140, message = "{todo.size}")
    private String title;

    private boolean checked;

    private Long widgetId;

    private Long webKey;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public Long getWidgetId() {
        return widgetId;
    }

    public void setWidgetId(Long widgetId) {
        this.widgetId = widgetId;
    }

    public Long getWebKey() {
        return webKey;
    }

    public void setWebKey(Long webKey) {
        this.webKey = webKey;
    }
}
