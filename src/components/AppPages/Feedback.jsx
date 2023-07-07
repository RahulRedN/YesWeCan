import React from "react";
import classes from "./Feedback.module.css";
import { useRef } from "react";
import { useAuth } from "../../Firebase/AuthContexts";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const { currentUser } = useAuth();
  const nav = useNavigate();

  const inputRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() == "") {
      return;
    } else {
      try {
        const feedbackRef = collection(db, "feedback");
        const res = await addDoc(feedbackRef, { uid: currentUser.uid, userEmail: currentUser.email, feedback: inputRef.current.value, date: new Date().toLocaleString() });
        alert("Feedback Submited succesfully!");
        nav('/user');
      } catch (err) {
        alert("Something went wrong please try again after sometime!");
        console.log(err);
      }
    }
  }
 
  return (
    <>
      <div className={classes.header}>
        <h2> Feedback</h2>
        <br />
        <p>Please Give us your feedback.</p>
      </div>
      <form className={classes.feedback}>
        <textarea
          name="feedback"
          id=""
          cols="30"
          rows="10"
          placeholder="Please type your feedback here."
          ref={inputRef}
        ></textarea>
        <button type="submit" onClick={(e)=>{submitHandler(e)}}>Submit</button>
      </form>
      <div className={classes.emptyHeight}></div>
    </>
  );
};

export default Feedback;
