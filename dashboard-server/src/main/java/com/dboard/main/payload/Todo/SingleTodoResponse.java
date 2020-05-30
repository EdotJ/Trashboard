package com.dboard.main.payload.Todo;

import com.dboard.main.model.Todo;
import com.dboard.main.payload.ApiResponse;

public class SingleTodoResponse extends ApiResponse {
    private Long id;
    private String title;
    private Boolean isChecked;

    public SingleTodoResponse(Boolean success, String message, Todo todo) {
        super(success, message);
        this.title = todo.getTitle();
        this.isChecked = todo.isChecked();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getChecked() {
        return isChecked;
    }

    public void setChecked(Boolean checked) {
        isChecked = checked;
    }
}
