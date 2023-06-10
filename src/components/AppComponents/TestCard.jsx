import React from "react";
import classes from "./TestCard.module.css";
import { Link } from "react-router-dom";

const TestCard = () => {
  return (
    <div className={classes.testCard}>
      <div className={classes.cardHeader}>
        <div className={classes.testTitle}>Test Title</div>
        <div>Test Number</div>
      </div>
      <hr />
      <div className={classes.cardFooter}>
        <Link to='/user/viewResult/?:testId'>View Result</Link>
      </div>
    </div>
  );
};

export default TestCard;
