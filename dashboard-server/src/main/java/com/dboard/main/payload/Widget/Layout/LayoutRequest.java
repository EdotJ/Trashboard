package com.dboard.main.payload.Widget.Layout;

import com.fasterxml.jackson.annotation.JsonAlias;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

public class LayoutRequest {
    @NotEmpty
    private List<RequestLayoutElement> layouts;

    @NotNull
    private Long widgetId;

    public List<RequestLayoutElement> getLayouts() {
        return layouts;
    }

    public void setLayouts(List<RequestLayoutElement> layouts) {
        this.layouts = layouts;
    }

    public Long getWidgetId() {
        return widgetId;
    }
    @JsonAlias({"clientId", "widgetId"})
    public void setWidgetId(Long widgetId) {
        this.widgetId = widgetId;
    }
}
