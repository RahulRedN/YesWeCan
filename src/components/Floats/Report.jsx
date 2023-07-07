import React from 'react'
import ReactDom from 'react-dom'
import classes from './Report.module.css'
import { useAuth } from '../../Firebase/AuthContexts'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../Firebase/config'
import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

const Report = ({ address, onCloseHandler }) => {
  const [searchParams, setParams] = useSearchParams();
  const id = searchParams.get("id");
  const courseId = searchParams.get("courseId");
  const inputRef = useRef();
  const { currentUser } = useAuth();

  const submitHandler = async(e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() == "") {
      return;
    } else {
      const feedbackRef = collection(db, "feedback");
      try {
        await addDoc(feedbackRef, {
          uid: currentUser.uid,
          userEmail: currentUser.email,
          feedback: inputRef.current.value,
          date: new Date().toLocaleString(),
          id: id,
          courseId: id
        });
        
        onCloseHandler();
      } catch (err) {
        console.log(err);
        alert("Unexpected Error!")
      }
    }
  }

    return ReactDom.createPortal(
      <>
        <div className={classes.overlay} onClick={onCloseHandler}></div>
        <div className={classes.container}>
          <div className={classes.title}>
            <span>Report this Question!</span>
            <div className={classes.close} onClick={onCloseHandler}>X</div>
          </div>
          <form className={classes.content}>
            <textarea
              name="feedback"
              id=""
              rows="10"
              placeholder="Please type your feedback here. Specify the Specific details like questions number, test Name and course Name."
              ref={inputRef}
            ></textarea>
            <button type="submit" onClick={(e)=>{submitHandler(e)}}>Report</button>
          </form>
        </div>
      </>,
      document.getElementsByClassName(address)[0]
    );
}

export default Report