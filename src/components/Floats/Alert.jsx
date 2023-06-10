import React, {useEffect} from "react";
import ReactDom from "react-dom";
import classes from "./Alert.module.css";

import { FullScreen, useFullScreenHandle } from "react-full-screen";


const Alert = ({ isAlert, closeHandler, address}) => {
  if (!isAlert[0]) return null;

  return ReactDom.createPortal(
    <>
      <div className={classes.overlay} onClick={closeHandler}></div>
      <div className={classes.modal}>
        <div className={classes.title}>{isAlert[1].title}</div>
        <div className={classes.body}>{isAlert[1].content}</div>
        <div className={classes.footer}>
          <button onClick={closeHandler}>{isAlert[1].closeContent}</button>
        </div>
      </div>
    </>,
    document.getElementsByClassName(address)[0]
  );
};

export default Alert;
