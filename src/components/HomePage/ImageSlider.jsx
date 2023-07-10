import React, { useState, useEffect } from "react";

import classes from "./ImageSlider.module.css";
import { useRef } from "react";

const ImageSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideInterval = useRef();

  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const startSlideTimer = () => {
    stopSlideTimer();
    slideInterval.current = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide < slides.length - 1 ? currentSlide + 1 : 0
      );
    }, 3000);
  };

  useEffect(() => {
    startSlideTimer();

    return () => stopSlideTimer();
  }, []);

  const prev = () => {
    startSlideTimer();
    const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    setCurrentSlide(index);
  };

  const next = () => {
    startSlideTimer();
    const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    setCurrentSlide(index);
  };

  const switchIndex = (index) => {
    startSlideTimer();
    setCurrentSlide(index);
  };

  return (
    <div className={classes.container}>
      <div className={classes.carousel}>
        <div
          className={classes.carouselInner}
          style={{ transform: `translateX(${-currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              className={classes.carouselItem}
              key={index}
              onMouseEnter={stopSlideTimer}
              onMouseOut={startSlideTimer}
            >
              <img src={slide} />
            </div>
          ))}
        </div>
        <div className={classes.carouselIndicators}>
          {slides.map((img, index) => (
            <button
              className={`${classes.carouselIndicatorItem} ${
                currentSlide === index ? classes.active : ""
                }`}
              key={index}
              onClick={() => switchIndex(index)}
            ></button>
          ))}
        </div>
        <div>
          <button
            className={classes.carouselControl + " " + classes.left}
            onClick={prev}
          >
            &lt;
          </button>
          <button
            className={classes.carouselControl + " " + classes.right}
            onClick={next}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
