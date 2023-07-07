import React from 'react'
import ResultComponent from '../components/ResultPage/ResultComponent';

import { useGetResult } from '../hooks/GetResults'; 

import { useAuth } from '../Firebase/AuthContexts';

import classes from './ResultPage.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateInfo } from '../Loaders/Loaders';

const ResultPage = () => {
  const user = useSelector((state)=>state.user.data)
  const mycourses = useSelector((state) => state.user.myCourses);
  const [searchParams, setParams] = useSearchParams();
  const examId = searchParams.get("id");
  const testSeriesId = searchParams.get("testId");
  const courseId = searchParams.get("courseId");
  const courseName = searchParams.get("courseName");

  const { currentUser } = useAuth();
  
  const [result, setResult] = useGetResult({ uid: currentUser.uid, examId: examId, courseName: courseName, courseId: courseId, courses: mycourses , testSeriesId: testSeriesId});

  if (result) {
    updateInfo(user.uid);
  }

  const navigate = useNavigate();
  return (
    <div className={classes.view}>
      <div className={classes.details}>
        <div className={classes.result}>
          <ResultComponent result={result} classes={classes} />
        </div>
        <div className={classes.navigation}>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Dashboard
          </button>
        </div>
      </div>
      <div className={classes.userDetails}>
        <img
          src={user.photo}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/user.jpeg";
          }}
        />
        <p>{user?.mobile ? user.mobile : "MobileNumber"}</p>
      </div>
    </div>
  );
}

export default ResultPage