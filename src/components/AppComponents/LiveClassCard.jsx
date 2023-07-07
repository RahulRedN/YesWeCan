import React from "react";

import classes from "./LiveClassCard.module.css";

const LiveClassCard = ({ title, address }) => {
  
  return (
    <a className={classes.cardContainer} href={address} target="_blank">
      <div className={classes.img}>
        <img src="/assets/LiveClass.jpg" alt="" />
      </div>
      <div className={classes.liveClassName}>{title}</div>
    </a>
  );
};

export default LiveClassCard;
