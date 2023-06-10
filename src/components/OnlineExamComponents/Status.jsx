import React from "react";
import classes from "../OnlineExam/OnlineExamPage.module.css";

const Status = ({ statusComp }) => {
  const { ans, nAns, mark, markS, nVisit } = statusComp;
  return (
    <div className={classes.status}>
      <span>
        <div className={classes.card + " " + classes.answered}>{ans}</div>
        <div className={classes.info}>Answered</div>
      </span>
      <span>
        <div className={classes.card + " " + classes.notAnswered}>{nAns}</div>
        <div className={classes.info}>Not Answered</div>
      </span>
      <span>
        <div className={classes.card + " " + classes.normal}>{`${nVisit}`}</div>
        <div className={classes.info}>Not Visited</div>
      </span>
      <span>
        <div className={classes.card + " " + classes.marked}>{mark}</div>
        <div className={classes.info}>Marked for review</div>
      </span>
      <span>
        <div className={classes.card + " " + classes.markedS}>{markS}</div>
        <div className={classes.info}>Answered & Marked for Review</div>
      </span>
    </div>
  );
};

export default Status;
