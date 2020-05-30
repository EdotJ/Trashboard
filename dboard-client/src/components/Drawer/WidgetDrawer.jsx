import React from "react";
import { DrawerItem } from "./DrawerItem";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "../../actions";

export const WidgetDrawer = () => {
  const isExpanded = useSelector((state) => state.appState.isDrawerExpanded);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(appStateActions.toggleExpansion());
  };

  return (
    <div
      className={`widget-drawer ${isExpanded && "widget-drawer-expanded"}`}
      onClick={toggleDrawer}
    >
      <DrawerItem
        defaultSize={{ w: 2, h: 2, minW: 2, minH: 2 }}
        widgetType="TodoList"
        widgetName="To-do list"
      />
      <DrawerItem
        defaultSize={{ w: 2, h: 1, minW: 2, minH: 1 }}
        widgetType="Clock"
        widgetName="Clock"
      />
      <DrawerItem
        defaultSize={{ w: 2, h: 2, minW: 2, minH: 2 }}
        widgetType="Notes"
        widgetName="Notes"
      />
      <DrawerItem
        defaultSize={{ w: 3, h: 2, minW: 3, minH: 1 }}
        widgetType="WeatherReports"
        widgetName="Weather reports"
      />
      <DrawerItem
        defaultSize={{ w: 2, h: 1, minW: 2, minH: 1 }}
        widgetType="WeatherAlert"
        widgetName="Precipitation alerts"
      />
      <DrawerItem
        defaultSize={{ w: 4, h: 2, minW: 3, minH: 2 }}
        defaultProps={{ url: "" }}
        widgetType="RssFeed"
        widgetName="RSS feeds"
      />
    </div>
  );
};
