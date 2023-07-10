import React from "react";
import classes from "./Test.module.css";
import TestCard from "../AppComponents/TestCard";
import { useLoaderData, useSearchParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { useAuth } from "../../Firebase/AuthContexts";

const Test = () => {
  const { currentUser } = useAuth();
  const tests = useLoaderData();
  const [searchParams, setParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const testId = searchParams.get("id");
  const valid = searchParams.get("user");

  const testStatus = useSelector(
    (state) =>
      state.user.myCourses.filter((course) => course.courseId == courseId)[0]
        .status
  );

  return (
    <>
      <div className={classes.header}>
        <h2> Online Exams</h2>
      </div>
      <div className={classes.testContainer}>
        {tests?.exams.map((exam, idx) => (
          <TestCard 
            uid={currentUser.uid}
            testId={testId}
            key={idx}
            courseId={courseId}
            title={tests.title}
            id={exam.id}
            status={testStatus[exam.id]}
            idx={idx}
            valid={valid}
          />
        ))}
      </div>
      <div className={classes.emptyHeight}></div>
    </>
  );
};

export default Test;
