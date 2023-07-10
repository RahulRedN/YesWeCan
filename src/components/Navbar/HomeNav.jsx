import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNav.module.css";

const HomeNav = () => {
  const nav = useNavigate();
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <nav className={classes.navbar + " " + classes.homeBar}>
      <div className={classes.navLogo}>
        <Link to={"/"}>
          <img src="/assets/AppLogo.png" />
        </Link>
      </div>
      {isDropdown && (
        <div
          className={classes.backdrop}
          onClick={() => {
            setIsDropdown(false);
          }}
        ></div>
      )}
      <div
        className={
          classes.navContent + ` ${isDropdown ? classes.dropdown : ""}`
        }
      >
        <div
          className={classes.dropdownIcon}
          onClick={() => {
            setIsDropdown((state) => !state);
          }}
        >
          {isDropdown ? (
            <i className="fa-solid fa-x"></i>
          ) : (
            <i className="fa-solid fa-ellipsis-vertical"></i>
          )}
        </div>
        <ul>
          <li>
            <a href="#courses">Courses</a>
          </li>
          <li>
            <a href="#aboutUs">About Us</a>
          </li>
          <li>
            <a href="#contactUs">Contact Us</a>
          </li>
          <li
            onClick={() => {
              nav("/login");
            }}
          >
            Login
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HomeNav;
