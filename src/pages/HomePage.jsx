import React from "react";

import HomeNav from "../components/Navbar/HomeNav";

import classes from "./HomePage.module.css";
import ImageSlider from "../components/HomePage/ImageSlider";
import Courses from "../components/HomePage/Courses";
import { useLoaderData } from "react-router-dom";

import { MdMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";

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
              <MdMail size={25}/>
              <span>software.yeswecan@gmail.com</span>
            </p>
            <p>
              <FaPhoneAlt size={25}/> <span>+91 9853324365</span>
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
              <ImFacebook2 size={25}/>
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
