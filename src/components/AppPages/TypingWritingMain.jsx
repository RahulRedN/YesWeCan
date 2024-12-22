import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import styles from "./TypingMain.module.css"; // Import the modular CSS for styling
import { db } from "../../Firebase/config";
import { useAuth } from "../../Firebase/AuthContexts";
import { useSelector } from "react-redux";
import classes from "../AppComponents/TestCard.module.css";
import { Link } from "react-router-dom";

const TypingWritingMain = () => {
  const [courseData, setCourseData] = useState(null);
  const [tests, setTests] = useState([]);
  const [isCourseValid, setIsCourseValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTest, setSelectedTest] = useState(null); // State to track selected test for viewing details
  const { currentUser } = useAuth(); // Get user from your custom auth hook
  const course = useSelector(
    (state) =>
      state.user.myCourses.filter(
        (course) => course.courseId == "kUvMeETRUBmlKMAO0BXt"
      )[0]
  );

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch the course document using the ID "xM7eVQmOzxtNq7RgJNtK"
        const courseDocRef = doc(db, "courses", "xM7eVQmOzxtNq7RgJNtK");
        const courseDocSnap = await getDoc(courseDocRef);

        if (courseDocSnap.exists()) {
          setCourseData(courseDocSnap.data());
          // Fetch the enrollments collection to check if the user is enrolled
          const enrollmentsRef = collection(db, "enrollments");
          const q = query(
            enrollmentsRef,
            where("uid", "==", currentUser?.uid),
            where("courseID", "==", "kUvMeETRUBmlKMAO0BXt")
          );

          if (!course) {
            setIsCourseValid(false);
            setErrorMessage("Please renew the course.");
          } else {
            // Check if the current date is before the limit date
            const limitDate = new Date(course.limit); // Assuming limit is a Firestore timestamp
            const currentDate = new Date();

            if (currentDate < limitDate) {
              // Course is valid, map the tests
              setTests(courseDocSnap.data().tests || []);
            } else {
              setIsCourseValid(false);
              setErrorMessage("Please renew the course.");
            }
          }
        } else {
          console.log("No such course document!");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setIsCourseValid(false);
        setErrorMessage("Failed to load course data.");
      }
    };

    if (currentUser) {
      fetchCourseData();
    } else {
      setIsCourseValid(false);
      setErrorMessage("Please log in to view the course.");
    }
  }, [currentUser]);

  // Function to handle selecting a test
  const handleTestSelect = (test, idx) => {
    setSelectedTest({ ...test, id: idx });
  };

  // Function to handle going back to the list of tests
  const handleBack = () => {
    setSelectedTest(null); // Reset selected test
  };

  return (
    <div className={styles.typingMain}>
      {isCourseValid ? (
        <div className={styles.courseContent}>
          {selectedTest ? (
            <div className={styles.testDetailContainer}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <button className={styles.backButton} onClick={handleBack}>
                  Back
                </button>
                <h2 className={styles.courseTitle}>{selectedTest.title}</h2>
              </div>
              <div className={styles.testContainer}>
                {selectedTest.tests?.map((test, idx) => (
                  <div key={idx} className={classes.testCard}>
                    <div className={classes.cardHeader}>
                      <div className={classes.testTitle}>
                        {selectedTest.title} Test {idx + 1}
                      </div>
                    </div>
                    <hr />
                    <div className={classes.cardFooter}>
                      <Link
                        className={classes.start}
                        to={`/user/writingtest?selected=${selectedTest.id}&test=${idx}`}
                      >
                        START
                      </Link>
                      {course.status[`writing_${selectedTest.id}_${idx}`] && (
                        <Link
                          to={
                            "/user/viewResultType?selected=" +
                            selectedTest.id +
                            "&test=" +
                            idx +
                            "&type=writing"
                          }
                        >
                          Result
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <h2 className={styles.courseTitle}>Descriptive Tests</h2>
              <div className={styles.testContainer}>
                {tests?.map((test, idx) => (
                  <div
                    key={idx}
                    className={classes.testCard}
                    onClick={() => handleTestSelect(test, idx)} // Handle test selection
                  >
                    <div className={classes.cardHeader}>
                      <div className={classes.testTitle}>{test.title}</div>
                    </div>
                    <div
                      className={classes.cardBody}
                      style={{
                        padding: "1rem",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                      }}
                    >
                      {"OPEN"}
                    </div>
                  </div>
                ))}
                {!tests?.length && (
                  <div className={styles.noTests}>No tests added yet!</div>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};

export default TypingWritingMain;
