import React from "react";

import classes from "./LiveClassCard.module.css";

const LiveClassCard = () => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.img}>
        <img src="/assets/LiveClass.jpg" alt="" />
      </div>
      <div className={classes.liveClassName}>Name</div>
    </div>
  );
};

export default LiveClassCard;
