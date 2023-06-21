import React from "react";

import Result from "../ResultPage/ResultComponent";

import classes from "./ViewResultContent.module.css";

const ViewResultContent = (props) => {
  let content;
  if (props.clicked.isScoreCard) {
    content = (
      <>
        <table className={classes.scoreCard}>
          <tbody>
            <tr>
              <th colSpan={2}>Score Card</th>
            </tr>
            <tr>
              <th>Total No. Of Questions</th>
              <td>200</td>
            </tr>
            <tr>
              <th>Total Marks</th>
              <td>200</td>
            </tr>
            <tr>
              <th>Total Duration</th>
              <td>180 minutes</td>
            </tr>
            <tr>
              <th>Total Marks Scored</th>
              <td>200/200</td>
            </tr>
            <tr>
              <th>Time Taken to complete Test</th>
              <td>3/3</td>
            </tr>
            <tr>
              <th>Your Rank</th>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else if (props.clicked.isResult) {
    content = (
      <>
        <div className={classes.result}>
          <Result classes={classes} />
        </div>
      </>
    );
  } else if (props.clicked.isPaper) {
    content = <p>Question Paper</p>;
  } else if (props.clicked.isReport) {
    content = <p>Report</p>;
  } else {
    content = <p>Please watch explanation videos in YesWeCan App.</p>;
  }

  return (
    <>
      {content}
      <div className={classes.emptyHeight}></div>
    </>
  );
};

export default ViewResultContent;
