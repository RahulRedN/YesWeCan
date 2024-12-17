import React, { useState } from "react";
import classes from "./ViewResult.module.css";
import styles from "../AppComponents/ViewResultContent.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

const ViewResultType = () => {
  const nav = useNavigate();
  const [searchParams, setParams] = useSearchParams();
  const selected = searchParams.get("selected");
  const test = searchParams.get("test");

  const resultData = useSelector((state) => state.user.myCourses).find(
    (course) => course.courseId == "kUvMeETRUBmlKMAO0BXt"
  ).status[`${selected}_${test}`];

  const [clicked, setClicked] = useState({
    isResult: true,
  });

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <span>Results of Typing Test</span>{" "}
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
                  setClicked({ isResult: true });
                }}
                className={clicked.isResult ? classes.isActive : ""}
              >
                Result
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
          <table className={styles.scoreCard}>
            <tbody>
              <tr>
                <th colSpan={2}>Typing Test Results (BEST RESULT **)</th>
              </tr>
              <tr>
                <th>Words Per Minute (WPM)</th>
                <td>{resultData?.result?.wpm}</td>
              </tr>
              <tr>
                <th>Raw Words Per Minute</th>
                <td>{resultData?.result?.rawWPM}</td>
              </tr>
              <tr>
                <th>Accuracy</th>
                <td>{resultData?.result?.accuracy}%</td>
              </tr>
              <tr>
                <th>Total Errors</th>
                <td>{resultData?.result?.fullErrors}</td>
              </tr>
              <tr>
                <th>Half Errors</th>
                <td>{resultData?.result?.halfErrors}</td>
              </tr>
              <tr>
                <th>Error Rate</th>
                <td>{resultData?.result?.errorRate}%</td>
              </tr>
              <tr>
                <th>Total Keystrokes</th>
                <td>{resultData?.result?.totalKeystrokes}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.emptyHeight}></div>
        </div>
      </div>
    </>
  );
};

export default ViewResultType;
