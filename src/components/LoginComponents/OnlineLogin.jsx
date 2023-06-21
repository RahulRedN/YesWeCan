import React, { useState, useRef } from "react";

import { db } from "../../Firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

import { GoogleButton } from "react-google-button";

import classes from "./LoginComponents.module.css";

const OnlineLogin = ({ setState, signIn, nav, logout, signInWithGoogle }) => {
  const [isError, setIsError] = useState([false, {}]);
  const [isLoading, setIsLoading] = useState(false);

  const userDetailsRef = collection(db, "users");

  const emailRef = useRef();
  const passwordRef = useRef();

  const siginHandler = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const email = emailRef.current.value.trim();
    if (email === "") {
      setIsError([true, "Please enter Email"]);
      return;
    } else if (!emailRegex.test(email)) {
      setIsError([true, "Please enter a valid Email!"]);
      return;
    } else if (passwordRef.current.value === "") {
      setIsError([true, "Please enter password!"]);
      return;
    }
    setIsError([false, {}]);
    setIsLoading(true);
    try {
      const res = await signIn(email, passwordRef.current.value);
      const q = query(userDetailsRef, where("uid", "==", res.user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length != 0) {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (data[0].role == "classroom" || data[0].isLoggedIn) {
          logout();
          if (data[0].role == "classroom") {
            alert("Please select the correct Login Method!");
          } else {
            alert(
              "Already logged in through another device! Make sure to logout of other devices."
            );
          }
        } else {
          const docRef = doc(db, "users", data[0].id);
          await updateDoc(docRef, { isLoggedIn: true });
        }
      }
      setIsLoading(false);
    } catch (err) {
      setIsError([
        true,
        "Please check your Email and Password credentials again!",
      ]);
      setIsLoading(false);
      try {
        logout();
      } catch (err) {}
    }
  };

  const googleHandler = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithGoogle();
      const q = query(userDetailsRef, where("uid", "==", res.user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length != 0) {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (data[0].role == "classroom" || data[0].isLoggedIn) {
          logout();
          if (data[0].role == "classroom") {
            alert("Please select the correct Login Method!");
          } else {
            alert(
              "Already logged in through another device! Make sure to logout of other devices."
            );
          }
        } else {
          const docRef = doc(db, "users", data[0].id);
          await updateDoc(docRef, { isLoggedIn: true });
        }
      } else {
        const user = res.user;
        await addDoc(userDetailsRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          role: "online",
          isLoggedIn: true,
        });
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      <div
        className={classes.backButton}
        onClick={() => {
          setState({ isMain: true });
        }}
      >
        <i className="fa-solid fa-chevron-left"></i> Back
      </div>
      <div className={`${classes.container} ${classes.loginContent}`}>
        <div className={classes.header}>Online Student Login</div>
        <div className={classes.validation}>
          {isError[0] ? isError[1] : <>&nbsp;</>}
        </div>
        <div className={classes.inputs}>
          <div className={classes.group}>
            <input type="text" placeholder=" " ref={emailRef} />
            <label className={classes.groupLabel}>Email</label>
          </div>
          <div className={classes.group}>
            <input type="password" placeholder=" " ref={passwordRef} />
            <label className={classes.groupLabel}>Password</label>
          </div>
          <div className={classes.forgot}>
            <span
              onClick={() => {
                setState({ isForgot: true });
              }}
            >
              Forgot Password?
            </span>
          </div>
          <div className={classes.signIn}>
            <button onClick={siginHandler} disabled={isLoading}>
              Sign In
            </button>
            Or
            <span
              onClick={() => {
                nav("/signup");
              }}
            >
              create new account
            </span>
          </div>
          <div className={classes.googleSignIn}>
            Other Login
            <GoogleButton
              disabled={isLoading}
              label="Sign In / Sign Up"
              onClick={() => {
                googleHandler();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineLogin;
