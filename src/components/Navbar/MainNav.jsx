import React, { useState } from "react";
import classes from "./MainNav.module.css";

const MainNav = (props) => {
  const [isDropdown, setIsDropdown] = useState(false);

  const toggleHandler = () => {
    props.toggleSidebar((prev) => !prev);
  };
  return (
    <nav className={classes.navbar}>
      <div className={classes.toggleBar} onClick={toggleHandler}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className={classes.navLogo}>
        <a href="#">Sadhana Government Jobs Academy</a>
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
            <i className="fa-solid fa-house"></i>{" "}
            <span>{isDropdown && "Home"}</span>
          </li>
          <li>
            <i className="fa-solid fa-bell"></i>{" "}
            <span>{isDropdown && "Notifications"}</span>
          </li>
          <li>
            <i className="fa-solid fa-user"></i>{" "}
            <span>{isDropdown && "Profile"}</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNav;
