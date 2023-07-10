import React from "react";

import QuestionTypeDisplay from "./QuestionTypeDisplay";

import './Ques.css'

import classes from "./QuestionView.module.css";

const QuestionView = ({ response, examData, format }) => {
  return (
    <div className={classes.display + " effect"}>
      <div className={classes.downloadPaper}>
        <a
          href={examData?.questionPaper}
          download={"Question Paper"}
          target="_blank"
        >
          Download Paper
        </a>
      </div>
          <div className={classes.ansKey}>
              <h3>Answer Key</h3>
              <img src={examData?.ansKey} alt="Answer Key" />
          </div>
          <div className={classes.questionDisplay}>
              <h2>Questions:</h2>
              {examData?.questions.map((section, secIdx) => {
                  return (
                      <div className={classes.sectionDiv} key={secIdx}>
                          <h3>Section Title: {section.sectionTitle}</h3>
                          {section.components.map((component, compIdx) => {
                              return <div className={classes.componentDiv} key={`${secIdx} ${compIdx}`}>
                                  <h3>{component.componentTitle}</h3>
                                  {component.questions.map((ques, quesIdx) => {
                                      const index = `${secIdx} ${compIdx} ${quesIdx}`
                                      return (
                                        <QuestionTypeDisplay
                                          direction={component.directions}
                                          solution={
                                            examData.solutions &&
                                            examData?.solutions[index]
                                          }
                                          ques={ques}
                                          ans={
                                            examData?.answeres.answers[index]
                                          }
                                          key={index}
                                          idx={quesIdx}
                                          format={format}
                                          response={response.resObj[index]}
                                        />
                                      );
                                    })}
                          </div>
                      })}
                    </div>
                  );
              })}
          </div>
    </div>
  );
};

export default QuestionView;
