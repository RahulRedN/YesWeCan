import React from "react";

import classes from "./Courses.module.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import { useSelector } from "react-redux";

const Courses = () => {
  const user = useSelector((state) => state.user.data);
  const data = useLoaderData();
  const nav = useNavigate();

  const onClickHandler = async (courseId, role) => {
    if (!user.uid) {
      alert("PLease Login first!");
      nav("/login");
      return;
    }
    if (role == "classroom" && user.role != "classroom") {
      alert("This package is exclusive to classroom students only!");
      return;
    }

    nav("/buy?id=" + courseId);
  };

  return (
    <div className={classes.container} id="courses">
      <h2>Courses Offered :</h2>
      <div className={classes.courses}>
        {data?.courses.map((course, courseIdx) => (
          <CourseCard
            title={course.title}
            description={course.description}
            price={course.price}
            duration={course.duration}
            key={courseIdx}
            courseId={course.id}
            role={course.role ? course.role : "both"}
            onClickHandler={onClickHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
