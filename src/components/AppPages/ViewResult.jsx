import React, { useReducer, useState } from "react";
import classes from "./ViewResult.module.css";
import ViewResultContent from "../AppComponents/ViewResultContent";

const ViewResult = () => {
  const [clicked, setClicked] = useState({
    isScoreCard: true,
    isResult: false,
    isPaper: false,
    isReport: false,
    isVideo: false,
  });
    
  const scoreClickHandler = () => {
    setClicked({
      isScoreCard: true,
      isResult: false,
      isPaper: false,
      isReport: false,
      isVideo: false,
    });
  };
  const resultClickHandler = () => {
    setClicked({
      isScoreCard: false,
      isResult: true,
      isPaper: false,
      isReport: false,
      isVideo: false,
    });
  };
  const paperClickHandler = () => {
    setClicked({
      isScoreCard: false,
      isResult: false,
      isPaper: true,
      isReport: false,
      isVideo: false,
    });
  };
  const reportClickHandler = () => {
    setClicked({
      isScoreCard: false,
      isResult: false,
      isPaper: false,
      isReport: true,
      isVideo: false,
    });
  };
  const videoClickHandler = () => {
    setClicked({
      isScoreCard: false,
      isResult: false,
      isPaper: false,
      isReport: false,
      isVideo: true,
    });
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>Results of {"Title"}</div>
        <div className={classes.nav}>
          <ul>
            <li>
              <button
                onClick={scoreClickHandler}
                className={clicked.isScoreCard ? classes.isActive : ""}
              >
                Score Card
              </button>
            </li>
            <li>
              <button
                onClick={resultClickHandler}
                className={clicked.isResult ? classes.isActive : ""}
              >
                Result
              </button>
            </li>
            <li>
              <button
                onClick={paperClickHandler}
                className={clicked.isPaper ? classes.isActive : ""}
              >
                Question Paper
              </button>
            </li>
            <li>
              <button
                onClick={reportClickHandler}
                className={clicked.isReport ? classes.isActive : ""}
              >
                Comparitive Report
              </button>
            </li>
            <li>
              <button
                onClick={videoClickHandler}
                className={clicked.isVideo ? classes.isActive : ""}
              >
                Explanation Video
              </button>
            </li>
          </ul>
        </div>
        <div className={classes.displayContent}><ViewResultContent clicked={clicked} /></div>
      </div>
    </>
  );
};

export default ViewResult;
