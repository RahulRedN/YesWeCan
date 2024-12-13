import React from "react";

import Marquee from "react-fast-marquee";

const Ticker = ({ texts, direction, speed }) => {
  return (
    <Marquee
      pauseOnClick
      speed={speed}
      direction={direction}
      style={{
        color: "white",
        background: "black",
        zIndex: -1,
        padding: "0.3rem 0",
        fontSize: "large",
      }}
    >
      {texts?.map((txt, idx) => (
        <div
          key={idx}
          style={{ margin: "0 1rem", marginLeft: idx == 0 && "3rem" }}
        >
          {txt}
        </div>
      ))}
    </Marquee>
  );
};

export default Ticker;
