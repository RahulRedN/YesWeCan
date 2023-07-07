import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const CourseTestPart = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const toggleViewHandler = () => {
    setDropdown((prev) => !prev);
  };
  return (
    <div className={props.classes.courseContent}>
      <button
        onClick={toggleViewHandler}
        style={{ justifyContent: "flex-end", gap: "4rem" }}
      >
        {props.title}
        <div className={dropdown ? props.classes.clicked : ""}>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </button>
      <div
        className={
          dropdown ? props.classes.dropdown : props.classes.displayNone
        }
      >
        {props.tests.map((test) => (
          <NavLink
            to={`/user/test?id=${test.id}&courseId=${props.courseId}&user=${props.status}&role=${props.role}`}
            key={test.id}
          >
            <i className="fa-solid fa-circle"></i> {test.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CourseTestPart;
