import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CourseTestPart from "./CourseTestPart";

const CourseTest = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const toggleViewHandler = () => {
    setDropdown((prev) => !prev);
  };
  let content;
  if (props.course.phases) {
    content = props.course.phases.map((phase, idx) => (
      <CourseTestPart
        key={idx}
        title={phase.title}
        tests={phase.tests}
        classes={props.classes}
        courseId={props.course.id}
        status={props.course.status}
        role={props.role}
      />
    ));
  } else {
    content = props.course.tests.map((test) => (
      <NavLink to={`/user/test?id=${test.id}&courseId=${props.course.id}&user=${props.course?.status}&role=${props.role}`} key={test.id}>
        <i className="fa-solid fa-circle"></i> {test.title}
      </NavLink>
    ));
  }
  return (
    <li className={props.classes.course}>
      <div className={props.classes.courseName}>{props.course.title}</div>
      <div className={props.classes.courseContent}>
        <button onClick={toggleViewHandler}>
          <i className="fa-solid fa-tv"></i> Online Exams
          <div className={dropdown ? props.classes.clicked : ""}>
            <i className="fa-solid fa-angle-down"></i>
          </div>
        </button>
        <div
          className={
            dropdown ? props.classes.dropdown : props.classes.displayNone
          }
        >
          {content}
        </div>
      </div>
    </li>
  );
};

export default CourseTest;
