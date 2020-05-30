import React from "react";
import { BaseCard } from "../BaseCard";
import { TodoItem } from "./TodoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { todosActions } from "../../actions";
import { todosService } from "../../services";

export const TodoList = ({ id }) => {
  const todoList = useSelector((state) => state.todos.todos[id]);
  const todoState = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const addEmptyTodo = () => {
    dispatch(todosActions.add(id));
    todosService.addTodo(todoState.nextId, id);
  };

  return (
    <BaseCard dragByTitle={true} className="todo-base" id={id}>
      <div className="todo-title draggable-div">
        <div className="card-title">To-dos</div>
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="todo-add-icon"
          onClick={addEmptyTodo}
        />
      </div>
      <div className="todo-list-items">
        {todoList &&
          todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              text={todo.text}
              isChecked={todo.isChecked}
              widgetId={id}
              id={todo.id}
            ></TodoItem>
          ))}
      </div>
    </BaseCard>
  );
};
