import { widgetsConstants } from "../constants";
import { v4 as uuidv4 } from "uuid";

export const widgetsActions = {
  add,
  update,
  remove,
  removeAll,
};

function add(props, widgetType) {
  return {
    type: widgetsConstants.ADD,
    props,
    widgetType,
    id: uuidv4()
  };
}

function update(props, id) {
  return {
    type: widgetsConstants.UPDATE,
    props,
    id
  }
}

function remove(id) {
  return {
    type: widgetsConstants.REMOVE,
    id
  };
}

function removeAll() {
  return {
    type: widgetsConstants.REMOVE_ALL
  };
}
