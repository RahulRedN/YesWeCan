import React from "react";

import HomeNav from "../components/Navbar/HomeNav";

import classes from "./HomePage.module.css";
import ImageSlider from "../components/HomePage/ImageSlider";
import Courses from "../components/HomePage/Courses";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
  const data = useLoaderData();
  return (
    <div className={classes.view}>
      <HomeNav />
      <ImageSlider slides={data.images} />
      <div className={classes.body}>
        <Courses />
      </div>
      <footer className={classes.footer} id="contactUs">
        <div className={classes.col}>
          <div className={classes.heading}>Contact us (for any queries):</div>
          <div className={classes.content}>
            <p>
              <i className="fa-solid fa-envelope"></i>
              <span>software.yeswecan@gmail.com</span>
            </p>
            <p>
              <i className="fa-solid fa-phone"></i> <span>+91 9853324365</span>
            </p>
          </div>
          <div className={classes.content} style={{ paddingTop: "1rem" }}>
            <p>
              <a href="/policies">Policies Page</a>
            </p>
          </div>
        </div>
        <div className={classes.col}>
          <div className={classes.heading}>Follow us on Social Media:</div>
          <div className={classes.content}>
            <p>
              <i className="fa-brands fa-square-facebook"></i>
              <span>
                <a
                  href="https://www.facebook.com/yeswecansadhana"
                  target="_blank"
                >
                  Facebook
                </a>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
