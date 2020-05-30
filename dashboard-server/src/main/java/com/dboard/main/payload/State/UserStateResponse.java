package com.dboard.main.payload.State;

import com.dboard.main.payload.Note.NoteResponse;
import com.dboard.main.payload.Todo.TodoResponse;
import com.dboard.main.payload.Widget.Layout.LayoutResponse;
import com.dboard.main.payload.Widget.WidgetResponse;

import java.util.List;

public class UserStateResponse {
    private WidgetResponse widgets;
    private LayoutResponse layout;
    private TodoResponse todos;
    private NoteResponse notes;

    public WidgetResponse getWidgets() {
        return widgets;
    }

    public void setWidgets(WidgetResponse widgets) {
        this.widgets = widgets;
    }

    public LayoutResponse getLayout() {
        return layout;
    }

    public void setLayout(LayoutResponse layout) {
        this.layout = layout;
    }

    public TodoResponse getTodos() {
        return todos;
    }

    public void setTodos(TodoResponse todos) {
        this.todos = todos;
    }

    public NoteResponse getNotes() {
        return notes;
    }

    public void setNotes(NoteResponse notes) {
        this.notes = notes;
    }
}
