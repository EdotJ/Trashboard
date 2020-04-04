import React from "react";
import { DummyBox } from "./DummyBox";

const types = { DummyBox };

export const WidgetResolver = ({ type, id, props }) => {
  const InnerComponent = types[type];
  return (
    <InnerComponent
      {...props}
    />
  );
};
