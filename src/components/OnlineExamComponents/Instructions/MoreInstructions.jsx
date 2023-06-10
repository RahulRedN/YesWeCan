import React from "react";
import classes from "../../OnlineExam/OnlineExamInstructions.module.css";

const MoreInstructions = () => {
  return (
    <div className={classes.instructionsContent + " " + classes.moreInstructions}>
      <div className={classes.contentHeader}>
        <h4>Other Important Instructions / Warnings</h4>
      </div>
      <div className={classes.contentBody}>
        <ol>
          <li>
            The Question paper displayed is for practice purposes only. Under no
            circumstances should this be presumed as a main paper.
          </li>
          <li>
            While writing the exam don't move the mouse to outside of the
            window. If so a 30 seconds countdown will appear with a request to
            "Click here to cancel". If you failed to click within the time your
            exam will be submitted automatically.
          </li>
          <li>
            While writing exam, if you close the exam window intentionally, your
            exam will be submitted without any further confirmation
          </li>
        </ol>
      </div>
    </div>
  );
};

export default MoreInstructions;
