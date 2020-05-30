import { widgetLayoutConstants } from "../constants";

export const widgetLayoutActions = {
  update,
  clear,
  add,
  remove,
  updateState,
};

function update(layouts) {
  return {
    type: widgetLayoutConstants.UPDATE,
    layouts,
  };
}

function clear() {
  return {
    type: widgetLayoutConstants.CLEAR,
  };
}

function add(payload) {
  return {
    type: widgetLayoutConstants.ADD,
    payload,
  };
}

function remove(id) {
  return {
    type: widgetLayoutConstants.REMOVE,
    id,
  };
}

function updateState(payload) {
  return {
    type: widgetLayoutConstants.UPDATE_STATE,
    payload,
  };
}
