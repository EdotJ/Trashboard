package com.dboard.main.service;

import com.dboard.main.model.LayoutElement;
import com.dboard.main.model.Todo;
import com.dboard.main.model.Widget;
import com.dboard.main.payload.BadRequestException;
import com.dboard.main.payload.Todo.TodoRequest;
import com.dboard.main.payload.Todo.TodoResponse;
import com.dboard.main.repository.TodoRepository;
import com.dboard.main.repository.UserRepository;
import com.dboard.main.repository.WidgetRepository;
import com.dboard.main.security.UserPrincipal;
import com.dboard.main.utils.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TodoService {
    TodoRepository todoRepository;
    UserRepository userRepository;
    WidgetRepository widgetRepository;

    public TodoService(TodoRepository todoRepository, UserRepository userRepository, WidgetRepository widgetRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
        this.widgetRepository = widgetRepository;
    }

    private static final Logger logger = LoggerFactory.getLogger(TodoService.class);

    public TodoResponse getAllCreatedBy(UserPrincipal currentUser) {
        logger.info("Accessing Todos created by " + currentUser.getUsername());
        List<Todo> todos = todoRepository.findByCreatedBy(currentUser.getId());
        Map<Long, List<Todo>> todosByWidget = todos.stream()
                .collect(Collectors.groupingBy(e -> e.getWidget().getClientId()));

        Optional<Todo> maxIdElement = todos.stream().max(Comparator.comparing(Todo::getWebKey));
        Long nextId = (maxIdElement.map(todo -> todo.getWebKey() + 1).orElse(100L));

        return ModelMapper.mapTodosToTodoResponse(todosByWidget, nextId);
    }

    public Todo create(TodoRequest request, UserPrincipal currentUser) {
        Todo todo = new Todo();
        todo.setChecked(request.isChecked());
        todo.setTitle(request.getTitle());
        todo.setWebKey(request.getWebKey());
        Optional<Widget> optWidget = widgetRepository.findByCreatedByAndAndClientId(
                currentUser.getId(),
                request.getWidgetId()
        );
        if (!optWidget.isPresent()) {
            throw new BadRequestException("Could not find todo with id: " + request.getWidgetId());
        }
        Widget widget = optWidget.get();
        if (!widget.getType().equals("TodoList")) {
            throw new BadRequestException("Widget has the wrong type: " + request.getWidgetId() + ": " + widget.getType());
        }
        todo.setWidget(widget);
        return todoRepository.save(todo);
    }

    public Todo update(TodoRequest request, UserPrincipal user) {
        Optional<Todo> optTodo = todoRepository.findByWebKeyAndCreatedBy(request.getWebKey(), user.getId());
        if (!optTodo.isPresent()) {
            throw new BadRequestException("Could not find todo with id: " + request.getWebKey());
        }
        Todo todo = optTodo.get();
        todo.setChecked(request.isChecked());
        todo.setTitle(request.getTitle());
        return todoRepository.save(todo);
    }
}
