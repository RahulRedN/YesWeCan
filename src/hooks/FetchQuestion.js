import { useEffect, useState } from "react";
import data from "../database/data";
import { useDispatch } from "react-redux";

// Redux action
import * as Action from "../redux/question_reducer";

// To fetch API data and set value to store
export const useFetchQuestion = () => {
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    // Async funtion ti fetch data
    (async () => {
      try {
          let question = data;
        if (question.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({
            ...prev,
            apiData: data,
          })); 
          dispatch(Action.startExamAction(question));
        } else {
          throw new Error("No Question Available");
        }
      } catch (error) {
        setGetData((prev) => ({
          ...prev,
          serverError: true,
          isLoading: false,
        }));
      }
    })()
  }, [dispatch]);
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