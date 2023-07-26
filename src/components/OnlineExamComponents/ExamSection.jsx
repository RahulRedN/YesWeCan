import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SetQuestion, SetComp, SetSection } from "../../hooks/FetchQuestion";
import {
  SetVisit,
  ClearQues,
  SaveNext,
  MarkQues,
  MarkSaveQues,
} from "../../hooks/SetResult";
import { reducerStatus, reducerMarks } from "./reducers/reducers";

import Report from "../Floats/Report";
import Timer from "./Utility/Timer";
import Status from "./Status";
import Question from "./QuestionDisplay/Question";

import classes from "../OnlineExam/OnlineExamPage.module.css";
import QuestionButtons from "./QuestionButtons";

const ExamSection = (props) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.results.status);

  const [statusComponent, dispatchStatus] = useReducer(reducerStatus, {
    ans: 0,
    nAns: 0,
    mark: 0,
    markS: 0,
    nVisit: 0,
  });

  const [marks, dispatchMarks] = useReducer(reducerMarks, [0, 0]);

  const [component, setComponent] = useState(null);
  const [question, setQuestion] = useState(null);
  const [direction, setDirection] = useState(null);
  const [isReport, setIsReport] = useState(false);

  useEffect(() => {
    if (props.questions && props.questions.length > 0) {
      setComponent(props.questions[props.trace[0]].components[props.trace[1]]);
      setQuestion(
        props.questions[props.trace[0]].components[props.trace[1]].questions[
          props.trace[2]
        ]
      );
      if (
        props.questions[props.trace[0]].components[props.trace[1]].directions
      ) {
        setDirection(
          props.questions[props.trace[0]].components[props.trace[1]].directions
        );
      }
    }

    if (props.questions && props.questions.length > 0) {
      if (props.questions[props.trace[0]].sectionMark) {
        dispatchMarks({
          type: "SetMarks",
          payload: [...props.questions[props.trace[0]].sectionMark],
        });
      } else if (
        props.questions[props.trace[0]].components[props.trace[1]].componentMark
      ) {
        dispatchMarks({
          type: "SetMarks",
          payload: [
            ...props.questions[props.trace[0]].components[props.trace[1]]
              .componentMark,
          ],
        });
      } else if (
        props.questions[props.trace[0]].components[props.trace[1]].questions[
          props.trace[2]
        ].mark
      ) {
        dispatchMarks({
          type: "SetMarks",
          payload: [
            ...props.questions[props.trace[0]].components[props.trace[1]]
              .questions[props.trace[2]].mark,
          ],
        });
      }
    }
  }, [props.questions, props.trace]);

  useEffect(() => {
    dispatch(SetVisit(props.trace));
  }, [props.trace]);

  useEffect(() => {
    const compLen = component?.questions.length;
    dispatchStatus({
      type: "UpdateStatus",
      payload: { len: compLen, status: status, trace: props.trace },
    });
  }, [status, component]);

  const onClickHandler = (idx) => {
    props.onQuesClickHandler(idx);
  };

  //NavigationHandlers
  const onPrevHandler = () => {
    props.timeHandlers.quesHandler(props.trace[2] - 1);
    dispatch(SetQuestion(props.trace[2] - 1));
  };

  const nextHandler = () => {
    if (
      props.questions[props.trace[0]].components[props.trace[1]].questions[
        props.trace[2] + 1
      ]
    ) {
      const idx = props.trace[2] + 1;
      props.timeHandlers.quesHandler(idx);
      dispatch(SetQuestion(idx));
    } else if (
      props.questions[props.trace[0]].components[props.trace[1] + 1] &&
      !props.timeState.isComponent[0]
    ) {
      props.timeHandlers.compHandler(props.trace[1] + 1);
      dispatch(SetComp(props.trace[1] + 1));
    } else if (
      props.questions[props.trace[0] + 1] &&
      !props.timeState.isComponent[0] &&
      !props.timeState.isSection[0]
    ) {
      props.timeHandlers.sectionHandler(props.trace[0] + 1);
      dispatch(SetSection(props.trace[0] + 1));
    } else {
      if (props.timeState.isComponent[0] || props.timeState.isSection[0]) {
        props.dispatchAlert({
          type: "Set",
          payload: {
            title: "Alert!",
            content:
              "Wait for current time to end to move forward to the next section!",
            closeContent: "close",
          },
        });
        return;
      }
      props.dispatchAlert({
        type: "Set",
        payload: {
          title: "Alert!",
          content: "You have come to the end of the test",
          closeContent: "close",
        },
      });
      dispatch(SetSection(0));
    }
  };

  const onClearHandler = () => {
    props.setCheck(undefined);
    dispatch(ClearQues(props.trace));
  };

  const onMarkNextHandler = () => {
    if (props.check || props.check === 0) {
      const arr = [...props.trace, props.check];
      dispatch(MarkSaveQues(arr));
      nextHandler();
    } else {
      dispatch(MarkQues(props.trace));
      nextHandler();
    }
  };

  const onSaveNextHandler = () => {
    if (props.check || props.check === 0) {
      const arr = [...props.trace, props.check];
      dispatch(SaveNext(arr));
      nextHandler();
    } else {
      nextHandler();
    }
  };

  const [collapse, setCollapse] = useState(false);
  const quetionDivClass =
    classes.questionDisplay +
    " " +
    (collapse ? classes.afterCollapse : classes.beforeCollapse);
  const navPanelClass =
    classes.examNavPanel + " " + (collapse ? classes.collapse : "");

  return (
    <>
      {isReport && (
        <Report
          address="fullscreen"
          onCloseHandler={() => {
            setIsReport(false);
          }}
        />
      )}
      <div className={classes.container}>
        <div className={quetionDivClass}>
          <div className={classes.questionType}>
            Question Type:{" "}
            {question?.isInt ? "Integer Type" : "Multiple Choice Question"}
          </div>
          <div className={classes.questionHeader}>
            <div className={classes.headerElements}>
              <div className={classes.element1}>
                <label htmlFor="lang">View : </label>
                <select name="lang" defaultValue={0}>
                  <option value="0">English</option>
                </select>
              </div>
              <div className={classes.element2}>
                <div className={classes.positive}>
                  <i className="fa-solid fa-thumbs-up"></i>{" "}
                  <div>+{marks[0]}</div>
                </div>
                <div className={classes.negative}>
                  <i className="fa-solid fa-thumbs-down"></i>{" "}
                  <div>-{marks[1]}</div>
                </div>
                <div>
                  <i className="fa-regular fa-clock"></i>{" "}
                  <Timer timer={props.timer} />
                </div>
                <div
                  className={classes.report}
                  onClick={() => {
                    setIsReport(true);
                  }}
                >
                  <i className="fa-solid fa-bug"></i> Report
                </div>
              </div>
            </div>
          </div>
          <Question
            question={question}
            trace={props.trace}
            check={props.check}
            setCheck={props.setCheck}
            direction={direction}
          />
        </div>
        <div className={collapse ? classes.minMaxRight : classes.minMax}>
          <button
            onClick={() => {
              setCollapse((prev) => !prev);
            }}
          >
            {collapse ? <span>&lt;</span> : <span>&gt;</span>}
          </button>
        </div>
        <div className={navPanelClass}>
          <Status statusComp={statusComponent} />
          <div className={classes.navPanelHeading}>
            {component?.componentTitle}
          </div>
          <div className={classes.title}>Choose a question</div>
          <div className={classes.questionButtons}>
            <QuestionButtons
              component={component}
              trace={props.trace}
              status={status}
              onClickHandler={onClickHandler}
            />
          </div>
        </div>
      </div>
      <div className={classes.markOptions}>
        <div className={classes.basic}>
          <div className={classes.options1}>
            <button onClick={onMarkNextHandler}>Mark for Review & Next</button>
            <button onClick={onClearHandler}>Clear Response</button>
          </div>
          <div className={classes.options2}>
            {props.trace && props.trace[2] != 0 ? (
              <button onClick={onPrevHandler}>Previous</button>
            ) : (
              <span></span>
            )}
            <button onClick={onSaveNextHandler}>Save & Next</button>
          </div>
        </div>
        <div className={classes.submit}>
          <button>Submit</button>
        </div>
      </div>
    </>
  );
};

export default ExamSection;
