import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from './user_reducer';
import questionReducer from "./question_reducer";
import resultReducer from "./result_reducer";
 
const rootReducer = combineReducers({
    user: userReducer,
    questions: questionReducer,
    results: resultReducer,
})

// Create Store
export default configureStore({reducer: rootReducer})