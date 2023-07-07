import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { useAuth } from "../../Firebase/AuthContexts";

import CourseTest from "./CourseTest";
import classes from "./Sidebar.module.css";
import { useCourseFetch } from "../../hooks/setCoursesInfo";

const Sidebar = () => {
  const [data, setData] = useCourseFetch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user.data);
  const {logout} = useAuth();
  return (
    <ul className={classes.navigation}>
      <li className={classes.util}>
        <NavLink
          to={`/user`}
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
      {data?.map((course, idx) => (
        <CourseTest course={course} key={idx} classes={classes} role={user.role} />
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
      <li
        style={{ cursor: "pointer" }}
        className={classes.util}
        onClick={() => {
          logout(user?.id, nav);
        }}
      >
        <a>
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </a>
      </li>
      <div className={classes.emptyHeight}></div>
    </ul>
  );
};

export default Sidebar;
