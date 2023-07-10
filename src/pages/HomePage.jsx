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
    </div>
  );
};

export default HomePage;
