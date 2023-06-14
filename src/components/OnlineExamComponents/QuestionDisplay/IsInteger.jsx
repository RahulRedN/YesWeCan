import React from "react";

import MathJaxRender from "../Utility/MathJaxRender";

import classes from "./IsInteger.module.css";

const IsInteger = ({ question, trace, setCheck, check }) => {
  return (
    <div className={classes.integerDiv}>
      <div className={classes.questionNum}>Question Number: {trace[2] + 1}</div>
      <div className={classes.question}>
        {question?.question.equ ? (
          <MathJaxRender
            mathml={question?.question.equ}
            className={classes.question}
          />
        ) : (
          ""
        )}
        {question?.question.img ? (
          <img src="/assets/Logo.png" className={classes.image} alt="image" />
        ) : (
          ""
        )}
      </div>
      <div className={classes.inputBox}>
        <input type="number" step='0.01' onChange={(e) => setCheck(e.target.value)} placeholder={(check || check == 0) ? check : "enter integer" } />
      </div>
    </div>
  );
};

export default IsInteger;
