package com.dboard.main.payload.Widget.Layout;

import com.dboard.main.model.LayoutElement;
import com.dboard.main.payload.User.UserSummary;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import java.util.Map;

public class LayoutResponse {
    private Long userId;
    private UserSummary createdBy;

    private Map<String, List<LayoutElement>> breakpoints;

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

    @JsonAnyGetter
    public Map<String, List<LayoutElement>> getBreakpoints() {
        return breakpoints;
    }

    public void setBreakpoints(Map<String, List<LayoutElement>> breakpoints) {
        this.breakpoints = breakpoints;
    }
}
