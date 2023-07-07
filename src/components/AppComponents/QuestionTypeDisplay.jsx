import React from "react";

import MathJaxRender from "../OnlineExamComponents/Utility/MathJaxRender";

import classes from "./QuestionTypeDisplay.module.css";

const QuestionTypeDisplay = ({
  ques,
  ans,
  direction,
  idx,
  format,
  response,
  solution,
}) => {
  let content = "content";
  if (ques.isInt) {
    content = (
      <>
        Question : {idx + 1}
        <div className={classes.question}>
          {ques?.question.equ ? (
            <MathJaxRender mathml={ques?.question.equ} />
          ) : (
            ""
          )}
          {ques?.question.img ? (
            <img
              src={ques?.question.img}
              className={classes.image}
              alt="image"
            />
          ) : (
            ""
                )}
        </div>
        <div className={classes.solution}>
          Solution:
          {solution && <img src={solution}></img>}
          <div className={classes.cardDiv}>
            <div className={classes.card + " " + classes.ans}>
              {"Answer : " + ans.ans}
            </div>
            {response == undefined ? (
              <div className={classes.card}> Not Visited</div>
            ) : (
              ""
            )}
            {response?.isNA && (
              <div className={classes.card + " " + classes.notAnswered}>
                {" "}
                Not Answered
              </div>
            )}
            {response?.isM && (
              <div className={classes.card + " " + classes.marked}>
                {" "}
                Marked For Review
              </div>
            )}
            {response?.isMandS && (
              <div
                className={
                  classes.card +
                  " " +
                  (response?.ans == ans.ans ? classes.valid : classes.invalid)
                }
              >
                {" "}
                Marked and Saved For Review : {response?.ans}{" "}
              </div>
            )}
            {response?.isA && (
              <div
                className={
                  classes.card +
                  " " +
                  (response?.ans == ans.ans ? classes.valid : classes.invalid)
                }
              >
                {" "}
                Answered : {response?.ans}{" "}
              </div>
            )}
            {response != undefined ? (
              <div className={classes.card}>
                Time Spent: {format(response.timeSpent)}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className={classes.directionDiv}>
          {ques.direction != undefined ? (
            <div className={classes.direction}>
              <h4 style={{ fontWeight: 600 }}>Direction :</h4>
              {direction[ques.direction].equ ? (
                <MathJaxRender mathml={direction[ques.direction].equ} />
              ) : (
                ""
              )}
              {direction[ques.direction].img ? (
                <img
                  src={direction[ques.direction].img}
                  className={classes.image}
                  alt="image"
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <div className={classes.question}>
            <h4 style={{ fontWeight: 600 }}>Question : {idx + 1}</h4>
            {ques?.question.equ ? (
              <MathJaxRender mathml={ques?.question.equ} />
            ) : (
              ""
            )}
            {ques?.question.img ? (
              <img
                src={ques?.question.img}
                className={classes.image}
                alt="image"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={classes.options}>
          Options:
          <ol>
            {ques?.options.map((option, idx) => (
              <li key={idx}>
                {option.equ ? <MathJaxRender mathml={option.equ} /> : ""}
                {option.img ? <img src={option.img} alt="image" /> : ""}
              </li>
            ))}
          </ol>
          <div className={classes.optionCard}></div>
        </div>
        <div className={classes.solution}>
          Solution:
          {solution && <img src={solution}></img>}
          <div className={classes.cardDiv}>
            {ques?.options.map((opt, quesIdx) => (
              <div
                className={
                  classes.card + " " + (ans.ans == quesIdx && classes.ans)
                }
                key={quesIdx}
              >
                {quesIdx + 1}
              </div>
            ))}
            {response == undefined ? (
              <div className={classes.card}> Not Visited</div>
            ) : (
              ""
            )}
            {response?.isNA && (
              <div className={classes.card + " " + classes.notAnswered}>
                {" "}
                Not Answered
              </div>
            )}
            {response?.isM && (
              <div className={classes.card + " " + classes.marked}>
                {" "}
                Marked For Review
              </div>
            )}
            {response?.isMandS && (
              <div
                className={
                  classes.card +
                  " " +
                  (response?.ans == ans.ans ? classes.valid : classes.invalid)
                }
              >
                {" "}
                Marked and Saved For Review : {response?.ans + 1}{" "}
              </div>
            )}
            {response?.isA && (
              <div
                className={
                  classes.card +
                  " " +
                  (response?.ans == ans.ans ? classes.valid : classes.invalid)
                }
              >
                {" "}
                Answered : {response?.ans + 1}{" "}
              </div>
            )}
            {response != undefined ? (
              <div className={classes.card}>
                Time Spent: {format(response.timeSpent)}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
  return <div className={classes.questionDiv}>{content}</div>;
};

export default QuestionTypeDisplay;
