import React, { useState, useEffect } from "react";

import TableData from "../AppComponents/TableData";

import classes from "./Dashboard.module.css";

import Ticker from "./Ticker";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const myCourses = useSelector((state) => state.user.myCourses);
  const allCourses = useSelector((state) => state.user.allCourses);

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fecth = async () => {
      try {
        const docRef = doc(collection(db), "ArIOZHmeUsA96HRmW8EH");
        const res = await getDoc(docRef);
        if (res.exists()) {
          setAlerts([...res.data().alerts]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    // fecth();
  }, []);

  const [isClicked, setIsClicked] = useState({
    isMycourse: true,
    isInstruction: false,
  });
  const init = { isMycourse: false, isInstruction: false };
  const myCourseClickHandler = () => {
    setIsClicked(() => {
      let value = init;
      value.isMycourse = true;
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
        <h3 style={{ color: "red" }}>
          Note: If you are an offline student and want to get{" "}
          <span style={{ color: "green", fontWeight: 600 }}>
            ALL IN ONE! course
          </span>
          , send your registered email with phone number to 9849388993
        </h3>
        <h3>List of Courses Purchased</h3>
        <div className={classes.tableDiv}>
          {myCourses ? (
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
                {myCourses ? (
                  <TableData myCourses={myCourses} allCourses={allCourses} />
                ) : (
                  <tr>
                    <td colSpan={6}>Empty</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            "No purchases yet! Purchase courses through Courses Page from Home Page!"
          )}
        </div>
      </>
    );
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
          </ol>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>Dashboard</div>
        {alerts?.length != 0 && (
          <Ticker texts={alerts} direction={"left"} speed={30} />
        )}
        <div className={classes.nav}>
          <button
            onClick={myCourseClickHandler}
            className={
              isClicked.isMycourse ? classes.isActive : classes.isNotActive
            }
          >
            <span>My Courses</span>
          </button>
          <button
            onClick={instructionClickHandler}
            className={
              isClicked.isInstruction ? classes.isActive : classes.isNotActive
            }
          >
            <span>Instructions</span>
          </button>
        </div>
        <div className={classes.displayContent}>
          {content}
          <div className={classes.emptyHeight}></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
