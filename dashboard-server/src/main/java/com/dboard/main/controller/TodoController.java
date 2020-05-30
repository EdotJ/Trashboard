package com.dboard.main.controller;

import com.dboard.main.model.Todo;
import com.dboard.main.payload.Todo.SingleTodoResponse;
import com.dboard.main.payload.Todo.TodoRequest;
import com.dboard.main.repository.TodoRepository;
import com.dboard.main.security.CurrentUser;
import com.dboard.main.security.UserPrincipal;
import com.dboard.main.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private TodoRepository todoRepository;

    private TodoService todoService;

    private static final Logger logger = LoggerFactory.getLogger(TodoController.class);

    public TodoController(TodoRepository todoRepository, TodoService todoService) {
        this.todoRepository = todoRepository;
        this.todoService = todoService;
    }

    @PostMapping
    public ResponseEntity<?> createTodo(@Valid @RequestBody TodoRequest request, @CurrentUser UserPrincipal user) {
        Todo todo = todoService.create(request, user);
        logger.info("Created todo: " + todo.getTitle() + " " + todo.getWebKey());
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{todoId}")
                .buildAndExpand(todo.getId()).toUri();
        return ResponseEntity.created(location).body(new SingleTodoResponse(true, "Successfully created todo", todo));
    }

    @PutMapping
    public ResponseEntity<?> updateTodo(@Valid @RequestBody TodoRequest request, @CurrentUser UserPrincipal user) {
        Todo todo = todoService.update(request, user);
        logger.info("Updated todo: " + todo.getTitle() + " " + todo.getWebKey() + " by user " + user.getUsername());
        return ResponseEntity.ok(new SingleTodoResponse(true, "Succesfully updated todo", todo));
    }


}
