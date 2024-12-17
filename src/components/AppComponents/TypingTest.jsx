import React, { useState, useEffect } from "react";
import { diffChars, diffWordsWithSpace } from "diff";
import styles from "./TypingTest.module.css";
import { db } from "../../Firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Firebase/AuthContexts";
import { setCourses } from "../../redux/user_reducer";

const TypingTest = () => {
  const [text, setText] = useState(
    "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC."
  );
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(10); // timer in seconds
  const [fullTime, setFullTime] = useState(600);
  const [isActive, setIsActive] = useState(false);
  const [fullErrors, setFullErrors] = useState(0);
  const [halfErrors, setHalfErrors] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const userData = useSelector((state) => state.user.myCourses);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const [useSearchParam] = useSearchParams();
  const selectedId = useSearchParam.get("selected");
  const testId = useSearchParam.get("test");

  useEffect(() => {
    const fetch = async () => {
      const courseDocRef = doc(db, "courses", "MX8z5Waz4PAb6pJzfJdk");
      const courseDocSnap = await getDoc(courseDocRef);

      if (courseDocSnap.exists()) {
        setText(courseDocSnap.data().tests[selectedId].tests[testId].content);
        const duration = courseDocSnap.data().tests[selectedId].duration;
        // setTimer(duration[0] * 60 + duration[1]);
        setFullTime(duration[0] * 60 + duration[1]);
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
        calculateResults();
        setIsActive(false);
        setShowResults(true);
        clearInterval(interval);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const saveResultsToFirestore = async (fullErrorCount, halfErrorCount) => {
    const userId = currentUser?.uid;
    if (!userId) return;

    const courseId = "kUvMeETRUBmlKMAO0BXt";
    const enrollId = userData.filter(
      (course) => course.courseId === courseId
    )[0]?.id;

    const userDocRef = doc(db, "enrollments", enrollId);

    const statusKey = `status.${selectedId}_${testId}`; // Key in the status object

    // Find the course and check if statusKey already exists
    const existingCourse = userData.find(
      (course) => course.courseId === courseId
    );
    const existingStatus = existingCourse?.status?.[`${selectedId}_${testId}`];
    const existingErrorRateString = existingStatus?.result?.errorRate; // e.g., "23.00%"
    const existingErrorRate = existingErrorRateString
      ? parseFloat(existingErrorRateString.replace("%", ""))
      : undefined; // Convert to number: 23.00

    const newErrorRateString = calculateErrorRate(
      fullErrorCount,
      halfErrorCount
    );
    const newErrorRate = parseFloat(newErrorRateString.replace("%", "")); // Convert to number: 23.00

    // Compare error rates
    if (existingErrorRate !== undefined && newErrorRate >= existingErrorRate) {
      console.log("New error rate is not better. No update performed.");
      return; // Exit the function
    }
    const resultData = {
      [statusKey]: {
        selectedTest: [selectedId, testId],
        result: {
          wpm: calculateWPM(fullErrorCount, halfErrorCount),
          rawWPM: calculateRawWPM(),
          accuracy: calculateAccuracy(fullErrorCount, halfErrorCount),
          fullErrors: fullErrorCount,
          halfErrors: halfErrorCount,
          errorRate: calculateErrorRate(fullErrorCount, halfErrorCount),
          totalKeystrokes: inputValue.length,
        },
      },
    };

    try {
      await updateDoc(userDocRef, resultData);

      // Update Redux Store
      const updatedCourses = userData.map((course) =>
        course.courseId === courseId
          ? {
              ...course,
              status: {
                ...course.status,
                [`${selectedId}_${testId}`]: {
                  selectedTest: [selectedId, testId],
                  result: {
                    wpm: calculateWPM(fullErrorCount, halfErrorCount),
                    rawWPM: calculateRawWPM(),
                    accuracy: calculateAccuracy(fullErrorCount, halfErrorCount),
                    fullErrors: fullErrorCount,
                    halfErrors: halfErrorCount,
                    errorRate: calculateErrorRate(
                      fullErrorCount,
                      halfErrorCount
                    ),
                    totalKeystrokes: inputValue.length,
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

  const splitPreserveSpacing = (text) => {
    // Regular expression to split words while keeping spaces and punctuation
    const wordParts = [];
    let remainingText = text;

    while (remainingText.length > 0) {
      // Match word or non-word characters
      const match = remainingText.match(/^(\s*\S+\s*)/);

      if (match) {
        wordParts.push(match[1]);
        remainingText = remainingText.slice(match[1].length);
      } else {
        // Fallback for any remaining characters
        wordParts.push(remainingText);
        remainingText = "";
      }
    }

    return wordParts;
  };

  const preprocessDiffWithSpacing = (differences) => {
    const processedDifferences = [];
    differences.forEach((part) => {
      if (part.value.trim() === "") {
        // Preserve pure whitespace parts
        processedDifferences.push({ ...part, value: part.value });
        return;
      }

      // Split the value into words while preserving spacing
      splitPreserveSpacing(part.value).forEach((word) => {
        processedDifferences.push({ ...part, value: word, count: word.length });
      });
    });

    return processedDifferences;
  };

  // Helper function to find which word is affected by an addition or removal
  const findAffectedWordIndex = (
    differences,
    currentIndex,
    words,
    flag = true
  ) => {
    let charCount = 0;
    for (let i = 0; i <= currentIndex; i++) {
      if (!differences[i].added && (flag || !differences[i].removed)) {
        charCount += differences[i].value.length;
      }
    }

    let wordCharCount = 0;
    for (let i = 0; i < words.length; i++) {
      wordCharCount += words[i].length + 1; // +1 for space
      if (charCount < wordCharCount) {
        return i;
      }
    }

    return -1;
  };

  const calculateResults = () => {
    const inputText = inputValue;
    let fullErrorCount = 0;
    let halfErrorCount = 0;

    const isPunctuation = (char) => /[.,;:!?']/.test(char);

    // Using diffChars to compare characters
    const difference = diffChars(text, inputText);

    const differences = preprocessDiffWithSpacing(difference);
    // Track original and input words for detailed error checking
    const originalWords = text.split(/\s+/);
    const inputWords = inputText.split(/\s+/);

    // Set to track words already counted for half errors
    const halfErrorWords = new Set();

    // Check for full errors and inverse capitalization
    for (let index = 0; index < differences.length; index++) {
      const part = differences[index];

      if (part.added) {
        // If added characters are in a word, mark the whole word as a full error
        const affectedWordIndex = findAffectedWordIndex(
          differences,
          index,
          inputWords,
          false
        );
        if (affectedWordIndex !== -1) {
          fullErrorCount += inputWords[affectedWordIndex].length;
        }
      } else if (part.removed) {
        // Check for inverse capitalization
        const removedChar = part.value;
        const nextPart = differences[index + 1];
        if (!nextPart) {
          fullErrorCount += removedChar.length;
          continue;
        }

        if (isPunctuation(removedChar) && removedChar.trim().length == 1) {
          const affectedWordIndex = findAffectedWordIndex(
            differences,
            index,
            originalWords
          );

          if (
            affectedWordIndex !== -1 &&
            !halfErrorWords.has(affectedWordIndex)
          ) {
            const originalWord = originalWords[affectedWordIndex];
            halfErrorCount += originalWord.length;

            if (
              nextPart &&
              nextPart.added &&
              isPunctuation(nextPart.value.trim())
            ) {
              index++;
            }
            continue;
          }
        }

        // Check if next part exists and is an added character
        if (nextPart && nextPart.added) {
          const addedChar = nextPart.value;

          // Check if characters are inverse capitalizations of each other
          if (
            removedChar.toLowerCase() === addedChar.toLowerCase() &&
            removedChar !== addedChar
          ) {
            // Find the word affected by this change
            const affectedWordIndexO = findAffectedWordIndex(
              differences,
              index,
              originalWords
            );

            const affectedWordIndexI = findAffectedWordIndex(
              differences,
              index,
              originalWords,
              false
            );

            if (affectedWordIndexO !== -1) {
              const originalWord = originalWords[affectedWordIndexO];
              const inputWord = inputWords[affectedWordIndexI];

              // Ensure the rest of the word remains the same
              if (
                originalWord.toLowerCase() === inputWord.toLowerCase() &&
                !halfErrorWords.has(affectedWordIndexO)
              ) {
                halfErrorCount += originalWord.length;
                halfErrorWords.add(affectedWordIndexO);

                // Skip the next part (added character)
                index++;
                continue;
              }
            }
          }
        }

        // If no inverse capitalization, mark as full error
        if (
          !halfErrorWords.has(
            findAffectedWordIndex(differences, index, originalWords)
          )
        ) {
          const affectedWordIndex = findAffectedWordIndex(
            differences,
            index,
            originalWords
          );
          if (affectedWordIndex !== -1) {
            fullErrorCount += originalWords[affectedWordIndex].length;
          }
        }
      }
    }

    setFullErrors(fullErrorCount);
    setHalfErrors(halfErrorCount);

    saveResultsToFirestore(fullErrorCount, halfErrorCount);
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);
    setHighlightedIndex(inputText.split(" ").length - 1);
  };

  const handleStartTest = () => {
    setIsActive(true);
  };

  const handleSubmit = () => {
    setIsActive(false);
    setShowResults(true);
    calculateResults();
  };

  const calculateWPM = (fullErrorCount, halfErrorCount) => {
    if (fullErrorCount != undefined && halfErrorCount != undefined) {
      const elapsedMinutes = (fullTime - timer) / 60;
      const correctCharacters =
        text.length - fullErrorCount - halfErrorCount / 2;
      const wpm = correctCharacters / 5 / elapsedMinutes;
      return isNaN(wpm) ? 0 : wpm.toFixed(2);
    }
    const elapsedMinutes = (fullTime - timer) / 60;
    const correctCharacters = text.length - fullErrors - halfErrors / 2;
    const wpm = correctCharacters / 5 / elapsedMinutes;
    return isNaN(wpm) ? 0 : wpm.toFixed(2);
  };

  const calculateRawWPM = () => {
    const elapsedMinutes = (fullTime - timer) / 60;
    const rawWPM = inputValue.trim().split(" ").length / elapsedMinutes;
    return isNaN(rawWPM) ? 0 : rawWPM.toFixed(2);
  };

  const calculateAccuracy = (fullErrorCount, halfErrorCount) => {
    if (fullErrorCount != undefined && halfErrorCount != undefined) {
      const accuracy =
        ((text.length - fullErrorCount - halfErrorCount / 2) / text.length) *
        100;
      return isNaN(accuracy) ? 0 : accuracy.toFixed(2);
    }
    const accuracy =
      ((text.length - fullErrors - halfErrors / 2) / text.length) * 100;
    return isNaN(accuracy) ? 0 : accuracy.toFixed(2);
  };

  const calculateErrorRate = (fullErrorCount, halfErrorCount) => {
    if (fullErrorCount != undefined && halfErrorCount != undefined) {
      const errorRate =
        ((fullErrorCount + halfErrorCount / 2) / text.length) * 100;
      return isNaN(errorRate) ? 0 : errorRate.toFixed(2);
    }
    const errorRate = ((fullErrors + halfErrors / 2) / text.length) * 100;
    return isNaN(errorRate) ? 0 : errorRate.toFixed(2);
  };

  // Convert timer to minutes and seconds format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={styles.container}>
      {!showResults ? (
        <>
          <div className={styles.contentSection}>
            <div className={styles.textContainer}>
              {text.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={`${styles.word} ${
                    index === highlightedIndex ? styles.highlighted : ""
                  }`}
                >
                  {word}{" "}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.optionSection}>
            <div className={styles.timerContainer}>
              <span>Time Remaining: {formatTime(timer)}</span>
              <button className={styles.startButton} onClick={handleStartTest}>
                Start
              </button>
              <button
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={!isActive}
              >
                Submit
              </button>
            </div>
            <textarea
              className={styles.inputArea}
              value={inputValue}
              onChange={handleInputChange}
              disabled={!isActive}
              placeholder="Start typing here..."
              spellCheck={false}
            />
          </div>
        </>
      ) : (
        <div className={styles.resultsContainer}>
          <div className={styles.resultsItem}>
            <span>WPM:</span>
            <span>{calculateWPM()}</span>
          </div>
          <div className={styles.resultsItem}>
            <span>Raw WPM:</span>
            <span>{calculateRawWPM()}</span>
          </div>
          <div className={styles.resultsItem}>
            <span>Accuracy:</span>
            <span>{calculateAccuracy()}%</span>
          </div>
          <div className={styles.resultsItem}>
            <span>Full Errors:</span>
            <span>{fullErrors}</span>
          </div>
          <div className={styles.resultsItem}>
            <span>Half Errors:</span>
            <span>{halfErrors}</span>
          </div>
          <div className={styles.resultsItem}>
            <span>Error Rate:</span>
            <span>{calculateErrorRate()}%</span>
          </div>
          <div className={styles.resultsItem}>
            <span>Total Keystrokes:</span>
            <span>{inputValue.length}</span>
          </div>
          <div style={{ color: "red", marginTop: "1rem", fontSize: "01.2rem" }}>
            Disclaimer: The error rate calculation is not 100% accurate and may
            vary by ±1~1.5%.
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
