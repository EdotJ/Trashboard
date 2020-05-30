package com.dboard.main.payload.Note;

import com.dboard.main.model.Note;

import java.time.Instant;
import java.util.List;

public class NoteResponse {
    private List<Note> notes;

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }
}
