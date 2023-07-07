import React, { useEffect, useState } from "react";

import { useAuth } from "../Firebase/AuthContexts";

import Main from "../components/LoginComponents/Main";
import Classroom from "../components/LoginComponents/ClassroomLogin";
import Online from "../components/LoginComponents/OnlineLogin";
import PasswordChange from "../components/LoginComponents/ForgotPass";

import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const { currentUser, signIn, sendPasswordReset, logout, signInWithGoogle } =
    useAuth();

  useEffect(() => {
    if (currentUser) {
      nav("/user?user="+currentUser.uid);
    }
  }, [currentUser]);

  const [state, setState] = useState({ isMain: true });

  let content;
  if (state.isMain) {
    content = <Main setState={setState} />;
  } else if (state.isClassroom) {
    content = (
      <Classroom
        setState={setState}
        signIn={signIn}
        logout={logout}
        signInWithGoogle={signInWithGoogle}
      />
    );
  } else if (state.isOnline) {
    content = (
      <Online
        setState={setState}
        signIn={signIn}
        nav={nav}
        logout={logout}
        signInWithGoogle={signInWithGoogle}
      />
    );
  } else if (state.isForgot) {
    content = <PasswordChange setState={setState} change={sendPasswordReset} />;
  }

  return (
    <>
      <div className={classes.page}>
        <div className={classes.container}>
          <div className={classes.svg}>
            <img src="./assets/content-team-animate.svg" />
          </div>
          <div className={classes.login}>{content}</div>
        </div>
      </div>
    </>
  );
};

export default Login;
