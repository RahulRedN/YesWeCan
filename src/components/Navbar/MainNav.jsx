import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNav.module.css";

import { RxCross2 } from "react-icons/rx";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { AiOutlineBars } from "react-icons/ai";

import { HiMiniHome } from "react-icons/hi2";
import { BsFillBellFill } from "react-icons/bs";
import { IoPersonCircle } from "react-icons/io5";

const MainNav = (props) => {
  const nav = useNavigate();
  const [isDropdown, setIsDropdown] = useState(false);

  const toggleHandler = () => {
    props.toggleSidebar((prev) => !prev);
  };
  return (
    <nav className={classes.navbar}>
      <div className={classes.toggleBar} onClick={toggleHandler}>
        <AiOutlineBars color="white" size={30} />
      </div>
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
            <RxCross2 size={25} color="white" />
          ) : (
            <PiDotsThreeOutlineVerticalFill size={25} color="white" />
          )}
        </div>
        <ul>
          <li
            onClick={() => {
              nav("/");
            }}
          >
            <HiMiniHome size={25} /> <span>{isDropdown && "Home"}</span>
          </li>
          <li>
            <BsFillBellFill size={22} />{" "}
            <span>{isDropdown && "Notifications"}</span>
          </li>
          <li
            onClick={() => {
              nav("/profile");
            }}
          >
            <IoPersonCircle size={25} /> <span>{isDropdown && "Profile"}</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNav;
