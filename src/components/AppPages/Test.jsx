import React from "react";
import classes from "./Test.module.css";
import TestCard from "../AppComponents/TestCard";

const Test = () => {
  return (
    <>
      <div className={classes.header}>
        <h2> Online Exams</h2>
      </div>
      <div className={classes.testContainer}>
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
      </div>
    </>
  );
};

export default Test;
