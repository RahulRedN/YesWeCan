import React, { useState } from "react";
import classes from "./ViewResult.module.css";
import styles from "../AppComponents/ViewResultContent.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

const ViewResultType = () => {
  const nav = useNavigate();
  const [searchParams, setParams] = useSearchParams();
  const selected = searchParams.get("selected");
  const test = searchParams.get("test");
  const type = searchParams.get("type");

  const resultData = useSelector((state) => state.user.myCourses).find(
    (course) => course.courseId == "kUvMeETRUBmlKMAO0BXt"
  ).status[`${type == "writing" ? "writing_" : ""}${selected}_${test}`];

  const [clicked, setClicked] = useState({
    isResult: true,
    isAnalysis: false,
  });

  const formatText = (text) =>
    text
      ? text.split("\n").map((line, index) => (
          <p key={index} style={{ marginBottom: "5px" }}>
            {line}
          </p>
        ))
      : "No text available";

  const formatApiResponse = (response) => {
    const formatInlineText = (text) => {
      const parts = text.split("**");
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <span key={`inline-${index}`} style={{ fontWeight: "bold" }}>
              {part}
            </span>
          );
        }
        return <span key={`inline-${index}`}>{part}</span>;
      });
    };

    // Split text into lines and process each line
    const lines = response.split("\n");

    return lines.map((line, lineIndex) => {
      // Handle headers (##)
      if (line.startsWith("##")) {
        return (
          <h2
            key={`line-${lineIndex}`}
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {line.replace("##", "").trim()}
          </h2>
        );
      }

      // Handle bullet points (*)
      if (line.trim().startsWith("* ")) {
        return (
          <li
            key={`line-${lineIndex}`}
            style={{
              marginLeft: "1.5rem",
            }}
          >
            {formatInlineText(line.replace(/^\s*\*\s*/, "").trim())}
          </li>
        );
      }

      // Handle regular text
      if (line.trim()) {
        return (
          <p key={`line-${lineIndex}`} style={{}}>
            {formatInlineText(line)}
          </p>
        );
      }

      // Handle empty lines
      return <br key={`line-${lineIndex}`} />;
    });
  };

  let content;

  if (type === "writing" && clicked.isResult) {
    content = (
      <div className={styles.writingResultContainer}>
        <div style={{ marginRight: "0.5rem", width: "50%" }}>
          <h3>Question</h3>
          <div className={styles.questionContainer}>
            <div>
              {formatText(
                resultData?.result?.question || "No question available"
              )}
            </div>
          </div>
          <div className={styles.typedContentContainer}>
            <h4>Content You Typed:</h4>
            <div>
              {formatText(
                resultData?.result?.typedContent || "No content available"
              )}
            </div>
          </div>
        </div>
        <div className={styles.evaluationContainer}>
          <div>
            {formatApiResponse(
              resultData?.result?.evaluation?.candidates[0].content?.parts[0]
                .text || "No evaluation available"
            )}
          </div>
        </div>
      </div>
    );
  } else if (clicked.isResult) {
    content = (
      <table className={styles.scoreCard}>
        <tbody>
          <tr>
            <th colSpan={2}>Typing Test Results (BEST RESULT **)</th>
          </tr>
          <tr>
            <th>Words Per Minute (WPM)</th>
            <td>{resultData?.result?.wpm}</td>
          </tr>
          <tr>
            <th>Raw Words Per Minute</th>
            <td>{resultData?.result?.rawWPM}</td>
          </tr>
          <tr>
            <th>Accuracy</th>
            <td>{resultData?.result?.accuracy}%</td>
          </tr>
          <tr>
            <th>Total Errors</th>
            <td>{resultData?.result?.fullErrors}</td>
          </tr>
          <tr>
            <th>Half Errors</th>
            <td>{resultData?.result?.halfErrors}</td>
          </tr>
          <tr>
            <th>Error Rate</th>
            <td>{resultData?.result?.errorRate}%</td>
          </tr>
          <tr>
            <th>Total Keystrokes</th>
            <td>{resultData?.result?.totalKeystrokes}</td>
          </tr>
        </tbody>
      </table>
    );
  } else if (clicked.isAnalysis) {
    content = (
      <>
        {type === "steno" && resultData?.result?.images?.length > 0 && (
          <div className={styles.stenoImageSection}>
            <h3>Reference Images</h3>
            <div className={styles.imageContainer}>
              {resultData?.result?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Steno Image ${index + 1}`}
                  className={styles.stenoImage}
                />
              ))}
            </div>
          </div>
        )}
        <div className={styles.analysisContainer}>
          <div className={styles.originalText}>
            <h3>Original Text</h3>
            <p>{resultData?.result?.content || "No original text available"}</p>
          </div>
          <div className={styles.typedText}>
            <h3>Typed Text</h3>
            <p>
              {resultData?.result?.typedContent || "No typed text available"}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <span>Results of Typing Test</span>{" "}
          <div
            className={classes.backButton}
            onClick={() => {
              nav(-1);
            }}
          >
            <RxCrossCircled color="white" size={30} strokeWidth={0.2} />
          </div>
        </div>
        <div className={classes.nav}>
          <ul>
            <li>
              <button
                onClick={() => {
                  setClicked({ isResult: true, isAnalysis: false });
                }}
                className={clicked.isResult ? classes.isActive : ""}
              >
                Result
              </button>
            </li>
            {type != "writing" && (
              <li>
                <button
                  onClick={() => {
                    setClicked({ isResult: false, isAnalysis: true });
                  }}
                  className={clicked.isAnalysis ? classes.isActive : ""}
                >
                  Analysis
                </button>
              </li>
            )}
          </ul>
        </div>

        <div
          className={classes.displayContent}
          onCopy={(e) => {
            e.preventDefault();
          }}
        >
          {content}
          <div className={styles.emptyHeight}></div>
        </div>
      </div>
    </>
  );
};

export default ViewResultType;
