package com.dboard.main.payload.Widget.Layout;

import com.dboard.main.model.LayoutElement;
import com.dboard.main.payload.ApiResponse;

import java.util.List;

public class AddLayoutResponse extends ApiResponse {
    private List<LayoutElement> layouts;

    public AddLayoutResponse(Boolean success, String message, List<LayoutElement> layouts) {
        super(success, message);
        this.layouts = layouts;
    }
}