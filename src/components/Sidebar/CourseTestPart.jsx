import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { FaCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

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
          <IoIosArrowDown size={25} />
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
            <FaCircle size={7} /> {test.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CourseTestPart;
