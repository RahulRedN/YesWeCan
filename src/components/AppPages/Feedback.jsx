import React from "react";
import classes from "./Feedback.module.css";

const Feedback = () => {
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
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className={classes.emptyHeight}></div>
    </>
  );
};

export default Feedback;
