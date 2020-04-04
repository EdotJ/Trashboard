package com.dboard.main.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class TodoRequest {

    @NotBlank(message = "{todo.notEmpty}")
    @Size(max = 140, message = "{todo.size}")
    private String title;

    private boolean checked;

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
}
