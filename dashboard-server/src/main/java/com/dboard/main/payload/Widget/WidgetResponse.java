package com.dboard.main.payload.Widget;

import com.dboard.main.model.Widget;
import com.dboard.main.payload.User.UserSummary;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

public class WidgetResponse {
    private Long userId;
    private UserSummary createdBy;
    private List<Widget> widgetList;
    private Long nextId;

    @JsonIgnore
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @JsonIgnore
    public UserSummary getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserSummary createdBy) {
        this.createdBy = createdBy;
    }

    public List<Widget> getWidgetList() {
        return widgetList;
    }

    public void setWidgetList(List<Widget> widgetList) {
        this.widgetList = widgetList;
    }

    public Long getNextId() {
        return nextId;
    }

    public void setNextId(Long nextId) {
        this.nextId = nextId;
    }
}
