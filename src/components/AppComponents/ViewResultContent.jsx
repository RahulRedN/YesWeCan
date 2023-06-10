import React from "react";
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
            <div className={classes.emptyHeight}></div>
      </>
    );
  } else if (props.clicked.isResult) {
      content = (
        <>
          <div className={classes.summary}>
            <h3>Exam Summary</h3>
            <br />
            <table className={classes.resultTable}>
              <thead>
                <tr>
                  <th>Module Name</th>
                  <th># Questions</th>
                  <th># Answered</th>
                  <th># Not Answered</th>
                  <th># Review</th>
                  <th># Mark for Review</th>
                  <th># Not Visited</th>
                  <th>Time Spent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Test</td>
                  <td>200</td>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>199</td>
                  <td>03:00:00</td>
                </tr>
                <tr>
                  <td>Total : </td>
                  <td>200</td>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>199</td>
                  <td>03:00:00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={classes.result}>
            <h3>Result</h3>
            <br />
            <table className={classes.resultTable}>
              <thead>
                <tr>
                  <th>Module Name.</th>
                  <th># Questions</th>
                  <th># Correct</th>
                  <th># Wrong</th>
                  <th>Correct Marks</th>
                  <th>Wrong Marks</th>
                  <th>Total Marks</th>
                  <th>Accuracy Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Test</td>
                  <td>200</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td>Total : </td>
                  <td>200</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={classes.keySheet}>
            <h3>Keysheet</h3>
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
  return <>{content}</>;
};

export default ViewResultContent;
