import React, { useEffect, useState } from "react";

import { Outlet, useNavigation } from "react-router-dom";

import MainNav from "../components/Navbar/MainNav";
import Sidebar from "../components/Sidebar/Sidebar";
import classes from "./MainApp.module.css";

import { useAuth } from "../Firebase/AuthContexts";

const MainApp = () => {
  const { currentUser, logout } = useAuth();

  const [isVisableSidebar, setIsVisableSidebar] = useState(false);
  const sidebarClass =
    classes.sidebarDefault +
    " " +
    (!isVisableSidebar ? classes.sidebar : classes.noSidebar);
  const contentClass =
    classes.contentDefault +
    " " +
    (!isVisableSidebar ? classes.contentPage : classes.contentPageNosidebar);

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
        <div className={sidebarClass}>
          <Sidebar />
        </div>
        <div className={contentClass}>
          <Outlet />
          <div className={classes.footer}>Footer</div>
        </div>
      </div>
    </>
  );
};

export default MainApp;
