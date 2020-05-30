import { widgetsConstants } from "../constants";
import { widgetService } from "../services";

export const widgetsActions = {
  saveToServer,
  update,
  remove,
  removeAll,
  addToState,
  fetchUserWidgets,
  updateWidgetState,
};

function addToState(widget) {
  return {
    type: widgetsConstants.ADD,
    props: widget.props,
    widgetType: widget.type,
  };
}

function update(props, id) {
  widgetService.updateWidget(id, props);
  return {
    type: widgetsConstants.UPDATE,
    props,
    id,
  };
}

function remove(id) {
  widgetService.deleteWidget(id);
  return {
    type: widgetsConstants.REMOVE,
    id,
  };
}

function removeAll() {
  return {
    type: widgetsConstants.REMOVE_ALL,
  };
}

function saveToServer(id, props, widgetType, layout) {
  return widgetService.addWidget({ id, widgetType, props, layout });
}

function fetchUserWidgets() {
  widgetService.fetchWidgets();
  return {
    type: "FETCH_WIDGETS_FROM_SERVER",
  };
}

function updateWidgetState(state) {
  return { type: widgetsConstants.UPDATE_STATE, payload: state };
}
