import React from "react";

import classes from "./ProfilePage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db, storage } from "../Firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

import { setData } from "../redux/user_reducer";
import { useAuth } from "../Firebase/AuthContexts";

const ProfilePage = () => {
  const { sendPasswordReset } = useAuth();
  const user = useSelector((state) => state.user.data);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
  });

  const photoChangeHandler = async (img) => {
    if (img) {
      if (img.size / 1024 < 100) {
        try {
          const imageRef = ref(storage, `/users/${user.uid}`);
          const imgRes = await uploadBytes(imageRef, img);
          const imageUrl = await getDownloadURL(imgRes.ref);

          const userDocRef = doc(collection(db, "users"), user.id);
          const res = await updateDoc(userDocRef, {
            photo: imageUrl,
          });

          dispatch(setData({ ...user, photo: imageUrl }));
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Please upload image less than 100kb!");
      }
    }
  };

  const resetPasswordHandler = async () => {
    try {
      const res = await sendPasswordReset(user.email);
      alert("Password Reset link Sent to mail!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const saveHandler = async () => {
    if (userData.name != "" || userData.mobile != "") {
      const alphaRegex = /^[a-zA-Z\s]+$/;
      const mobileRegex = /^\d{10}$/;
      const pattern = /^[1-9][0-9]{9}$/;

      if (!alphaRegex.test(userData.name)) {
        alert("Only Alphabets!");
        return;
      } else if (
        !mobileRegex.test(userData.mobile) ||
        !pattern.test(userData.mobile)
      ) {
        alert("Please enter a valid Mobile Number");
        return;
      }

      try {
        const userDocRef = doc(collection(db, "users"), user.id);
        const res = await updateDoc(userDocRef, {
          name: userData.name,
          mobile: userData.mobile,
        });

        dispatch(
          setData({ ...user, name: userData.name, mobile: userData.mobile })
        );
        setIsEdit(false);
      } catch (err) {
        console.log(err);
        alert("Error: " + err.message);
      }
    } else {
      alert("Please enter your Name / Mobile Number!");
    }
  };

  return (
    <div className={classes.view}>
      <div className={classes.container}>
        <div className={classes.photo}>
          <img
            src={user.photo}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/user.jpeg";
            }}
          ></img>
          <p>
            <label htmlFor="imageChange">Change Photo</label>{" "}
            <input
              type="file"
              accept="image/*"
              id="imageChange"
              onChange={(e) => {
                photoChangeHandler(e.target.files[0]);
              }}
            />
          </p>
          <Link to={"/user"}>
            {" "}
            <i className="fa-solid fa-left-long"></i> Dashboard
          </Link>
        </div>
        <div className={classes.details}>
          <div className={classes.inputs}>
            <h3>Your details</h3>
            <p>
              <label htmlFor="Email">
                <strong>Email :</strong>{" "}
              </label>{" "}
              <input
                type="email"
                id="Email"
                value={userData.email}
                disabled={true}
              />
            </p>
            <p>
              <label htmlFor="name">
                <strong>Full Name:</strong>{" "}
              </label>
              <input
                type="text"
                id="name"
                value={userData.name}
                disabled={!isEdit}
                onChange={(e) => {
                  setUserData((state) => {
                    return { ...state, name: e.target.value };
                  });
                }}
              />
            </p>
            <p>
              <label htmlFor="mobile">
                <strong>Mobile Number : </strong>
              </label>{" "}
              <input
                type="text"
                value={userData.mobile}
                disabled={!isEdit}
                onChange={(e) => {
                  setUserData((state) => {
                    return { ...state, mobile: e.target.value };
                  });
                }}
              />
            </p>
            <div className={classes.edit}>
              {isEdit ? (
                <>
                  <button
                    onClick={() => {
                      setIsEdit(false);
                      setUserData({
                        name: user?.name,
                        email: user?.email,
                        mobile: user?.mobile,
                      });
                    }}
                    className={classes.close}
                  >
                    Cancel
                  </button>
                  <button className={classes.save} onClick={saveHandler}>
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsEdit(true);
                  }}
                  className={classes.save}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <div className={classes.changeEmail}>
            <button
              onClick={() => {
                resetPasswordHandler();
              }}
            >
              Change Password?
            </button>
          </div>
        </div>
        <div className={classes.content}></div>
      </div>
    </div>
  );
};

export default ProfilePage;
