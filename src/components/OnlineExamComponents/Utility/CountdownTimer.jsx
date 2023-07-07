import React, { useEffect, useState } from "react";

const CountdownTimer = ({
  isRunning,
  countdown,
  dispatchCountdown,
  dispatchTimer,
  timeStateHandler,
}) => {
  const { hour, minute, second } = countdown;

  useEffect(() => {
    if (hour == 0 && minute == 0 && second == 0) {
      timeStateHandler();
      return;
    }
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatchCountdown({ type: "RunCountdown" });
        dispatchTimer({ type: "RunTimer" });
      }, 1000);
    } else {
      alert("Lamao");
    }
    return () => {
      clearInterval(interval);
    };
  }, [second, minute, hour]);

  return (
    <span>{` ${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}:${String(second).padStart(2, "0")}`}</span>
  );
};

export default CountdownTimer;
