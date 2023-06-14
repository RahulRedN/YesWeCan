import React from "react";

import MathJaxRender from "../Utility/MathJaxRender";
import IsNormal from "./IsNormal";

import classes from "./IsDirection.module.css";

const IsDirection = ({ question, trace, onSelect, check, direction }) => {
  return (
    <>
      <div className={classes.directionDiv}>
        <div className={classes.direction}>
          <div className={classes.directionHeading}>Direction</div>
          <div className={classes.content}>
            {direction[question?.direction].equ ? (
              <MathJaxRender
                mathml={direction[question?.direction].equ}
                className={classes.directionQuestion}
              />
            ) : (
              ""
            )}
            {direction[question?.direction].img ? (
              <img
                src="asgdfg"
                className={classes.image}
                alt={direction[question?.direction].img}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={classes.question}>
          <IsNormal
            trace={trace}
            question={question}
            onSelect={onSelect}
            check={check}
          />
        </div>
      </div>
    </>
  );
};

export default IsDirection;
