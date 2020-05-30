import React from "react";
import { BaseCard } from "./BaseCard";
import { useRef } from "react";
import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { notesActions } from "../actions/notes.actions";

export const Notes = ({ id, text, title }) => {
  const note = useSelector((state) =>
    state.notes.find((obj) => {
      return obj.id === id;
    })
  );
  const titleVal = useRef(note && note.title ? note.title : "");
  const textVal = useRef(note && note.body ? note.body : "");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    textVal.current = e.target.value;
  };

  const handleTitleChange = (e) => {
    titleVal.current = e.target.value;
  };

  const handleBlur = () => {
    dispatch(
      notesActions.update({
        id,
        body: textVal.current,
        title: titleVal.current,
        serverId: note.serverId,
      })
    );
  };

  return (
    <BaseCard dragByTitle={true} className="note-card" id={id}>
      <div className="note-title-container">
        <ContentEditable
          html={titleVal.current}
          hasplaceholder="true"
          placeholder={"Title here"}
          onKeyDown={(e) => e.keyCode === 13 && e.preventDefault()}
          className="note-card-title"
          onChange={handleTitleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="draggable-div notes-dragger">
        <FontAwesomeIcon icon={faArrowsAlt} size="lg" />
      </div>
      <ContentEditable
        html={textVal.current}
        onBlur={handleBlur}
        onChange={handleChange}
        className="note-base"
      />
    </BaseCard>
  );
};
