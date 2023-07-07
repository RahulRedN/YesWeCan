import React, { useEffect, useState } from "react";

import Result from "../ResultPage/ResultComponent";
import QuestionView from "./QuestionView";
import TestsView from './TestsView'

import { useAuth } from "../../Firebase/AuthContexts";

import { useLoaderData, useSearchParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useRankQuery } from "../../hooks/GetResults";

import classes from "./ViewResultContent.module.css";

const ViewResultContent = ({ clicked, courseId }) => {
  const testData = useLoaderData();

  const [scoreCardData, setScoreCardDetails] = useState();
  const [examData, setExamData] = useState();

  const { currentUser } = useAuth();
  const [searchParams, setParams] = useSearchParams();
  const id = searchParams.get("id");


  const [rank, setRank] = useRankQuery({
    courseId: courseId,
    examId: id,
    userId: currentUser.uid,
  });

  const [resultData, setResultData] = useState();
  const [total, setTotal] = useState();

  const format = (arr) => {
    return `${String(arr[0]).padStart(2, "0")} : ${String(arr[1]).padStart(
      2,
      "0"
    )} : ${String(arr[2]).padStart(2, "0")} `;
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const fetchQuery = query(
          collection(db, "exam_results"),
          where("uid", "==", currentUser.uid),
          where("examId", "==", id),
          where("courseId", "==", courseId)
        );

        const res = await getDocs(fetchQuery);
        if (!res.empty) {
          const { result, response, marks } = res.docs[0].data();
          setResultData({ result: result, response: response });
          setTotal(marks);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchQuestions = async () => {
      try {
        const examsDocRef = doc(db, "exams", id);
        const res = await getDoc(examsDocRef);
        if (res.exists()) {
          const data = { ...res.data(), id: res.id };
          setExamData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchResults();
    fetchQuestions();
  }, []);

  let content;
  if (clicked.isScoreCard) {
    content = (
      <>
        <table className={classes.scoreCard}>
          <tbody>
            <tr>
              <th colSpan={2}>Score Card</th>
            </tr>
            <tr>
              <th>Total No. Of Questions</th>
              <td>{scoreCardData?.totalQuestions}</td>
            </tr>
            <tr>
              <th>Total Marks</th>
              <td>{resultData?.result.maxMarks}</td>
            </tr>
            <tr>
              <th>Total Duration</th>
              <td>{resultData && format(resultData?.result.maxTime)}</td>
            </tr>
            <tr>
              <th>Total Marks Scored</th>
              <td>
                {total}/{resultData?.result.maxMarks}
              </td>
            </tr>
            <tr>
              <th>Time Taken to complete Test</th>
              <td>
                {scoreCardData &&
                  `${format(scoreCardData?.timeSpent)}/ ${format(
                    resultData?.result.maxTime
                  )}`}
              </td>
            </tr>
            <tr>
              <th>Your Rank</th>
              <td>{rank}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else if (clicked.isResult) {
    content = (
      <>
        <div className={classes.result}>
          <Result
            classes={classes}
            result={resultData}
            setScoreCardDetails={setScoreCardDetails}
          />
        </div>
      </>
    );
  } else if (clicked.isPaper) {
    content = (
      <QuestionView
        response={resultData.response}
        examData={examData}
        format={format}
      />
    );
  } else if (clicked.isTest) {
    content = (
      <table className={classes.scoreCard}>
        <thead>
          <tr>
            <td>S.NO</td>
            <td>Test Name</td>
            <td>Marks</td>
            <td>Total</td>
            <td>Test Attempts</td>
            <td>Rank</td>
          </tr>
        </thead>
        <tbody>
          {testData.map((test, testIdx)=><TestsView key={testIdx} attempts={test.attempts} idx={testIdx} courseName={test.courseName} marks={test.marks} maxMarks={test.maxMarks} rank={test.rank}/>)}
        </tbody>
      </table>
    );
    // console.log(testData);
  } else {
    content = <p>Please watch explanation videos in YesWeCan App.</p>;
  }

  return (
    <>
      {content}
      <div className={classes.emptyHeight}></div>
    </>
  );
};

export default ViewResultContent;
