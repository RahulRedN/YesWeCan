import { combineReducers, configureStore } from "@reduxjs/toolkit";

import questionReducer from "./question_reducer";
import resultReducer from "./result_reducer";

const rootReducer = combineReducers({
    questions: questionReducer,
    results: resultReducer,
})

// Create Store
export default configureStore({reducer: rootReducer})