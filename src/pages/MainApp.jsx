import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/Navbar/MainNav";
import Sidebar from "../components/Sidebar/Sidebar";
import classes from "./MainApp.module.css";

const MainApp = () => {
  const [isVisableSidebar, setIsVisableSidebar] = useState(false);
  const sidebarClass = classes.sidebarDefault + " " + (!isVisableSidebar ? classes.sidebar : classes.noSidebar);
  const contentClass =
    classes.contentDefault + " " +
    (!isVisableSidebar ? classes.contentPage : classes.contentPageNosidebar);
  const myCourses = [
    {
      title: "Course 1",
      tests: [
        { title: "test 1", id: "1" },
        { title: "test 2", id: "2" },
        { title: "test 3", id: "3" },
      ],
    },
    {
      title: "Course 2",
      phases: [{ title: "Phase 1", tests: [{ title: "test 1", id: "2" }] }],
    },
  ];
  return (
    <>
      <div className={classes.header}>
        <MainNav toggleSidebar={setIsVisableSidebar} />
      </div>
      <div className={classes.content}>
        <div className={sidebarClass}>
          <Sidebar courses={myCourses} />
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
