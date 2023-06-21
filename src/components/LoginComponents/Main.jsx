import React from "react";

import { Link } from "react-router-dom";

import classes from "./LoginComponents.module.css";

const Main = ({setState}) => {
    return (
      <div className={classes.container}>
        <div className={classes.header}>Welcome Back!</div>
        <div className={classes.options}>
          <div
            className={classes.card}
            onClick={() => {
              setState({ isClassroom: true });
            }}
          >
            <div className={classes.header}>
              <img src="./assets/classroom.webp" />
            </div>
            <div className={classes.body}>Classroom Student</div>
          </div>
          <div
            className={classes.card}
            onClick={() => {
              setState({ isOnline: true });
            }}
          >
            <div className={classes.header}>
              <img src="./assets/online.png" />
            </div>
            <div className={classes.body}>Online Student</div>
          </div>
        </div>
        <div className={classes.create}>
          Don't have an account? <Link to={'/signup'}>Sign Up</Link>
        </div>
      </div>
    );
};

export default Main;
