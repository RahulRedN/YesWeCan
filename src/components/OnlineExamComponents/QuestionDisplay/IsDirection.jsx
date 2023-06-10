import React from "react";
import classes from "./IsDirection.module.css";

const IsDirection = () => {
  return (
    <>
      <div className={classes.directionDiv}>
        <div className={classes.direction}>
          <div className={classes.directionHeading}>Direction</div>
          <div className={classes.content}>{question?.direction}</div>
        </div>
        <div className={classes.question}>
          <div className={classes.questionNum}>
            Question Number: {trace[2] + 1}
          </div>
          <p className={style.question}>
            <InlineMath math={question?.question} />
          </p>
          <div className={classes.options}>
            <ul>
              {question?.options.map((option, idx) => (
                <li
                  key={`${trace[0]} ${trace[1]} ${idx}`}
                  onClick={() => onSelect(idx)}
                >
                  <div
                    className={`${classes.check} ${
                      check == idx ? classes.checked : "."
                    }`}
                  ></div>
                  <input type="radio" value={false} name="options" id={idx} />
                  <label htmlFor="">{option}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default IsDirection;
