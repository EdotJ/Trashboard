import React from "react";
import { DummyBox } from "../DummyBox";
import { TodoList } from "../Todos/TodoList";
import { Notes } from "../Notes";
import { Clock } from "../Clock";
import { WeatherReports } from "../WeatherReports";
import { WeatherAlert } from "../WeatherAlerts";
import { RssFeed } from "../RssFeed";

const types = {
  DummyBox,
  TodoList,
  Clock,
  Notes,
  WeatherReports,
  WeatherAlert,
  RssFeed,
};

export const WidgetResolver = ({ type, props, id }) => {
  const InnerComponent = types[type];
  return <InnerComponent {...props} id={id} />;
};
