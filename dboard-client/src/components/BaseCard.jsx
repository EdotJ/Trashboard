import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  widgetsActions,
  widgetLayoutActions,
  notesActions,
  todosActions,
  rssActions,
  userActions,
} from "../actions";

export const BaseCard = ({ children, className, dragByTitle, id }) => {
  const dispatch = useDispatch();

  const handleRemovalClick = () => {
    dispatch(userActions.save());
    dispatch(widgetsActions.remove(id));
    dispatch(widgetLayoutActions.remove(id));
    dispatch(notesActions.removeWidget(id));
    dispatch(todosActions.removeWidget(id));
    dispatch(rssActions.removeWidget(id));
  };

  return (
    <div
      className={`${className ? className : "drag-div"} ${
        dragByTitle ? "" : "draggable-div"
      } base-card`}
    >
      <div className="removal-container">
        <FontAwesomeIcon
          className="removal-icon"
          icon={faTrash}
          onClick={handleRemovalClick}
        />
      </div>
      {children}
    </div>
  );
};
