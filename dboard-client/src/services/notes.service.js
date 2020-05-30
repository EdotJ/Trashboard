import { authHeader } from "../helpers/auth-header";
import { handleResponse } from "../utils/responseUtils";

export const notesService = {
  addNote,
  updateNote,
};

function addNote(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      clientId: id,
    }),
  };
  fetch(`${process.env.config.apiUrl}/api/notes`, requestOptions).then(
    handleResponse
  );
}

function updateNote(note) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({
      clientId: note.id,
      title: note.title,
      body: note.body,
      serverId: note.serverId ? note.serverId : null,
    }),
  };
  fetch(`${process.env.config.apiUrl}/api/notes`, requestOptions).then(
    handleResponse
  );
}
