import React, { useEffect, useState, useReducer } from "react";

import { useFetchQuestion } from "../../hooks/FetchQuestion";
import { reducerAlert } from "../OnlineExamComponents/reducers/reducers";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ShowAllInstructions from "../OnlineExamComponents/Instructions/ShowAllInstructions";
import Alert from "../Floats/Alert";
import ExamPanel from "../OnlineExamComponents/ExamPanel";
import classes from "./OnlineExamPage.module.css";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { BsFullscreen } from "react-icons/bs";
import { BsFullscreenExit } from "react-icons/bs";

const OnlineExamPage = () => {
  const [searchParams, setParams] = useSearchParams();
  const id = searchParams.get("id");
  const courseName = searchParams.get("courseName");

  const nav = useNavigate();

  const [showInstructions, setShowInstructions] = useState(false);
  const [{ status }] = useFetchQuestion(id);
  const [isAlert, dispatchAlert] = useReducer(reducerAlert, [false, {}]);
  if (status == "server") {
    alert("Server Error");
    nav("/user");
    return <>Server Error</>;
  }

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
              <img
                style={{ paddingTop: "0.2rem" }}
                src="/assets/AppLogo.png"
                alt=""
              />
            </span>{" "}
            <span>{courseName}</span>
          </div>
          <div className={classes.navEle}>
            <button
              onClick={() => {
                setIsFullScreen((prev) => !prev);
              }}
            >
              {isFullScreen ? (
                <BsFullscreenExit strokeWidth={1.01} />
              ) : (
                <BsFullscreen strokeWidth={1.01} />
              )}
            </button>
          </div>
        </div>
        <div className={classes.addition}>
          <div
            className={classes.addBut}
            onClick={() => {
              setShowInstructions(true);
            }}
          >
            Instructions
          </div>
        </div>
        <div
          className={classes.examPanel}
          onCopy={(e) => {
            e.preventDefault();
          }}
        >
          <ExamPanel
            questions={getData}
            dispatchAlert={dispatchAlert}
            courseName={courseName}
          />
        </div>
      </FullScreen>
    </>
  );
};

export default OnlineExamPage;
