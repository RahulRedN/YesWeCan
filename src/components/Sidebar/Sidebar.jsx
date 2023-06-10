import React from "react";
import { NavLink } from "react-router-dom";

import CourseTest from "./CourseTest";
import classes from "./Sidebar.module.css";

const Sidebar = (props) => {
  const myCourses = props.courses;
  return (
    <ul className={classes.navigation}>
      <li className={classes.util}>
        <NavLink
          to="/user"
          end
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "white" : "",
              color: isActive ? "black" : "",
            };
          }}
        >
          <i className="fa-solid fa-house"></i>Dashboard
        </NavLink>
      </li>
      <li className={classes.util}>
        <NavLink
          to="/user/live"
          end
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "white" : "",
              color: isActive ? "black" : "",
            };
          }}
        >
          <i className="fa-solid fa-wifi"></i> Live
        </NavLink>
      </li>
      {myCourses.map((course, idx) => (
        <CourseTest course={course} key={idx} classes={classes} />
      ))}
      <li className={classes.util}>
        <NavLink
          to="/user/feedback"
          end
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "white" : "",
              color: isActive ? "black" : "",
            };
          }}
        >
          <i className="fa-solid fa-comment"></i> Feedback
        </NavLink>
      </li>
      <li className={classes.util}>
        <NavLink
          to="/logout"
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </NavLink>
      </li>
      <div className={classes.emptyHeight}></div>
    </ul>
  );
};

export default Sidebar;
