import React, { useState } from "react";

import HomeNav from "../components/Navbar/HomeNav";
import classes from "./HomePage.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/config";

import { MdMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();

  const [message, setMessage] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    const alphaRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile number format, starting with 6-9 and total 10 digits

    if (email === "") {
      alert("Email is required!");
      return;
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid Email!");
      return;
    } else if (name === "") {
      alert("Please enter your Name");
      return;
    } else if (!alphaRegex.test(name)) {
      alert("Please enter a valid Name");
      return;
    } else if (message.trim() === "") {
      alert("Please Enter your Feedback!");
      return;
    } else if (mobile !== "" && !mobileRegex.test(mobile)) {
      alert("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    try {
      const feedbackRef = collection(db, "feedback");
      const currentDate = new Date().toLocaleString();
      const data = {
        type: "contact",
        name: name,
        email: email,
        message: message,
        mobile: mobile, 
        date: currentDate,
      };
      const res = await addDoc(feedbackRef, data);
      toast.success(
        "Message sent! Thank you for the Contacting Us. We will get back to you soon."
      );
      setEmail();
      setMessage();
      setMobile();
      setName();
    } catch (err) {
      console.error("Error adding document: ", err);
      toast("Failed to send feedback. Please try again later.");
    }
  };

  return (
    <div className={classes.view}>
      <HomeNav />
      <Toaster position="top-center" />
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
            <input
              type="number"
              placeholder="Phone Number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
            <input type="text" disabled style={{ display: "hidden" }} />
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
                <MdMail size={25} />
                <span>software.yeswecan@gmail.com</span>
              </p>
              <p>
                <FaPhoneAlt size={25} /> <span>+91 9853324365</span>
              </p>
            </div>
          </div>
          <div className={classes.col}>
            <div className={classes.heading}>Reach us on Social Media:</div>
            <div className={classes.content}>
              <p>
                <ImFacebook2 size={25} />
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
          <div className={classes.col}>
            <div className={classes.heading}>Address:</div>
            <div className={classes.content}>
              <p>Sadhana</p>
              <p>
                6/43, Dorasanipalli Rd, Beside gopi krishna school,
                Dorasanipalli, Proddatur, Andhra Pradesh - 516361
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
              <MdMail size={25} />
              <span>software.yeswecan@gmail.com</span>
            </p>
            <p>
              <FaPhoneAlt size={25} /> <span>+91 9853324365</span>
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
              <ImFacebook2 size={25} />
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
