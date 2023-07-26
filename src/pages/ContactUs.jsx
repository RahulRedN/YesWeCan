import React, { useState } from "react";

import HomeNav from "../components/Navbar/HomeNav";
import classes from "./HomePage.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/config";

const ContactUs = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const [message, setMessage] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    const alphaRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (email === "") {
      alert("Email is required!");
      return;
    } else if (!emailRegex.test(email)) {
      alert("Please enter a Valid Email!");
      return;
    } else if (name == "") {
      alert("Please enter your Name");
      return;
    } else if (!alphaRegex.test(name)) {
      alert("Please enter a Valid Name");
      return;
    } else if (message.trim() == "") {
      alert("Please Enter your FeedBack!");
      return;
    }

    try {
      const feedbackRef = collection(db, "feedback");
      const data = {
        type: "Feedback",
        name: name,
        email: email,
        message: message,
      };
      const res = await addDoc(feedbackRef, data);
      alert("Message sent! Thank you for the feedback.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.view}>
      <HomeNav />
      <div className={classes.bodyDiv}>
        <form className={classes.message}>
          <h3>Enter Your Feedback</h3>
          <div className={classes.row}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={classes.row}>
            <textarea
              cols="30"
              rows="10"
              style={{ resize: "vertical" }}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Message"
            ></textarea>
          </div>
          <div className={classes.row}>
            <button
              type="submit"
              onClick={(e) => {
                submitHandler(e);
              }}
            >
              Submit
            </button>
          </div>
        </form>
        <div className={classes.details}>
          <div className={classes.col}>
            <div className={classes.heading}>Contact Details</div>
            <div className={classes.content}>
              <p>
                <i className="fa-solid fa-envelope"></i>
                <span>software.yeswecan@gmail.com</span>
              </p>
              <p>
                <i className="fa-solid fa-phone"></i>{" "}
                <span>+91 9853324365</span>
              </p>
            </div>
          </div>
          <div className={classes.col}>
            <div className={classes.heading}>Reach us on Social Media:</div>
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
        </div>
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

export default ContactUs;
