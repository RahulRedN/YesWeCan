import React, { useRef, useState } from "react";
import Instructions from "../OnlineExamComponents/Instructions/Instructions";
import MoreInstructions from "../OnlineExamComponents/Instructions/MoreInstructions";

import Alert from '../Floats/Alert';

import classes from "./OnlineExamInstructions.module.css";

const OnlineExamInstructions = (props) => {
  const [isAlert, setIsAlert] = useState([false, {}]);
  const checkbox = useRef();
  const select = useRef();
  const [next, setNext] = useState(false);
  const onClickHandler = () => {
    if (select.current.value == 0) {
      setIsAlert([
        true,
        {
          title: "Alert",
          content: "Please select a default language",
          closeContent: "okay",
        },
      ]);
      return;
    }
    if (!checkbox.current.checked) {
      setIsAlert([
        true,
        { title: "Alert", content: "Please accept the conditions", closeContent: "okay" },
      ]);
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
        <Alert isAlert={isAlert} closeHandler={()=>{setIsAlert([false, {}])}} address={"float"}/>
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
          <p>Choose your default language <select ref={select} defaultValue={0}><option value="0">--Select--</option><option value="1">English</option></select> </p>
          <p>
            Please note that all questions will appear in your default language.
            This language can be changed for a particular question later on.
          </p>
          <br />
          <input type="checkbox" ref={checkbox} />
          <label>
            {" "}
            I have read and understood the instructions. All Computer Hardwares
            alloted to me are in proper working condition. I agree that in case
            of not adhering to the instructions, I will be disqualified from
            giving the exam.
          </label>
          <br />
          <br />
          <div>
            <button onClick={onClickHandler}>I am ready to begin</button>
          </div>
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
