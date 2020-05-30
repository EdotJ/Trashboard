package com.dboard.main.utils;

import com.dboard.main.model.*;
import com.dboard.main.payload.Note.NoteResponse;
import com.dboard.main.payload.Todo.TodoResponse;
import com.dboard.main.payload.User.UserSummary;
import com.dboard.main.payload.Widget.Layout.LayoutResponse;
import com.dboard.main.payload.Widget.WidgetResponse;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class ModelMapper {
    public static WidgetResponse mapWidgetToWidgetResponse(List<Widget> widgets, User creator) {
        WidgetResponse response = new WidgetResponse();
        response.setUserId(creator.getId());
        UserSummary summary = new UserSummary(creator.getId(), creator.getUsername());
        response.setCreatedBy(summary);
        response.setWidgetList(widgets);
        Optional<Widget> maxIdElement = widgets.stream().max(Comparator.comparing(Widget::getClientId));

        response.setNextId(maxIdElement.map(widget -> widget.getClientId() + 1).orElse(100L));

        return response;
    }

    public static LayoutResponse mapLayoutToLayoutResponse(Map<String, List<LayoutElement>> layoutMap, User creator) {
        LayoutResponse response = new LayoutResponse();
        response.setUserId(creator.getId());
        UserSummary summary = new UserSummary(creator.getId(), creator.getUsername());
        response.setCreatedBy(summary);
        response.setBreakpoints(layoutMap);
        return response;
    }

    public static TodoResponse mapTodosToTodoResponse(Map<Long, List<Todo>> todos, Long nextId) {
        TodoResponse response = new TodoResponse();
        response.setTodos(todos);
        response.setNextId(nextId);

        return response;
    }

    public static NoteResponse mapNotesToNoteResponse(List<Note> notes) {
        NoteResponse response = new NoteResponse();
        response.setNotes(notes);
        return response;
    }
}
