import React, { useState, useEffect } from "react";
import { BaseCard } from "./BaseCard";

export const Clock = ({ id }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  const tick = () => {
    setDate(new Date());
  };

  return (
    <BaseCard id={id}>
      <div className="clock-container">
        <div className="clock-date">
          {date.getFullYear()}-
          {(date.getMonth() + 1).toString().padStart(2, "0")}-
          {date.getDate().toString().padStart(2, "0")}
        </div>
        <div className="clock-time">
          {date.getHours().toString().padStart(2, "0")}:
          {date.getMinutes().toString().padStart(2, "0")}
        </div>
      </div>
    </BaseCard>
  );
};
