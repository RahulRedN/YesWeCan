import * as Actions from '../redux/result_reducer'

export const SetVisit = (arr) => async (dispatch) => {
    try {
      dispatch(Actions.setVisit(arr));
    } catch (error) {
      console.log(error);
    }
}

export const ClearQues = (arr) => (dispatch) => {
    try {
      dispatch(Actions.clearQues(arr));
    } catch (error) {
      console.log(error);
    }
}

export const SaveNext = (arr) => async (dispatch) => {
    try {
        dispatch(Actions.saveAnswer(arr))
    }
    catch (error) {
        console.log(error);
    }
}

export const MarkQues = (arr) => async (dispatch) => {
    try {
      dispatch(Actions.markQuestion(arr));
    } catch (error) {
      console.log(error);
    }
}

export const MarkSaveQues = (arr) => async (dispatch) => {
  try {
    dispatch(Actions.markSave(arr));
  } catch (error) {
    console.log(error);
  }
};

export const SaveTimer = (obj) => async (dispatch) => {
  try {
    dispatch(Actions.saveTimer(obj));
  } catch (error) {
    console.log(error);
  }
}