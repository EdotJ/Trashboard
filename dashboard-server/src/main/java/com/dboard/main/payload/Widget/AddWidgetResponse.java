package com.dboard.main.payload.Widget;

import com.dboard.main.model.Widget;
import com.dboard.main.payload.ApiResponse;

public class AddWidgetResponse extends ApiResponse {
    private Widget widget;

    public AddWidgetResponse(Boolean success, String message, Widget widget) {
        super(success, message);
        this.widget = widget;
    }

    public Widget getWidget() {
        return widget;
    }

    public void setWidget(Widget widget) {
        this.widget = widget;
    }
}
