import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNav.module.css";

import { useAuth } from "../../Firebase/AuthContexts";

import { RxCross2 } from "react-icons/rx";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const HomeNav = () => {
  const { currentUser } = useAuth();
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
            <RxCross2 size={25} strokeWidth={1.01} color="white" />
          ) : (
            <PiDotsThreeOutlineVerticalFill size={25} color="white" />
          )}
        </div>
        <ul>
          <li>
            <a href="#courses">Courses</a>
          </li>
          <li>
            <a href="/contactUs">Contact Us</a>
          </li>
          <li
            onClick={() => {
              nav("/login");
            }}
          >
            {currentUser?.uid ? "Dashboard" : "Login"}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HomeNav;
