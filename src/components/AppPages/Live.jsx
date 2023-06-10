import React from "react";
import LiveClassCard from "../AppComponents/LiveClassCard";
import classes from "./Live.module.css";

const Live = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <i className="fa-regular fa-circle-dot"></i> Live Classes
        </div>
        <div className={classes.liveClasses}>
          <LiveClassCard />
          <LiveClassCard />
          <LiveClassCard />
          <LiveClassCard />
        </div>
        <div className={classes.emptyHeight}></div>
      </div>
    </>
  );
};

export default Live;
