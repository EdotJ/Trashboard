package com.dboard.main.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class NoteRequest {

    @Size(
            max = 140,
            message = "{note.title.size}"
    )
    private String title;

    private String body;

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
}
