package com.dboard.main.controller;

import com.dboard.main.payload.Note.NoteResponse;
import com.dboard.main.payload.State.UserStateResponse;
import com.dboard.main.payload.Todo.TodoResponse;
import com.dboard.main.payload.Widget.Layout.LayoutResponse;
import com.dboard.main.payload.Widget.WidgetResponse;
import com.dboard.main.security.CurrentUser;
import com.dboard.main.security.UserPrincipal;
import com.dboard.main.service.NoteService;
import com.dboard.main.service.TodoService;
import com.dboard.main.service.WidgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/state")
@CrossOrigin(origins = "http://localhost")
public class UserStateController {
    WidgetService widgetService;
    NoteService noteService;
    TodoService todoService;

    public UserStateController(WidgetService widgetService,
                               NoteService noteService, TodoService todoService) {
        this.widgetService = widgetService;
        this.noteService = noteService;
        this.todoService = todoService;
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getState(@CurrentUser UserPrincipal currentUser) {
        WidgetResponse widgetResponse =
                widgetService.getAllWidgetsCreatedBy(currentUser);
        LayoutResponse layoutResponse =
                widgetService.getAllLayoutsCreatedBy(currentUser);
        NoteResponse noteResponse = noteService.getAllCreatedBy(currentUser);
        TodoResponse todoResponse = todoService.getAllCreatedBy(currentUser);

        UserStateResponse response = new UserStateResponse();
        response.setLayout(layoutResponse);
        response.setWidgets(widgetResponse);
        response.setNotes(noteResponse);
        response.setTodos(todoResponse);
        return ResponseEntity.ok(response);
    }
}
