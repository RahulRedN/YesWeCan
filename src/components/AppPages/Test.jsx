import React, { useState } from "react";
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

  const compareDates = (course) => {
    const dateA = new Date(course.limit).getTime();
    const dateB = new Date().getTime();
    return dateB - dateA;
  };

  const course = useSelector(
    (state) =>
      state.user.myCourses.filter((course) => course.courseId == courseId)[0]
  );

  const valid = compareDates(course) > 0 ? "false" : "true";

  return (
    <>
      <div className={classes.header}>
        <h2> Online Exams</h2>
      </div>
      <div className={classes.testContainer}>
        {tests?.exams?.map((exam, idx) => (
          <TestCard
            uid={currentUser.uid}
            testId={testId}
            key={idx}
            courseId={courseId}
            title={tests.title}
            id={exam.id}
            status={course?.status[exam.id]}
            idx={idx}
            valid={valid}
          />
        ))}
        {!tests?.exams && <>No tests added Yet!</>}
        {tests?.exams?.length == 0 && <>No tests lol Yet!</>}
      </div>
      <div className={classes.emptyHeight}></div>
    </>
  );
};

export default Test;
