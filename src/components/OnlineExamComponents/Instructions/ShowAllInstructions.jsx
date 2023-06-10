import React from "react";
import Instructions from "./Instructions";
import MoreInstructions from "./MoreInstructions";

import classes from './ShowAllInstructions.module.css'

const ShowAllInstructions = ({onCloseHandler}) => {
  return (
    <>
      <div className={classes.overlay} onClick={onCloseHandler}></div>
      <div className={classes.container}>
        <div className={classes.close} onClick={onCloseHandler}><button>X</button></div>
        <Instructions />
        <MoreInstructions />
      </div>
    </>
  );
};

export default ShowAllInstructions;
