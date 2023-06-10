import React from "react";
import classes from "./MainNav.module.css";

const MainNav = (props) => {
  const toggleHandler = () => {
    props.toggleSidebar((prev) => !prev);
  }
  return (
    <nav className={classes.navbar}>
      <div className={classes.toggleBar} onClick={toggleHandler}>
          <i className="fa-solid fa-bars"></i>
      </div>
      <div className={classes.navLogo}>
        <a href="#">Sadhana Government Jobs Academy</a>
      </div>
      <div className={classes.navContent}>
        <ul>
          <li>
            <i className="fa-solid fa-house"></i>
          </li>
          <li>
            <i className="fa-solid fa-bell"></i>
          </li>
          <li>
            <i className="fa-solid fa-user"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNav;
