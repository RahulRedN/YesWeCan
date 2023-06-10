import {useState, useEffect} from 'react'

const Timer = ({ timer}) => {
  const { hour, minute, second } = timer;

  return <span>{`${hour}:${minute}:${second}`}</span>;
}

export default Timer