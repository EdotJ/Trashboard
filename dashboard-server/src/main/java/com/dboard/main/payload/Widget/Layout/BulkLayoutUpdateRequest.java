package com.dboard.main.payload.Widget.Layout;

import java.util.List;

public class BulkLayoutUpdateRequest {

    private List<LayoutRequest> updatableElements;

    public List<LayoutRequest> getUpdatableElements() {
        return updatableElements;
    }

    public void setUpdatableElements(List<LayoutRequest> updatableElements) {
        this.updatableElements = updatableElements;
    }
}
