import { notesConstants } from "../constants";
import { notesService } from "../services";
const update = (note) => {
  notesService.updateNote(note);
  return { type: notesConstants.UPDATE, id: note.id, note };
};

const add = (id) => {
  return { type: notesConstants.ADD, id };
};

const removeWidget = (id) => {
  return { type: notesConstants.REMOVE_WIDGET, id };
};

const updateState = (payload) => {
  return { type: notesConstants.UPDATE_STATE, payload };
};

export const notesActions = {
  update,
  add,
  removeWidget,
  updateState,
};
