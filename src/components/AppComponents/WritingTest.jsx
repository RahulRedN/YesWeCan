import React, { useState, useEffect } from "react";
import styles from "./TypingTest.module.css";
import { db } from "../../Firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Firebase/AuthContexts";
import { setCourses } from "../../redux/user_reducer";
import axios from "axios";

const WritingTest = () => {
  const [question, setQuestion] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(10); // timer in seconds
  const [isActive, setIsActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [testTitle, setTestTitle] = useState("");

  const userData = useSelector((state) => state.user.myCourses);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const [useSearchParam] = useSearchParams();
  const selectedId = useSearchParam.get("selected");
  const testId = useSearchParam.get("test");

  useEffect(() => {
    const fetch = async () => {
      const courseDocRef = doc(db, "courses", "xM7eVQmOzxtNq7RgJNtK");
      const courseDocSnap = await getDoc(courseDocRef);

      if (courseDocSnap.exists()) {
        const testData = courseDocSnap.data().tests[selectedId].tests[testId];
        setQuestion(testData.content);
        setTestTitle(courseDocSnap.data().tests[selectedId].title);
        const duration = courseDocSnap.data().tests[selectedId].duration;
        setTimer(duration[0] * 60 + duration[1]);
      }
    };

    fetch();
  }, [selectedId, testId]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      if (timer === 0) {
        handleSubmit();
        clearInterval(interval);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleStartTest = () => {
    setIsActive(true);
  };

  const handleSubmit = async () => {
    setIsActive(false);
    setLoading(true);

    const evaluationMetrics = testTitle.toLowerCase().includes("descriptive")
      ? "Thesis and Purpose (3 Marks), Content and Ideas (3 Marks), Organization and Structure (2 Marks), Clarity and Cohesion (3 Marks), Grammar, Mechanics, and Punctuation (3 Marks), Adherence to the Prompt (3 Marks), Critical Thinking and Analysis (3 Marks), Total Score: 20/20, Recommendations"
      : "Content and Relevance (2 Marks), Format and Structure (2 Marks), Language and Style (2 Marks), Clarity and Cohesion (2 Marks), Grammar, Mechanics, and Punctuation (2 Marks), Total Score: 10/10, Recommendations";

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Evaluate the following content based on these metrics: ${evaluationMetrics}. \n\nQuestion: ${question} \n\nAnswer: ${inputValue}`,
                },
              ],
            },
          ],
        }
      );

      const evaluationResponse = response.data;
      setApiResponse(evaluationResponse);

      await saveResultsToFirestore(evaluationResponse);
      setLoading(false);
      setShowResults(true);
    } catch (error) {
      console.error("Error evaluating response:", error);
      setLoading(false);
    }
  };

  const saveResultsToFirestore = async (evaluationResponse) => {
    const userId = currentUser?.uid;
    if (!userId) return;

    const courseId = "kUvMeETRUBmlKMAO0BXt";
    const enrollId = userData.filter(
      (course) => course.courseId === courseId
    )[0]?.id;

    const userDocRef = doc(db, "enrollments", enrollId);

    const statusKey = `status.writing_${selectedId}_${testId}`;

    const resultData = {
      [statusKey]: {
        selectedTest: [selectedId, testId],
        result: {
          question,
          typedContent: inputValue,
          evaluation: evaluationResponse,
        },
      },
    };

    try {
      await updateDoc(userDocRef, resultData);

      const updatedCourses = userData.map((course) =>
        course.courseId === courseId
          ? {
              ...course,
              status: {
                ...course.status,
                [`writing_${selectedId}_${testId}`]: {
                  selectedTest: [selectedId, testId],
                  result: {
                    question,
                    typedContent: inputValue,
                    evaluation: evaluationResponse,
                  },
                },
              },
            }
          : course
      );

      dispatch(setCourses(updatedCourses));
      console.log("Results saved successfully!");
    } catch (error) {
      console.error("Error saving results:", error);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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

  return (
    <div className={styles.writingTestContainer}>
      {loading ? (
        <div className={styles.writingTestLoadingScreen}>
          Evaluating your response...
        </div>
      ) : !showResults ? (
        <>
          <div className={styles.writingTestQuestionSection}>
            <h3>{question}</h3>
          </div>
          <div className={styles.writingTestTimerSection}>
            <span>Time Remaining: {formatTime(timer)}</span>
          </div>
          <textarea
            className={styles.writingTestInputArea}
            value={inputValue}
            onChange={handleInputChange}
            disabled={!isActive}
            placeholder="Start typing your answer here..."
            spellCheck={false}
            onPaste={(e) => e.preventDefault()}
          />
          <div className={styles.writingTestButtonContainer}>
            <button
              className={styles.writingTestStartButton}
              onClick={handleStartTest}
              disabled={isActive}
            >
              Start
            </button>
            <button
              className={styles.writingTestSubmitButton}
              onClick={handleSubmit}
              disabled={!isActive}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <div
          style={{ marginBottom: "2 rem" }}
          className={styles.writingTestResultsContainer}
        >
          <h3>Results</h3>
          <Link
            className={styles.writingTestResultButton}
            to={`/user/viewResultType?selected=${selectedId}&test=${testId}&type=writing`}
          >
            View Full Result
          </Link>
          <div style={{ display: "flex" }}>
            <p style={{ marginRight: "0.5 rem", width: "50%" }}>
              <strong>Your Answer:</strong>
              <div>
                {inputValue.split("\n").map((line, index) => (
                  <p key={index} style={{ marginBottom: "5px" }}>
                    {line}
                  </p>
                ))}
              </div>
            </p>
            <div className={styles.writingTestEvaluationSection}>
              {apiResponse &&
                formatApiResponse(
                  apiResponse?.candidates[0].content?.parts[0].text
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingTest;
