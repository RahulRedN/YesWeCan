import React, { useState, useRef } from "react";

import classes from "./LoginComponents.module.css";

import { LuArrowLeftFromLine } from "react-icons/lu";

const ForgotPass = ({ change, setState }) => {
  const emailRef = useRef();
  const [isError, setIsError] = useState([false, {}]);
  const [isLoading, setIsLoading] = useState(false);

  const sendHandler = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const email = emailRef.current.value.trim();
    if (email === "") {
      setIsError([true, "Please enter Email"]);
      return;
    } else if (!emailRegex.test(email)) {
      setIsError([true, "Please enter a valid Email!"]);
      return;
    }

    setIsLoading(true);
    try {
      change(email);
      setIsLoading(false);
      setIsError([false, {}]);
      alert("Email sent!");
    } catch (err) {
      setIsError([true, "Please enter a valid email or Try again!"]);
      console.error(err);
    }
  };

  return (
    <>
      <div
        className={classes.backButton}
        onClick={() => {
          setState({ isOnline: true });
        }}
      >
        <LuArrowLeftFromLine size={25} /> Back
      </div>
      <div className={classes.container}>
        <div className={classes.header}>
          <span>Send password change link to your Mail!</span>
        </div>
        <div className={classes.inputs}>
          <div className={classes.group}>
            <input type="text" placeholder=" " ref={emailRef} />
            <label className={classes.groupLabel}>Email</label>
          </div>
          <div className={classes.signIn}>
            <button disabled={isLoading} onClick={sendHandler}>
              Send
            </button>
          </div>
          <div className={classes.validation}>
            {isError[0] ? isError[1] : <>&nbsp;</>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
