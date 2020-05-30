package com.dboard.main.service;

import com.dboard.main.model.Note;
import com.dboard.main.model.Widget;
import com.dboard.main.payload.BadRequestException;
import com.dboard.main.payload.Note.NoteRequest;
import com.dboard.main.payload.Note.NoteResponse;
import com.dboard.main.repository.NoteRepository;
import com.dboard.main.repository.UserRepository;
import com.dboard.main.repository.WidgetRepository;
import com.dboard.main.security.UserPrincipal;
import com.dboard.main.utils.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
    NoteRepository noteRepository;
    UserRepository userRepository;
    WidgetRepository widgetRepository;

    public NoteService(NoteRepository noteRepository, UserRepository userRepository, WidgetRepository widgetRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.widgetRepository = widgetRepository;
    }

    private static final Logger logger = LoggerFactory.getLogger(TodoService.class);

    public NoteResponse getAllCreatedBy(UserPrincipal currentUser) {
        logger.info("Accessing Notes created by " + currentUser.getUsername());
        List<Note> notes = noteRepository.findByCreatedBy(currentUser.getId());
        return ModelMapper.mapNotesToNoteResponse(notes);
    }

    public Note create(NoteRequest request, UserPrincipal currentUser) {
        Note note = new Note();
        note.setTitle("");
        note.setBody("");
        note.setWebKey(request.getWidgetId());
        Optional<Widget> optWidget = widgetRepository.findByCreatedByAndAndClientId(currentUser.getId(), request.getWidgetId());
        if (!optWidget.isPresent()) {
            throw new BadRequestException("Could not find widget with id " + request.getWidgetId());
        }
        Widget widget = optWidget.get();
        if (!widget.getType().equals("Notes")) {
            throw new BadRequestException("Widget has the wrong type: " + request.getWidgetId() + ": " + widget.getType());
        }
        note.setWidget(widget);
        return noteRepository.save(note);
    }

    public Note update(NoteRequest request, UserPrincipal currentUser) {
        Optional<Note> optNote = request.getServerId() != null
                ? noteRepository.findById(request.getServerId())
                : noteRepository.findByCreatedByAndWebKey(currentUser.getId(), request.getWidgetId());
        if (!optNote.isPresent()) {
            throw new BadRequestException("Could not find widget with id " + request.getWidgetId());
        }
        Note note = optNote.get();
        note.setTitle(request.getTitle());
        note.setBody(request.getBody());
        return noteRepository.save(note);
    }
}
