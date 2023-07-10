import React, { useEffect, useState } from "react";

import classes from "./Buy.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/config";
import MathJaxRender from "../components/OnlineExamComponents/Utility/MathJaxRender";
import { useAuth } from "../Firebase/AuthContexts";

const Buy = () => {
  const nav = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get("id");
  const { currentUser } = useAuth();
  const [course, setCourse] = useState();

  const [transactionId, setTransactionID] = useState("");

  if (!courseId) {
    nav("/");
  }

  const fetch = async () => {
    try {
      const courseRef = doc(collection(db, "courses"), courseId);

      const res = await getDoc(courseRef);

      if (res.exists) {
        setCourse({ ...res.data() });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const onClickHandler = async () => {
    const obj = {
      courseId: courseId,
      uid: currentUser.uid,
      email: currentUser.email,
      date: new Date().toLocaleString(),
      transactionId: transactionId,
    };

    try {
      const requestRef = collection(db, "requests");
      const res = await addDoc(requestRef, { ...obj });
      alert(
        "Request Submitted! Incase you have submitted wrong Transaction ID Submit Again!"
      );
      nav("/");
    } catch (err) {
      console.log(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className={classes.view}>
      <nav className={classes.navbar + " " + classes.homeBar}>
        <div className={classes.navLogo}>
          <Link to={"/"}>
            <img src="/assets/AppLogo.png" />
          </Link>
        </div>
      </nav>
      <div className={classes.container}>
        <div className={classes.courseDetails}>
          <p>Title: {course?.title}</p>
          <div>
            <MathJaxRender mathml={course?.description} />
          </div>
          <p>Duration of {course?.duration} months.</p>
        </div>
        <div className={classes.price}>
          <p style={{ color: "red" }}>
            Plese pay the required Amount Only! After payment enter the
            transaction Id and Submit Request.(Course will be activated in
            24hrs)
          </p>
          <p>Overall Price: Rs. {course?.price} /-</p>
          <p>
            <img src="/assets/QRCode.jpeg" alt="" />
          </p>
          <p>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => {
                setTransactionID(e.target.value);
              }}
              placeholder="transaction id"
            />
          </p>
          <p>
            <button disabled={transactionId == ""} onClick={onClickHandler}>
              Request
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Buy;
