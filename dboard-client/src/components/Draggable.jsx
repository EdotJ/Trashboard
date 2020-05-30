import React from "react";
import { Rnd } from "react-rnd";
import { useDispatch } from "react-redux";
import { widgetsActions } from "../actions";

export const Draggable = ({ children, bounds, params, id }) => {
  const dispatch = useDispatch();

  const handleDragStop = (e, d) => {
    dispatch(widgetsActions.drag({ ...params, x: d.x, y: d.y }, id));
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    dispatch(
      widgetsActions.resize(
        {
          ...params,
          height: ref.style.height,
          width: ref.style.width,
          ...position,
        },
        id
      )
    );
  };

  return (
    <Rnd
      size={{ width: params.width, height: params.height }}
      position={{ x: params.x, y: params.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      bounds={bounds}
      className="drag-div"
      resizeGrid={[10, 10]}
    >
      {children}
    </Rnd>
  );
};
