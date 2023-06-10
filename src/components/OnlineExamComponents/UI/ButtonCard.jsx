import React, { useEffect, useState } from "react";
import classes from "./ButtonCard.module.css";

const ButtonCard = ({ effects, clickHandler, children }) => {
  const [buttonClass, setButtonClass] = useState(
    classes.buttonCard + " " + classes.normal
  );

  useEffect(() => {
    if (effects?.isMarked && effects?.isAnswered) {
      setButtonClass(classes.buttonCard + " " + classes.markedS);
    } else if (effects?.isMarked) {
      setButtonClass(classes.buttonCard + " " + classes.marked);
    } else if (effects?.isAnswered) {
      setButtonClass(classes.buttonCard + " " + classes.answered);
    } else if (effects?.isVisited) {
      setButtonClass(classes.buttonCard + " " + classes.notAnswered);
    }
  }, [effects]);

  const onClickHandler = () => {
    clickHandler();
  };
  return (
    <button className={buttonClass} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default ButtonCard;
