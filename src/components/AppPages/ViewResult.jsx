import React, { useReducer, useState } from "react";
import classes from "./ViewResult.module.css";
import ViewResultContent from "../AppComponents/ViewResultContent";

const ViewResult = () => {
  const [clicked, setClicked] = useState({
    isScoreCard: true
  });

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>Results of {"Title"}</div>
        <div className={classes.nav}>
          <ul>
            <li>
              <button
                onClick={()=>{setClicked({isScoreCard:true})}}
                className={clicked.isScoreCard ? classes.isActive : ""}
              >
                Score Card
              </button>
            </li>
            <li>
              <button
                onClick={()=>{setClicked({isResult: true})}}
                className={clicked.isResult ? classes.isActive : ""}
              >
                Result
              </button>
            </li>
            <li>
              <button
                onClick={() => {setClicked({isPaper: true})}}
                className={clicked.isPaper ? classes.isActive : ""}
              >
                Question Paper
              </button>
            </li>
            <li>
              <button
                onClick={()=>{setClicked({isReport: true})}}
                className={clicked.isReport ? classes.isActive : ""}
              >
                Comparitive Report
              </button>
            </li>
            <li>
              <button
                onClick={() =>{setClicked({isVideo: true})}}
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
