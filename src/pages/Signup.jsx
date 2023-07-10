import React, { useState } from "react";

import { useAuth } from "../Firebase/AuthContexts";

import { db, storage } from "../Firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import classes from "./Signup.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signUp, logout } = useAuth();
  const nav = useNavigate();

  const [isError, setError] = useState([false, {}]);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const nameRef = useRef();
  const mobileRef = useRef();

  const passRef = useRef();
  const confirmPassRef = useRef();

  const [image, setImage] = useState();

  const onClickHandler = async (e) => {
    e.preventDefault();
    const alphaRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const mobileRegex = /^\d{10}$/;
    const pattern = /^[1-9][0-9]{9}$/;
    const regexPass = /^(?=.*\d).{8,}$/;

    const email = emailRef.current.value.trim();
    const name = nameRef.current.value.trim();
    const mobile = mobileRef.current.value;
    const pass = passRef.current.value;
    const conPass = confirmPassRef.current.value;

    if (email === "") {
      setError([true, { message: "Please enter Email", isEmail: true }]);
      return;
    } else if (!emailRegex.test(email)) {
      setError([
        true,
        { message: "Please enter a valid Email!", isEmail: true },
      ]);
      return;
    } else if (name == "") {
      setError([
        true,
        { message: "Please enter your Full Name", isName: true },
      ]);
      return;
    } else if (!alphaRegex.test(name)) {
      setError([true, { message: "Please enter a Valid Name", isName: true }]);
      return;
    } else if (mobile == "") {
      setError([
        true,
        { message: "Please enter Mobile Number", isMobile: true },
      ]);
      return;
    } else if (!mobileRegex.test(mobile) || !pattern.test(mobile)) {
      setError([
        true,
        { message: "Please enter a valid Mobile Number", isMobile: true },
      ]);
      return;
    } else if (!image) {
      setError([true, { message: "Please Upload an image", isImage: true }]);
      return;
    } else if (image.size / 1024 > 100) {
      setError([true, { message: "Please Upload an image less than 100Kb!" }]);
      return;
    } else if (pass == "" || conPass == "") {
      setError([
        true,
        {
          message: "Please enter password and confirm password",
          isPass: true,
        },
      ]);
      return;
    } else if (!regexPass.test(pass)) {
      setError([
        true,
        {
          message:
            "Password should be atleast of length 8 and contain atleast 1 number",
          isPass: true,
        },
      ]);
      return;
    } else if (pass != conPass) {
      setError([
        true,
        {
          message: "Both Password and Confirm Password should match.",
          isPass: true,
        },
      ]);
      return;
    }
    setError([false, {}]);

    setIsLoading(true);
    try {
      const res = await signUp(email, pass);
      const userDetailsRef = collection(db, "users");
      const imageRef = ref(storage, `/users/${res.user.uid}`);
      const imgRes = await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imgRes.ref);

      await addDoc(userDetailsRef, {
        email: email,
        name: name,
        mobile: mobile,
        photo: imageUrl,
        isLoggedIn: false,
        role: "online",
        uid: res.user.uid,
      });
      await logout();

      alert("Account Created Succesfully !");
      nav("/login");
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("The email address is already in use");
      } else if (error.code == "auth/invalid-email") {
        alert("The email address is not valid.");
      } else if (error.code == "auth/operation-not-allowed") {
        alert("Operation not allowed.");
      } else if (error.code == "auth/weak-password") {
        alert("The password is too weak.");
      }
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.svg}>
          <img src="./assets/signup.png" />
        </div>
        <div className={classes.inputFields}>
          <h1 style={{ textAlign: "center" }}>
            Welcome to <span style={{ whiteSpace: "nowrap" }}>YesWeCan !</span>
          </h1>
          <form className={classes.inputs}>
            <h3>Enter your details to register</h3>
            <div className={classes.row + " " + classes.validation}>
              {isError[0] ? isError[1].message : <>&nbsp;</>}
            </div>
            <fieldset>
              <legend style={{ textAlign: "left" }}>Aspirant's Details</legend>
              <div className={classes.row}>
                <div className={classes.group}>
                  <input
                    type="email"
                    placeholder=" "
                    className={isError[1].isEmail && classes.invalid}
                    ref={emailRef}
                  />
                  <label className={classes.groupLabel}>Email*</label>
                </div>
                <div className={classes.group}>
                  <input
                    type="text"
                    placeholder=" "
                    className={isError[1].isName && classes.invalid}
                    ref={nameRef}
                  />
                  <label className={classes.groupLabel}>Full Name*</label>
                </div>
                <div className={classes.group}>
                  <input
                    type="number"
                    placeholder=" "
                    className={isError[1].isMobile && classes.invalid}
                    ref={mobileRef}
                  />
                  <label className={classes.groupLabel}>Mobile Number*</label>
                </div>
              </div>
              <div className={classes.row}>
                <div className={classes.group + " " + classes.inputFile}>
                  <h3>Upload Photo: </h3>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0].size / 1024 < 100) {
                        setImage(e.target.files[0]);
                      } else {
                        alert("Please Select image less than 100Kb!");
                      }
                    }}
                  />
                  <label
                    className={
                      classes.linkLabel +
                      " " +
                      (isError[1].isImage && classes.invalid)
                    }
                    htmlFor="file-upload"
                  >
                    <img src="./assets/upload.png" alt="img" />
                    <span>choose</span>
                  </label>
                </div>
              </div>
              {image && (
                <div className={classes.image}>
                  Your Photo :
                  <img src={URL.createObjectURL(image)} alt="Upload" />
                </div>
              )}
              <div
                className={
                  classes.pass + " " + (isError[0] && classes.validation)
                }
              >
                {isError[1].isPass
                  ? isError[1].message
                  : "Password should be of atleast length 8 and contain atleast 1 number"}
              </div>
              <div className={classes.row}>
                <div className={classes.group}>
                  <input
                    type="password"
                    placeholder=" "
                    className={isError[1].isPass && classes.invalid}
                    ref={passRef}
                  />
                  <label className={classes.groupLabel}>Password*</label>
                </div>
                <div className={classes.group}>
                  <input
                    type="password"
                    placeholder=" "
                    className={isError[1].isPass && classes.invalid}
                    ref={confirmPassRef}
                  />
                  <label className={classes.groupLabel}>
                    Confirm Password*
                  </label>
                </div>
              </div>
            </fieldset>
            <div className={classes.row}>
              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => {
                  onClickHandler(e);
                }}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
