import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import MainNav from "../components/Navbar/MainNav";
import Sidebar from "../components/Sidebar/Sidebar";
import classes from "./MainApp.module.css";

import { useAuth } from "../Firebase/AuthContexts";

const MainApp = () => {
  const { currentUser, logout } = useAuth();

  const [isVisableSidebar, setIsVisableSidebar] = useState(false);

  useEffect(() => {
    if (!currentUser.uid) {
      logout();
    }
  }, [currentUser]);
  return (
    <>
      <div className={classes.header}>
        <MainNav toggleSidebar={setIsVisableSidebar} />
      </div>
      <div className={classes.content}>
        <div
          className={
            classes.sidebar + " " + (isVisableSidebar ? "" : classes.none)
          }
        >
          <Sidebar />
        </div>
        <div
          className={isVisableSidebar ? classes.overlay : classes.overlayNone}
          onClick={() => setIsVisableSidebar((state) => !state)}
        ></div>
        <div className={classes.contentDefault}>
          <Outlet />
          <div className={classes.footer}>
            @RedMoon Solutions | Contact: redmoon.sol18@gmail.com
          </div>
        </div>
      </div>
    </>
  );
};

export default MainApp;
