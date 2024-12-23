import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { useAuth } from "../../Firebase/AuthContexts";

import CourseTest from "./CourseTest";
import classes from "./Sidebar.module.css";
import { useCourseFetch } from "../../hooks/setCoursesInfo";

import { FaKeyboard } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";
import { FaWifi } from "react-icons/fa6";
import { IoChatbox } from "react-icons/io5";
import { TbLogout, TbWriting } from "react-icons/tb";
import { GrAnnounce } from "react-icons/gr";

const Sidebar = () => {
  const [data, setData] = useCourseFetch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user.data);
  const { logout } = useAuth();
  const currDate = new Date();
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
          <HiMiniHome size={25} />
          Dashboard
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
          <FaWifi size={25} /> Live
        </NavLink>
      </li>
      {data
        ?.filter((course) => course.status)
        .map((course, idx) => (
          <div key={idx} className={classes.wrap}>
            <CourseTest course={course} classes={classes} role={user.role} />
          </div>
        ))}
      <li className={classes.util}>
        <NavLink
          to="/user/typing"
          end
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "white" : "",
              color: isActive ? "black" : "",
            };
          }}
        >
          <FaKeyboard size={25} /> Skill Typing Test
        </NavLink>
      </li>
      <li className={classes.util}>
        <NavLink
          to="/user/writing"
          end
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "white" : "",
              color: isActive ? "black" : "",
            };
          }}
        >
          <TbWriting size={25} /> Writing Skill Test
        </NavLink>
      </li>
      <li className={classes.util}>
        <NavLink
          to="/user/recruiters"
          end
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "white" : "",
              color: isActive ? "black" : "",
            };
          }}
        >
          <GrAnnounce size={25} /> Recruiters
        </NavLink>
      </li>
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
          <IoChatbox size={25} /> Feedback
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
          <TbLogout size={25} /> Logout
        </a>
      </li>
      <div className={classes.emptyHeight}></div>
    </ul>
  );
};

export default Sidebar;
