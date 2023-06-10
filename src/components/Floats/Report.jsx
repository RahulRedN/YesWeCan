import React from 'react'
import ReactDom from 'react-dom'
import classes from './Report.module.css'

const Report = ({address, onCloseHandler}) => {
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
              placeholder="Please type your feedback here."
            ></textarea>
            <button type="submit">Report</button>
          </form>
        </div>
      </>,
      document.getElementsByClassName(address)[0]
    );
}

export default Report