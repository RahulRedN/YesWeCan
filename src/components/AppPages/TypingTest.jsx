import React, { useState, useEffect } from "react";
import styles from "./TypingTest.module.css";

const TypingTest = () => {
  const [text, setText] = useState(
    "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC."
  );
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(20); // Timer in seconds
  const [isActive, setIsActive] = useState(false);
  const [fullErrors, setFullErrors] = useState(0);
  const [halfErrors, setHalfErrors] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const totalCharacters = text.length;

  // Timer management
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      if (timer === 0) {
        setIsActive(false);
        setShowResults(true);
        clearInterval(interval);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);

    const { fullErrorCount, halfErrorCount } = calculateErrors(text, inputText);

    setFullErrors(fullErrorCount);
    setHalfErrors(halfErrorCount);
    setHighlightedIndex(inputText.trim().split(/\s+/).length - 1);
  };

  const handleStartTest = () => {
    setIsActive(true);
    setTimer(20); // Reset the timer
    setInputValue(""); // Clear input
    setFullErrors(0); // Reset error counts
    setHalfErrors(0);
  };

  const calculateWPM = () => {
    const elapsedMinutes = (20 - timer) / 60;
    const correctCharacters = totalCharacters - fullErrors - halfErrors / 2;
    const wpm = correctCharacters / 5 / elapsedMinutes;
    return isNaN(wpm) ? 0 : wpm.toFixed(2);
  };

  const calculateRawWPM = () => {
    const elapsedMinutes = (20 - timer) / 60;
    const rawWPM = inputValue.trim().split(" ").length / elapsedMinutes;
    return isNaN(rawWPM) ? 0 : rawWPM.toFixed(2);
  };

  const calculateAccuracy = () => {
    const accuracy =
      ((totalCharacters - fullErrors - halfErrors / 2) / totalCharacters) * 100;
    return isNaN(accuracy) ? 0 : accuracy.toFixed(2);
  };

  const calculateErrorRate = () => {
    const errorRate = ((fullErrors + halfErrors / 2) / totalCharacters) * 100;
    return isNaN(errorRate) ? 0 : errorRate.toFixed(2);
  };

  // Function to calculate full and half errors
  const calculateErrors = (original, input) => {
    const originalWords = original.split(/\s+/);
    const inputWords = input.split(/\s+/);

    let fullErrorCount = 0;
    let halfErrorCount = 0;

    let originalIndex = 0;

    inputWords.forEach((inputWord, inputIndex) => {
      if (originalIndex < originalWords.length) {
        const originalWord = originalWords[originalIndex];

        if (inputWord === originalWord) {
          // Correct word
          originalIndex++;
        } else if (inputWord.toLowerCase() === originalWord.toLowerCase()) {
          // Case mismatch (e.g., capitalization issue)
          halfErrorCount++;
          originalIndex++;
        } else if (
          inputWord.replace(/[.,!?]/g, "") ===
          originalWord.replace(/[.,!?]/g, "")
        ) {
          // Punctuation error
          halfErrorCount++;
          originalIndex++;
        } else if (originalWords.includes(inputWord, originalIndex)) {
          // Word out of order
          halfErrorCount++;
        } else if (
          inputWord.length < originalWord.length &&
          originalWord.startsWith(inputWord)
        ) {
          // Incomplete word
          fullErrorCount++;
        } else {
          // Completely incorrect word
          fullErrorCount++;
        }
      } else {
        // Extra words beyond the original
        fullErrorCount++;
      }
    });

    // Remaining unmatched original words
    const unmatchedOriginalWords = originalWords.slice(originalIndex);
    fullErrorCount += unmatchedOriginalWords.length;

    return { fullErrorCount, halfErrorCount };
  };

  return (
    <div className={styles.container}>
      {!showResults ? (
        <>
          <div
            className={styles.contentSection}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onSelectStart={(e) => e.preventDefault()}
          >
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
              <span>Time Remaining: {timer} seconds</span>
              <button className={styles.startButton} onClick={handleStartTest}>
                Start
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
        </div>
      )}
    </div>
  );
};

export default TypingTest;
