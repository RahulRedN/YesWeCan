import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { resetQuestion } from "../redux/question_reducer";
import { resetResult } from "../redux/result_reducer";

import { db } from "../Firebase/config";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  getDocs,
} from "firebase/firestore";

export const useGetResult = (otherData) => {
  const dispatch = useDispatch();
  const [result, setResult] = useState({ result: {}, response: {} });
  const [getResults, setResults] = useState();

  const answered = useSelector((state) => state.results.result);
  const status = useSelector((state) => state.results.status);
  const timer = useSelector((state) => state.results.timer);

  // Set Answeres from Database
  useEffect(() => {
    const fetch = async () => {
      try {
        const docRef = doc(db, "exams", otherData.examId);
        const res = await getDoc(docRef);
        if (res.exists) {
          setResults(res.data().answeres);
        }
      } catch (err) {
        alert("Server Error");
        console.log(err);
      }
    };
    fetch();
  }, []);

  // Creating Exam result Objects to upload and display
  useEffect(() => {
    if (getResults) {
      const response = {};

      //Setting Response Obj
      for (let key in timer) {
        if (status[key].isMarked && status[key].isAnswered) {
          response[key] = {
            isMandS: true,
            timeSpent: timer[key],
            ans: answered[key],
          };
        } else if (status[key].isMarked) {
          response[key] = {
            isM: true,
            timeSpent: timer[key],
          };
        } else if (status[key].isAnswered) {
          response[key] = {
            isA: true,
            timeSpent: timer[key],
            ans: answered[key],
          };
        } else if (status[key].isVisited) {
          response[key] = {
            isNA: true,
            timeSpent: timer[key],
          };
        }
      }

      //response Object
      const Responses = {
        sectionDetails: getResults.sections,
        resObj: response,
      };

      // Setting Result Object
      const resultObj = {
        maxMarks: getResults.maxMarks,
        maxTime: getResults.maxTime,
        secDet: [],
      };

      const sectionDetails = [];

      for (let sec in getResults.sections) {
        sectionDetails.push({
          title: getResults.sections[sec].title,
          components: [],
        });
        for (let comp in getResults.sections[sec].components) {
          sectionDetails[sec].components.push({
            title: getResults.sections[sec].components[comp].title,
            numQues: getResults.sections[sec].components[comp].numQues,
            correct: 0,
            wrong: 0,
            marks: [0, 0],
          });
        }
      }

      let total = 0;

      for (let res in response) {
        const [x, y, z] = res.split(" ");
        if (response[res].isA || response[res].isMandS) {
          if (getResults.answers[res].marks) {
            if (response[res].ans == getResults.answers[res].ans) {
              sectionDetails[x].components[y].correct++;
              sectionDetails[x].components[y].marks[0] +=
                getResults.answers[res].marks[0];
              total += getResults.answers[res].marks[0];
            } else {
              sectionDetails[x].components[y].wrong++;
              sectionDetails[x].components[y].marks[1] +=
                getResults.answers[res].marks[1];
              total -= getResults.answers[res].marks[1];
            }
          } else if (getResults.sections[x].components[y].compMarks) {
            if (response[res].ans == getResults.answers[res].ans) {
              sectionDetails[x].components[y].correct++;
              sectionDetails[x].components[y].marks[0] +=
                getResults.sections[x].components[y].compMarks[0];
              total += getResults.sections[x].components[y].compMarks[0];
            } else {
              sectionDetails[x].components[y].wrong++;
              sectionDetails[x].components[y].marks[1] +=
                getResults.sections[x].components[y].compMarks[1];
              total -= getResults.sections[x].components[y].compMarks[1];
            }
          } else if (getResults.sections[x].sectionMarks) {
            if (response[res].ans == getResults.answers[res].ans) {
              sectionDetails[x].components[y].correct++;
              sectionDetails[x].components[y].marks[0] +=
                getResults.sections[x].sectionMarks[0];
              total += getResults.sections[x].sectionMarks[0];
            } else {
              sectionDetails[x].components[y].wrong++;
              sectionDetails[x].components[y].marks[1] +=
                getResults.sections[x].sectionMarks[1];
              total -= getResults.sections[x].sectionMarks[1];
            }
          }
        }
      }

      resultObj.secDet = sectionDetails;
      const date = new Date();

      const post = async () => {
        try {
          const isPresentQuery = query(
            collection(db, "exam_results"),
            where("uid", "==", otherData.uid),
            where("examId", "==", otherData.examId),
            where("courseName", "==", otherData.courseName)
          );

          const isPresent = await getDocs(isPresentQuery);
          if (!isPresent.empty) {
            const existingData = {
              ...isPresent.docs[0].data(),
              id: isPresent.docs[0].id,
            };

            const enrollmentRef = otherData.courses.filter(
              (enroll) => enroll.courseId == otherData.courseId
            )[0].id;

            const enrollDocRef = doc(db, "enrollments", enrollmentRef);

            const enrollData = await getDoc(enrollDocRef);

            const newStaus = { ...enrollData.data().status };
            newStaus[otherData.examId][1]++;

            await updateDoc(enrollDocRef, {
              status: {
                ...newStaus,
              },
            });

            if (total > existingData.marks) {
              const examResultsDocRef = doc(
                db,
                "exam_results",
                existingData.id
              );

              await updateDoc(examResultsDocRef, {
                result: resultObj,
                response: Responses,
                marks: total,
              });

              const docQuery = query(
                collection(db, "results_simple"),
                where("uid", "==", otherData.uid),
                where("examId", "==", otherData.examId),
                where("courseId", "==", otherData.courseId)
              );

              const simpleResultsRes = await getDocs(docQuery);

              const simpleResulsDocRef = doc(
                db,
                "results_simple",
                simpleResultsRes.docs[0].id
              );

              await updateDoc(simpleResulsDocRef, {
                marks: total,
                maxMarks: resultObj.maxMarks,
                date: new Date().toLocaleString(),
              });
            } else {
              return;
            }
          } else {
            const resultsRef = collection(db, "exam_results");
            const resultsSimple = collection(db, "results_simple");
            if (result.result) {
              const res = await addDoc(resultsRef, {
                uid: otherData.uid,
                examId: otherData.examId,
                courseId: otherData.courseId,
                testSeriesId: otherData.testSeriesId,
                courseName: otherData.courseName,
                result: resultObj,
                response: Responses,
                marks: total,
              });
              const res1 = await addDoc(resultsSimple, {
                uid: otherData.uid,
                examId: otherData.examId,
                testSeriesId: otherData.testSeriesId,
                courseId: otherData.courseId,
                courseName: otherData.courseName,
                marks: total,
                maxMarks: resultObj.maxMarks,
                date: date.toLocaleString(),
              });

              const enrollmentRef = otherData.courses.filter(
                (enroll) => enroll.courseId == otherData.courseId
              )[0].id;

              const enrollDocRef = doc(db, "enrollments", enrollmentRef);

              const enrollData = await getDoc(enrollDocRef);

              await updateDoc(enrollDocRef, {
                status: {
                  ...enrollData.data().status,
                  [otherData.examId]: ["A", 1],
                },
              });
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
      post();

      setResult({ result: resultObj, response: Responses });
      dispatch(resetResult());
      dispatch(resetQuestion());
    }
  }, [getResults]);

  return [result, setResult];
};

export const useRankQuery = ({ examId, courseId, userId }) => {
  const [rank, setRank] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "results_simple"),
          where("examId", "==", examId),
          where("courseId", "==", courseId)
        );
        const querySnapshot = await getDocs(q);

        const userDocuments = querySnapshot.docs.filter(
          (doc) => doc.data().uid === userId
        );

        if (userDocuments.length === 0) {
          console.log("User data not found");
          return;
        }

        const userMarks = userDocuments[0].data().marks;

        const rank = querySnapshot.docs.reduce((acc, doc) => {
          const docMarks = doc.data().marks;
          if (docMarks > userMarks) {
            return acc + 1;
          }
          return acc;
        }, 1);

        setRank(rank);
      } catch (error) {
        console.log("Error getting documents:", error);
      }
    };

    fetchData();
  }, []);

  return [rank, setRank];
};
