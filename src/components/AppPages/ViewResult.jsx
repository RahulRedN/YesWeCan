import React, { useState } from "react";
import classes from "./ViewResult.module.css";
import ViewResultContent from "../AppComponents/ViewResultContent";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RxCrossCircled } from "react-icons/rx";

const ViewResult = () => {
  const nav = useNavigate();
  const [searchParams, setParams] = useSearchParams();
  const id = searchParams.get("courseId");
  const courseName = searchParams.get("courseName");

  const [clicked, setClicked] = useState({
    isResult: true,
  });

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <span>Results of {courseName}</span>{" "}
          <div
            className={classes.backButton}
            onClick={() => {
              nav(-1);
            }}
          >
            <RxCrossCircled color="white" size={30} strokeWidth={0.2} />
          </div>
        </div>
        <div className={classes.nav}>
          <ul>
            <li>
              <button
                onClick={() => {
                  setClicked({ isScoreCard: true });
                }}
                className={clicked.isScoreCard ? classes.isActive : ""}
              >
                Score Card
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setClicked({ isResult: true });
                }}
                className={clicked.isResult ? classes.isActive : ""}
              >
                Result
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setClicked({ isPaper: true });
                }}
                className={clicked.isPaper ? classes.isActive : ""}
              >
                Question Paper
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setClicked({ isTest: true });
                }}
                className={clicked.isTest ? classes.isActive : ""}
              >
                Attempted Tests
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setClicked({ isVideo: true });
                }}
                className={clicked.isVideo ? classes.isActive : ""}
              >
                Explanation Video
              </button>
            </li>
          </ul>
        </div>
        <div
          className={classes.displayContent}
          onCopy={(e) => {
            e.preventDefault();
          }}
        >
          <ViewResultContent clicked={clicked} courseId={id} />
        </div>
      </div>
    </>
  );
};

export default ViewResult;
