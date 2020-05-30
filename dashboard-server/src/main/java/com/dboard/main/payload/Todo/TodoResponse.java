package com.dboard.main.payload.Todo;

import com.dboard.main.model.Todo;

import java.util.List;
import java.util.Map;

public class TodoResponse {
    private Map<Long, List<Todo>> todos;
    private Long nextId;

    public Map<Long, List<Todo>> getTodos() {
        return todos;
    }

    public void setTodos(Map<Long, List<Todo>> todos) {
        this.todos = todos;
    }

    public Long getNextId() {
        return nextId;
    }

    public void setNextId(Long nextId) {
        this.nextId = nextId;
    }
}
