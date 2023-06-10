import React, { useEffect, useState, useReducer } from "react";

import { useFetchQuestion } from "../../hooks/FetchQuestion";
import { reducerAlert } from "../OnlineExamComponents/reducers/reducers";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ShowAllInstructions from "../OnlineExamComponents/Instructions/ShowAllInstructions";
import Alert from "../Floats/Alert";
import ExamPanel from "../OnlineExamComponents/ExamPanel";
import classes from "./OnlineExamPage.module.css";
import { useSelector } from "react-redux";

const OnlineExamPage = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  const [isAlert, dispatchAlert] = useReducer(reducerAlert, [false, {}]);
  if (isLoading) return <h3>Loading...</h3>;
  if (serverError) return <h3>Server Error</h3>;

  const getData = useSelector((state) => state.questions.queue);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const handle = useFullScreenHandle();
  const resizeHandler = () => {
    if (isFullScreen) {
      handle.enter();
    } else {
      handle.exit();
    }
  };
  useEffect(() => {
    resizeHandler();
  }, [isFullScreen]);

  return (
    <>
      <FullScreen handle={handle} className={classes.view}>
        <Alert
          isAlert={isAlert}
          closeHandler={() => dispatchAlert({ type: "Reset" })}
          address="fullscreen"
        />
        {showInstructions && (
          <ShowAllInstructions
            onCloseHandler={() => {
              setShowInstructions(false);
            }}
          />
        )}
        <div className={classes.nav}>
          <div className={classes.navEle}>
            <span>
              <img src="/assets/Logo.png" alt="" />
            </span>{" "}
            <span>Exam-Name</span>
          </div>
          <div className={classes.navEle}>
            <button
              onClick={() => {
                setIsFullScreen((prev) => !prev);
              }}
            >
              <i className="fa-solid fa-expand"></i>
            </button>
          </div>
        </div>
        <div className={classes.addition}>
          <div className={classes.addBut}>
            Question Paper
          </div>
          <div
            className={classes.addBut}
            onClick={() => {
              setShowInstructions(true);
            }}
          >
            Instructions
          </div>
        </div>
        <div className={classes.examPanel}>
          <ExamPanel questions={getData} dispatchAlert={dispatchAlert} />
        </div>
      </FullScreen>
    </>
  );
};

export default OnlineExamPage;
