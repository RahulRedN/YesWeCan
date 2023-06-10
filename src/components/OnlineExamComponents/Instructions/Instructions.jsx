import React from "react";
import classes from "../../OnlineExam/OnlineExamInstructions.module.css";

const Instructions = () => {
  return (
    <div className={classes.instructionsContent}>
      <div className={classes.contentHeader}>
        <h4>Please read the following instructions carefully.</h4>
      </div>
      <div className={classes.contentBody}>
        <h4>General Instructions:</h4>
        <ol>
          <li>
            Total of hrs duration will be given to attempt all the questions
          </li>
          <li>
            The clock has been set at the server and the countdown timer at the
            top right corner of your screen will display the time remaining for
            you to complete the exam. When the clock runs out ,the exam ends by
            default - you are not required to end or submit your exam.
          </li>
          <li>
            The question palatte at the right of screen shows one of the
            following statuses of each of the questions numbered.
            <ul className={classes.paddingPalatte}>
              <li>
                <div className={classes.card + " " + classes.normal}>0</div> You
                have not visited the question yet.
              </li>
              <li>
                <div className={classes.card + " " + classes.answered}>1</div>{" "}
                You have answered the question.
              </li>
              <li>
                <div className={classes.card + " " + classes.notAnswered}>
                  2
                </div>{" "}
                You have not answered the question.
              </li>
              <li>
                <div className={classes.card + " " + classes.marked}>3</div> You
                have NOT answered the question but have marked the question for
                review.
              </li>
              <li>
                <div className={classes.card + " " + classes.markedS}>4</div>{" "}
                You have answered the question but marked it for review.
              </li>
              <li>
                The Marked for review status simply acts as a reminder that you
                have set to look at the question again.{" "}
                <i className={classes.effect}>
                  If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation.
                </i>
              </li>
            </ul>
          </li>
        </ol>
      </div>
      <div className={classes.contentBody}>
        <h4>Navigating to a question</h4>
        <ol start={4}>
          <li>
            To select a question to answer, you can do one of the following:
            <ol className={classes.padding} type="a">
              <li>
                CLick on the question number on the question palatte at the
                right of your screen to go to that numbered question directly.
                Note that using his option does NOT save your answer to the
                current question
              </li>
              <li>
                Click on Save and Next to save answer to current question to go
                to the next question in sequence.
              </li>
              <li>
                Click on Mark for Review and Next to save answer to current
                question, mark it for review, and to go to the next question in
                the sequence.
              </li>
            </ol>
          </li>
          <li>
            You can view the entire paper by clicking on the{" "}
            <span>Question Paper</span> button.
          </li>
        </ol>
      </div>
      <div className={classes.contentBody}>
        <h4>Answering Question:</h4>
        <ol start={6}>
          <li>
            For multiple choice type question:
            <ol className={classes.padding} type="a">
              <li>
                To select your answer, click on one of the option buttons.
              </li>
              <li>
                To change your answer, click the another desired option buttons.
              </li>
              <li>
                To save your answer, you MUST click on <span>Save & Next</span>
              </li>
              <li>
                To deselect a chosen answer, click on the chosen option again or
                click on the <span>Clear Response</span> button.
              </li>
              <li>
                To mark a question for review click on{" "}
                <span>Mark for Review & Next</span>.{" "}
                <i className={classes.effect}>
                  If an answer is selected for a question that is Marked for
                  Review, the answer will be considered in the final evaluation{" "}
                </i>
              </li>
            </ol>
          </li>
          <li>
            For a numerical answer type question
            <ol className={classes.padding} type="a">
              <li>
                To enter a number as your answer, use the virtual numerical
                keypad
              </li>
              <li>
                A fraction (eg. 0.3 or -0.3) can be entered as answer ONLY with
                '0' before the decimal point
              </li>
              <li>
                To save your answer, you MUST click on <span>Save & Next</span>
              </li>
              <li>
                To clear your answer, click on the <span>Clear Response</span>{" "}
                button
              </li>
            </ol>
          </li>
          <li>
            To change an answer to a question, first select the question and
            then click on the new answer option followed by a click on the{" "}
            <span>Save & Next</span> button.
          </li>
          <li>
            Questions that are saved or marked for review after asnwering will
            ONLY be considered for evaluation
          </li>
        </ol>
      </div>
      <div className={classes.contentBody}>
        <h4>Navigating throught sections :</h4>
        <ol start={10}>
          <li>
            Sections in this question paper are displayed on the top bar of the
            screen Questions in a section can be viewed by clicking on the
            section name. The section you are currently viewing is highlighted.
          </li>
          <li>
            After clicking the <span>Save & Next</span> button on the last
            question for a section, you will automatically be taken to the first
            question of the next section.
          </li>
          <li>
            You can move the mouse cursor over the section names to view the
            status of the questions for that section.
          </li>
          <li>
            You can shuffle between sections and questions anytime during the
            examination as per your convenience.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Instructions;
