import React, { useState } from "react";
import TableData from "../AppComponents/TableData";
import classes from "./Dashboard.module.css";

const Dashboard = (props) => {
  const testDetails = [
    { testTitle: "Test 1", scored: 21, total: 33, rank: 3 },
    { testTitle: "Test 2", scored: 21, total: 33, rank: 5 },
    { testTitle: "Test 3", scored: 21, total: 33, rank: 7 },
  ];
  const MyCourses = props.myCourses;
  const [isClicked, setIsClicked] = useState({
    isMycourse: true,
    isRecent: false,
    isInstruction: false,
  });
  const init = { isMycourse: false, isRecent: false, isInstruction: false };
  const myCourseClickHandler = () => {
    setIsClicked(() => {
      let value = init;
      value.isMycourse = true;
      return value;
    });
  };
  const recentClickHandler = () => {
    setIsClicked(() => {
      let value = init;
      value.isRecent = true;
      return value;
    });
  };
  const instructionClickHandler = () => {
    setIsClicked(() => {
      let value = init;
      value.isInstruction = true;
      return value;
    });
  };
  let content;
  if (isClicked.isMycourse) {
    content = (
      <>
        <h3>List of Courses Purchased</h3>
        <table className={classes.coursesTable}>
          <tbody>
            <tr>
              <th>S.NO</th>
              <th>Course Name</th>
              <th>Purchased On</th>
              <th>Expires On</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
            <TableData myCourses={MyCourses} />
          </tbody>
        </table>
        <div className={classes.emptyHeight}></div>
      </>
    );
  } else if (isClicked.isRecent) {
    content = <>
      <h3>Recent tests attempted</h3>
      <table className={classes.coursesTable}>
        <tbody>
          <tr>
            <th>S.NO</th>
            <th>Test Name</th>
            <th>Marks Achieved</th>
            <th>Total Marks</th>
            <th>Rank</th>
          </tr>
          {testDetails.map((test, idx) => <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{test.testTitle}</td>
            <td>{test.scored}</td>
            <td>{test.total}</td>
            <td>{test.rank}</td>
          </tr>)}
        </tbody>
      </table>
    </>;
  } else {
    content = (
      <>
        <div className={classes.heading}>Online Exam Instructions</div>
        <div className={classes.instructions}>
          <ol>
            <li>
              It is recomended to write online exams in desktop to get familiar
              with actual exam interface.
            </li>
            <li>
              Ensure that you are using the latest version of browser installed,
              if not upgrade your browser to support latest scripts.
            </li>
            <li>
              Don't press refresh button / back button while writing online
              exams
            </li>
            <li>
              While writing Online Exams note that,
              <span>
                if you are idle for 10 Minutes your exam will be submitted
                automatically.
              </span>
              So Aspirants are advised to change question atleast for every 5
              minutes.
            </li>
            {/* <li>Previous Online Exam written data will not be available.</li> */}
          </ol>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>Dashboard</div>
        <div className={classes.nav}>
          <button
            onClick={myCourseClickHandler}
            className={
              isClicked.isMycourse ? classes.isActive : classes.isNotActive
            }
          >
            My Courses
          </button>
          <button
            onClick={recentClickHandler}
            className={
              isClicked.isRecent ? classes.isActive : classes.isNotActive
            }
          >
            Recent Tests
          </button>
          <button
            onClick={instructionClickHandler}
            className={
              isClicked.isInstruction ? classes.isActive : classes.isNotActive
            }
          >
            Instructions
          </button>
        </div>
        <div className={classes.displayContent}>{content}</div>
      </div>
    </>
  );
};

export default Dashboard;
