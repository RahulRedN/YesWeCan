import React, { useEffect, useState } from "react";

import classes from "./Buy.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/config";
import MathJaxRender from "../components/OnlineExamComponents/Utility/MathJaxRender";
import { useAuth } from "../Firebase/AuthContexts";

import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux/user_reducer";

const Buy = () => {
  const nav = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get("id");
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [course, setCourse] = useState();

  if (!courseId) {
    nav("/");
  }

  const fetch = async () => {
    try {
      const courseRef = doc(collection(db, "courses"), courseId);

      const res = await getDoc(courseRef);

      if (res.exists) {
        setCourse({ ...res.data(), courseId: res.id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const onClickHandler = async () => {
    var options = {
      key: import.meta.env.VITE_RZRPAY_key,
      key_secret: import.meta.env.VITE_RZRPAY_secretKey,
      amount: parseInt(course?.price * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + currentUser.uid,
      name: "YesWeCan",
      description: "for testing purpose",
      handler: async function (response) {
        // console.log(response)
        toast.success("Payment Successful");

        const paymentId = response.razorpay_payment_id;
        // store in firebase
        const currDate = new Date();
        const futureDate = new Date(currDate);
        futureDate.setMonth(futureDate.getMonth() + parseInt(course?.duration));
        const orderInfo = {
          enrolledAt: currDate.toLocaleDateString(),
          limit: futureDate.toLocaleDateString(),
          courseId,
          uid: currentUser.uid,
          paymentId,
          status: {},
          email: user?.data.email,
          mobile: user?.data.mobile,
        };
        try {
          const result = await addDoc(collection(db, "enrollments"), orderInfo);
          dispatch(setCourses([...user.myCourses, { ...orderInfo }]));
        } catch (error) {
          console.log(error);
          toast.error("Unexpected Error Occured!");
        }
      },

      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  return (
    <div className={classes.view}>
      <Toaster position="top-center" />
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
            Please pay the required Amount Only! After payment enter the
            transaction Id and Submit Request.(Course will be activated in
            24hrs)
          </p>
          <p>Overall Price: Rs. {course?.price} /-</p>
          <p>
            <button
              disabled={
                (user?.data.role == "online" && course?.role == "classroom") ||
                user?.myCourses.some((course) => course.courseId === courseId)
              }
              onClick={onClickHandler}
            >
              Purchase
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Buy;
