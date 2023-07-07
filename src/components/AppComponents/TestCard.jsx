import React from "react";
import classes from "./TestCard.module.css";
import { Link } from "react-router-dom";

const TestCard = ({ title, id, status, idx, courseId, valid, testId, uid }) => {
  const newStatus = status ? status[0] : null;
  return (
    <div className={classes.testCard}>
      <div className={classes.cardHeader}>
        <div className={classes.testTitle}>{title}</div>
        <div>{"Model Test " + (idx + 1)}</div>
      </div>
      <hr />
      <div className={classes.cardFooter}>
        {valid == "false" ? <a className={classes.locked}>Locked</a> : ""}
        {newStatus != "A" && valid == "true" ? (
          <Link
            to={`/online-exam?id=${id}&courseId=${courseId}&courseName=${
              title + " " + "(Model Test " + (idx + 1) + ")"
            }&testId=${testId}`}
            className={classes.start}
          >
            Start Exam
          </Link>
        ) : (
          ""
        )}
        {newStatus == "A" && (
          <Link
            to={`/user/viewResult?id=${id}&courseId=${courseId}&courseName=${
              title + " " + "(Model Test " + (idx + 1) + ")"
            }&testId=${testId}&user=${uid}&attempts=${status[1]}`}
          >
            View Result
          </Link>
        )}
        {newStatus == "A" && valid == "true" ? (
          <Link
            to={`/online-exam?id=${id}&courseId=${courseId}&courseName=${
              title + " " + "(Model Test " + (idx + 1) + ")"
            }&testId=${testId}`}
            className={classes.start}
          >
            Re-Exam
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TestCard;
