import {useState, useEffect} from 'react'

const Timer = ({ timer}) => {
  const { hour, minute, second } = timer;

  return (
    <span>{`${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}:${String(second).padStart(2, "0")}`}</span>
  );
}

export default Timer