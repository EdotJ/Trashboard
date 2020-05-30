package com.dboard.main.payload.Note;

import com.dboard.main.model.Note;
import com.dboard.main.payload.ApiResponse;

import java.time.Instant;

public class SingleNoteResponse extends ApiResponse {
    private Long id;
    private String title;
    private String body;
    private Instant creationDateTime;

    public SingleNoteResponse(Boolean success, String message, Note note) {
        super(success, message);
        this.id = note.getId();
        this.title = note.getTitle();
        this.body = note.getBody();
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

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Instant getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = creationDateTime;
    }
}
