import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SetSection, SetComp, SetQuestion } from "../../hooks/FetchQuestion";
import { SaveTimer } from "../../hooks/SetResult";

import classes from "../OnlineExam/OnlineExamPage.module.css";
import CountdownTimer from "./Utility/CountdownTimer";
import ComponentSection from "./ComponentSection";
import ExamSection from "./ExamSection";

import { useReducer } from "react";
import {
  reducer,
  reducerCoutdown,
  reducerTimeState,
} from "./reducers/reducers";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ExamPanel = (props) => {
  const user = useSelector((state) => state.user.data);
  const [searchParams, setParams] = useSearchParams();
  const examId = searchParams.get("id");
  const courseId = searchParams.get("courseId");
  const testId = searchParams.get("testId");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [check, setCheck] = useState(undefined);

  const trace = useSelector((state) => state.questions.trace);

  const [isRunning, setIsRunning] = useState(true);

  const [timer, dispatchTimer] = useReducer(reducer, {
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [countdown, dispatchCountdown] = useReducer(reducerCoutdown, {
    hour: 3,
    minute: 0,
    second: 0,
  });
  const [timeState, dispatchTimeState] = useReducer(reducerTimeState, {
    isTotal: true,
    isSection: [false, 0],
    isComponent: [false, 0, 0],
  });

  const saveTimer = () => {
    const arr = [timer.hour, timer.minute, timer.second];
    const index = `${trace[0]} ${trace[1]} ${trace[2]}`;
    const obj = { arr: arr, index: index };
    dispatch(SaveTimer(obj));
  };

  const timers = useSelector((state) => state.results.timer);
  const timeHandlers = {
    sectionHandler: (idx) => {
      saveTimer();
      if (timers) {
        const index = `${idx} ${0} ${0}`;
        if (timers[index]) {
          dispatchTimer({
            type: "SetTimer",
            payload: [...timers[index]],
          });
        } else {
          dispatchTimer({
            type: "SetTimer",
            payload: [0, 0, 0],
          });
        }
      }
    },
    compHandler: (idx) => {
      saveTimer();
      if (timers) {
        const index = `${trace[0]} ${idx} ${0}`;
        if (timers[index]) {
          dispatchTimer({
            type: "SetTimer",
            payload: [...timers[index]],
          });
        } else {
          dispatchTimer({
            type: "SetTimer",
            payload: [0, 0, 0],
          });
        }
      }
    },
    quesHandler: (idx) => {
      saveTimer();
      if (timers) {
        const index = `${trace[0]} ${trace[1]} ${idx}`;
        if (timers[index]) {
          dispatchTimer({
            type: "SetTimer",
            payload: [...timers[index]],
          });
        } else {
          dispatchTimer({
            type: "SetTimer",
            payload: [0, 0, 0],
          });
        }
      }
    },
    timeStateHandler: () => {
      if (timeState.isTotal) {
        navigate(
          "/result?id=" +
            examId +
            "&courseId=" +
            courseId +
            "&courseName=" +
            props.courseName +
            "&testId=" +
            testId
        );
        return;
      } else if (timeState.isSection[0]) {
        const index = timeState.isSection[1];
        if (props.questions[index + 1]) {
          dispatchTimeState({ type: "SetSection", index: index + 1 });
          timeHandlers.sectionHandler(index + 1);
          dispatch(SetSection(index + 1));
        } else {
          saveTimer();
          navigate(
            "/result?id=" +
              examId +
              "&courseId=" +
              courseId +
              "&courseName=" +
              props.courseName +
              "&testId=" +
              testId
          );
        }
      } else if (timeState.isComponent[0]) {
        const index = [timeState.isComponent[1], timeState.isComponent[2]];
        if (props.questions[index[0]].components[index[1] + 1]) {
          dispatchTimeState({ type: "SetComp", arr: [index[0], index[1] + 1] });
          timeHandlers.compHandler(index[1] + 1);
          dispatch(SetComp(index[1] + 1));
        } else if (props.questions[index[0] + 1]) {
          dispatchTimeState({ type: "SetComp", arr: [index[0] + 1, 0] });
          timeHandlers.sectionHandler(index[0] + 1);
          dispatch(SetSection(index[0] + 1));
        } else {
          saveTimer();
          navigate(
            "/result?id=" +
              examId +
              "&courseId=" +
              courseId +
              "&courseName=" +
              props.courseName +
              "&testId=" +
              testId
          );
        }
      }
    },
  };

  useEffect(() => {
    if (props.questions && props.questions.length > 0) {
      if (props.questions[0].totalTime) {
        dispatchTimeState({ type: "SetTotal" });
      } else if (props.questions[0].sectionTime) {
        dispatchTimeState({ type: "SetSection", index: 0 });
      } else if (props.questions[0].components[0].componentTime) {
        dispatchTimeState({ type: "SetComp", arr: [0, 0] });
      }
    }
  }, [props.questions]);

  useEffect(() => {
    if (props.questions && props.questions.length > 0) {
      if (timeState.isTotal) {
        dispatchCountdown({
          type: "SetCountdown",
          payload: [...props.questions[0].totalTime],
        });
      } else if (timeState.isSection[0]) {
        dispatchCountdown({
          type: "SetCountdown",
          payload: [...props.questions[timeState.isSection[1]].sectionTime],
        });
      } else if (timeState.isComponent[0]) {
        dispatchCountdown({
          type: "SetCountdown",
          payload: [
            ...props.questions[timeState.isComponent[1]].components[
              timeState.isComponent[2]
            ].componentTime,
          ],
        });
      }
    }
  }, [timeState]);

  const onSectionClickHandler = (idx) => {
    timeHandlers.sectionHandler(idx);
    dispatch(SetSection(idx));
  };

  const onComponentClickHandler = (idx) => {
    timeHandlers.compHandler(idx);
    dispatch(SetComp(idx));
  };

  const onQuesClickHandler = (idx) => {
    timeHandlers.quesHandler(idx);
    dispatch(SetQuestion(idx));
  };

  return (
    <>
      <div className={classes.examHeader}>
        <div className={classes.sections}>
          <div className={classes.section}>
            <div className={classes.sectionElements}>
              {props.questions?.map((section, idx) => (
                <button
                  disabled={timeState.isSection[0] || timeState.isComponent[0]}
                  className={trace[0] == idx ? classes.sectionActive : ""}
                  key={idx}
                  onClick={() => {
                    onSectionClickHandler(idx);
                  }}
                >
                  {section.sectionTitle}
                </button>
              ))}
            </div>
            <div
              className={classes.timer}
              style={{ display: "flex", alignItems: "center" }}
            >
              {timeState.isTotal
                ? "Total Time left : "
                : timeState.isSection[0]
                ? `${
                    props.questions[timeState.isSection[1]].sectionTitle
                  } Time left : `
                : `${
                    props.questions[timeState.isComponent[1]].components[
                      timeState.isComponent[2]
                    ].componentTitle
                  } Time left : `}
              <CountdownTimer
                isRunning={isRunning}
                countdown={countdown}
                dispatchCountdown={dispatchCountdown}
                dispatchTimer={dispatchTimer}
                timeStateHandler={timeHandlers.timeStateHandler}
              />
            </div>
          </div>
          <div className={classes.components}>
            <ComponentSection
              disabled={timeState.isComponent[0]}
              questions={props.questions}
              trace={trace}
              activeClass={classes.componentActive}
              onCompClickHandler={onComponentClickHandler}
              buttonClass={classes.buttonClass}
              componentClass={classes.componentClass}
            />
          </div>
        </div>
        <div className={classes.user}>
          <div className={classes.image}>
            <img
              src={user.photo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/user.jpeg";
              }}
            />
          </div>
          <div className={classes.details}>
            <p>{user.name}</p>
            <p>{user?.mobile ? user.mobile : "MobileNumber"}</p>
          </div>
        </div>
      </div>
      <div className={classes.mainExam}>
        <ExamSection
          timeHandlers={timeHandlers}
          questions={props.questions}
          trace={trace}
          check={check}
          setCheck={setCheck}
          onQuesClickHandler={onQuesClickHandler}
          timer={timer}
          timeState={timeState}
          dispatchAlert={props.dispatchAlert}
        />
      </div>
    </>
  );
};

export default ExamPanel;
