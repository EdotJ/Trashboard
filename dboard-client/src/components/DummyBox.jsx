import React from "react";

export const DummyBox = ({x, y, w, h}) => {
  console.log(x, y, w, h);
  return (
    <div className="drag-div" key="Potato" data-grid={{ x: x, y: y, w: w, h: h }}>I am a dummy dumb dumb</div>
  )
};

