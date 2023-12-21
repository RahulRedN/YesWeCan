import React, { useEffect, useState } from "react";

import { useAuth } from "../Firebase/AuthContexts";

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
      nav("/user");
    }
  }, [currentUser]);

  const [state, setState] = useState({ isOnline: true });

  let content;
  if (state.isOnline) {
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
