import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Redux action
import * as Action from "../redux/question_reducer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/config";

// To fetch API data and set value to store
export const useFetchQuestion = (id) => {
  const [getData, setGetData] = useState({
    status : "loading"
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // Async funtion to fetch data
    const fetch = async () => {
      try {
        const docRef = doc(db, "exams", id);
        const res = await getDoc(docRef);
        if (res.exists) {
          dispatch(Action.startExamAction(res.data().questions));
          setGetData({ status: "yes" });
        }
      } catch (error) {
        setGetData({ status: "server" });
        console.log(error);
      }
    }

    fetch()
  }, []);
  
  return [getData, setGetData];
};


// Set Question Dispatch function
export const SetQuestion = (idx) => async (dispatch) => {
  try {
    dispatch(Action.setQuestion(idx))
  }
  catch (error) {
    console.log(error);
  }
}

// Set Comp Dispatch function
export const SetComp = (idx) => async (dispatch) => {
  try {
    dispatch(Action.setComp(idx));
  } catch (error) {
    console.log(error);
  }
};

// Set Section Dispatch funtion
export const SetSection = (idx) => async (dispatch) => {
  try {
    dispatch(Action.setSection(idx));
  } catch(error){
    console.log(error)
  }
}