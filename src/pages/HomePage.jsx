import React from "react";

import HomeNav from "../components/Navbar/HomeNav";

import classes from "./HomePage.module.css";
import { useState } from "react";

const HomePage = () => {
    const slides = [
      {
        url: "/assets/slide5.jpg",
      }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };

  return (
    <div className={classes.view}>
      <HomeNav />
      <div className={classes.slider}>
        <div className="max-w-[1440px] h-[470px] w-full relative group">
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})`}}
            className="w-full h-full bg-center bg-cover duration-500"
          ></div>
          {/* Left Arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <i className="fa-solid fa-chevron-left" onClick={prevSlide}></i>
          </div>
          {/* Right Arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <i className="fa-solid fa-chevron-right" onClick={nextSlide}></i>
          </div>
          <div className="flex top-4 justify-center py-2">
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className="text-2xl cursor-pointer"
              >
                <i className="fa-solid fa-circle"></i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
