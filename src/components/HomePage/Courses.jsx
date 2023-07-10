import React from "react";

import classes from "./Courses.module.css";
import { useLoaderData } from "react-router-dom";
import CourseCard from "./CourseCard";

const Courses = () => {
  const data = useLoaderData();
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
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
