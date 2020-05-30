import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  widgetLayoutActions,
  widgetsActions,
  notesActions,
  rssActions,
} from "../../actions";
import {
  constructMobileWidget,
  constructDesktopWidget,
} from "../../utils/layoutUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faClock,
  faStickyNote,
  faCloud,
  faCloudShowersHeavy,
  faRssSquare,
} from "@fortawesome/free-solid-svg-icons";

const typeToIcon = {
  TodoList: faCheckSquare,
  Clock: faClock,
  Notes: faStickyNote,
  WeatherReports: faCloud,
  WeatherAlert: faCloudShowersHeavy,
  RssFeed: faRssSquare,
};

export const DrawerItem = ({
  defaultSize,
  widgetType,
  widgetName,
  defaultProps,
}) => {
  const widgetState = useSelector((state) => state.widgets);
  const widgetLayoutState = useSelector((state) => state.widgetLayout);
  const isExpanded = useSelector((state) => state.appState.isDrawerExpanded);
  const dispatch = useDispatch();
  const NOTES_TYPE = "Notes";
  const RSS_TYPE = "RssFeed";

  const handleClick = (e) => {
    e.stopPropagation();
    e.persist();
    e.nativeEvent.stopImmediatePropagation();
    if (
      localStorage.getItem("widgetLayout") &&
      JSON.parse(localStorage.getItem("widgetLayout")).desk.length > 0
    ) {
      dispatch(
        widgetLayoutActions.update(
          JSON.parse(localStorage.getItem("widgetLayout"))
        )
      );
    }
    dispatch(
      widgetsActions.addToState({
        props: defaultProps ? defaultProps : {},
        type: widgetType,
      })
    );
    const desktopLayout = constructDesktopWidget(widgetLayoutState.desk, {
      id: widgetState.nextId.toString(),
      size: defaultSize,
    });
    const mobileLayout = constructMobileWidget(widgetLayoutState.mob, {
      id: widgetState.nextId.toString(),
      size: defaultSize,
    });
    // TODO: refactor out to one action
    dispatch(
      widgetsActions.saveToServer(
        widgetState.nextId,
        defaultProps ? defaultProps : {},
        widgetType,
        { desk: desktopLayout, mob: mobileLayout }
      )
    );
    if (widgetType === NOTES_TYPE) {
      dispatch(notesActions.add(widgetState.nextId));
    }
    if (widgetType === RSS_TYPE) {
      dispatch(rssActions.addRssFeed(widgetState.nextId));
    }
    dispatch(
      widgetLayoutActions.add({
        id: widgetState.nextId.toString(),
        desk: desktopLayout,
        mob: mobileLayout,
      })
    );
  };

  return (
    <div className="drawer-item" onClickCapture={(e) => handleClick(e)}>
      <FontAwesomeIcon
        className="drawer-item-icon"
        icon={typeToIcon[widgetType]}
        size="3x"
      />
      {
        <div
          className={`drawer-item-text ${isExpanded ? "fade-in" : "fade-out"}`}
        >
          {widgetName}
        </div>
      }
    </div>
  );
};
