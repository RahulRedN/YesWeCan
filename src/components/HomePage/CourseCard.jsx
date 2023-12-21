import React from "react";

import classes from "./Courses.module.css";
import MathJaxRender from "../OnlineExamComponents/Utility/MathJaxRender";

const CourseCard = ({
  title,
  duration,
  price,
  description,
  onClickHandler,
  courseId,
  role,
}) => {
  return (
    <div className={classes.card}>
      <div className={classes.courseTitle}>{title}</div>
      <div className={classes.desDiv}>
        <div className={classes.courseDesc}>
          {<MathJaxRender mathml={description} />}
        </div>
        ...
      </div>
      <div className={classes.courseDuration}>
        <strong>Duration&nbsp;:</strong> {duration} months
      </div>
      <div className={classes.coursePrice}>
        <strong>Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> Rs.{price}
      </div>
      <div className={classes.buy}>
        <button
          onClick={() => {
            onClickHandler(courseId, role);
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
