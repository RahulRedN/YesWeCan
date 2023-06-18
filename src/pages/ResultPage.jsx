import React from 'react'
import ResultComponent from '../components/ResultPage/ResultComponent';
import classes from './ResultPage.module.css'
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.view}>
      <div className={classes.details}>
        <div className={classes.result}>
          <ResultComponent classes={classes} />
        </div>
        <div className={classes.navigation}>
          <button>Home</button>
          <button onClick={()=>{navigate('/user')}}>Dashboard</button>
        </div>
      </div>
      <div className={classes.userDetails}>
        <img
          src="image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/user.jpeg";
          }}
        />
        <p>Mobile Number</p>
      </div>
    </div>
  );
}

export default ResultPage