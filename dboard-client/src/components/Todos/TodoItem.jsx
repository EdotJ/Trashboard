import React, { useRef } from "react";
import { Checkbox } from "antd";
import ContentEditable from "react-contenteditable";
import { useDispatch } from "react-redux";
import { todosActions } from "../../actions";
import { todosService } from "../../services";

export const TodoItem = ({ isChecked, text, widgetId, id }) => {
  const dispatch = useDispatch();
  const textVal = useRef(text && text.length > 0 ? text : "");

  const handleCheckmark = () => {
    dispatch(todosActions.check(widgetId, id));
    todosService.updateTodo({
      id,
      widgetId,
      text: textVal.current,
      isChecked: !isChecked,
    });
  };

  const handleChange = (e) => {
    textVal.current = e.target.value;
  };

  function updateTodoText() {
    dispatch(todosActions.updateText(widgetId, id, textVal.current));
    todosService.updateTodo({
      id,
      widgetId,
      text: textVal.current,
      isChecked: isChecked,
    });
  }

  return (
    <div className="todo-item">
      <Checkbox checked={isChecked} onChange={handleCheckmark} />
      <ContentEditable
        html={text}
        disabled={isChecked}
        className={`todo-input ${isChecked ? "checked" : ""}`}
        onBlur={updateTodoText}
        onChange={handleChange}
      />
    </div>
  );
};
