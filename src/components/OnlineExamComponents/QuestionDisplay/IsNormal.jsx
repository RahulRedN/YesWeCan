import React from "react";

import MathJaxRender from "../Utility/MathJaxRender";

import classes from "./isNormal.module.css";
import style from "./Question.module.css";

const IsNormal = ({ question, trace, onSelect, check }) => {
  return (
    <>
      <div className={classes.questionDiv}>
        <div className={classes.questionNum}>
          Question Number: {trace[2] + 1}
        </div>
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
      <div className={style.options}>
        <ul>
          {question?.options.map((option, idx) => (
            <li
              key={`${trace[0]} ${trace[1]} ${idx}`}
              onClick={() => onSelect(idx)}
            >
              <div
                className={`${style.check} ${
                  check == idx ? style.checked : "."
                }`}
              ></div>
              <input type="radio" value={false} name="options" id={idx} />
              <label htmlFor="equation">
                {option.equ ? <MathJaxRender mathml={option.equ} /> : ""}
                {option.img ? (
                  <img src='/assets/Logo.png' alt="/assets/Logo.png"/>
                ) : (
                  ""
                )}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default IsNormal;
