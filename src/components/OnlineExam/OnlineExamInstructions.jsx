import React, { useRef, useState } from "react";
import Instructions from "../OnlineExamComponents/Instructions/Instructions";
import MoreInstructions from "../OnlineExamComponents/Instructions/MoreInstructions";
import classes from "./OnlineExamInstructions.module.css";

const OnlineExamInstructions = (props) => {
  const checkbox = useRef();
  const [next, setNext] = useState(false);
  const onClickHandler = () => {
    if (!checkbox.current.checked) {
      alert("Please accept the conditions");
      return;
    }
    props.onAcceptHandler();
  }
  let content;
  if (!next) {
    content = (
      <>
        <Instructions />
        <div className={classes.buttonNavigate}>
          <button
            onClick={() => {
              setNext(true);
            }}
          >
            Next &gt;&gt;
          </button>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <MoreInstructions />
        <div className={classes.buttonNavigate}>
          <button
            onClick={() => {
              setNext(false);
            }}
          >
            &lt;&lt; Previous
          </button>
        </div>
        <div className={classes.confirm}>
          <input type="checkbox" ref={checkbox} />
          <label> I have read and understood the instructions. All Computer Hardwares alloted to me are in proper working condition. I agree that in case of not adhering to the instructions, I will be disqualified from giving the exam.</label><br /><br />
          <button onClick={onClickHandler}>I am ready to begin</button>
        </div>
      </>
    );
  }
  return (
    <div className={classes.view}>
      <div className={classes.heading}>Instructions</div>
      <div className={classes.container}>
        <div className={classes.instructions}>{content}</div>
        <div className={classes.userDetails}>
          <img
            src="image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/user.jpeg";
            }}
          />
          <p>Mobile Number</p>
        </div>
      </div>
    </div>
  );
};

export default OnlineExamInstructions;
