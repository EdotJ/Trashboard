package com.dboard.main.controller;

import com.dboard.main.model.Note;
import com.dboard.main.payload.Note.NoteRequest;
import com.dboard.main.payload.Note.SingleNoteResponse;
import com.dboard.main.payload.Widget.AddWidgetResponse;
import com.dboard.main.repository.NoteRepository;
import com.dboard.main.security.CurrentUser;
import com.dboard.main.security.UserPrincipal;
import com.dboard.main.service.NoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/notes")
@PreAuthorize("hasRole('USER')")
public class NoteController {

    private final NoteRepository noteRepo;

    private NoteService noteService;

    private static final Logger logger = LoggerFactory.getLogger(NoteController.class);

    public NoteController(NoteRepository repository, NoteService service) {
        this.noteRepo = repository;
        this.noteService = service;
    }

    @PostMapping
    public ResponseEntity<?> createNote(@Valid @RequestBody NoteRequest request, @CurrentUser UserPrincipal currentUser) {
        Note note = noteService.create(request, currentUser);
        logger.info("Created note: " + note);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{widgetId}")
                .buildAndExpand(note.getId()).toUri();
        return ResponseEntity.created(location).body(new SingleNoteResponse(true, "Successfully created note", note));
    }

    @PutMapping
    public ResponseEntity<?> updateNote(@Valid @RequestBody NoteRequest request, @CurrentUser UserPrincipal currentUser) {
        Note note = noteService.update(request, currentUser);
        return ResponseEntity.ok(new SingleNoteResponse(true, "Successfully updated note", note));
    }

}
