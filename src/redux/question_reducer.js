import { createSlice } from "@reduxjs/toolkit"

export const questionReducer = createSlice({
    name: 'questions',
    initialState: {
        queue: [],
        answers: [],
        trace: [0, 0, 0]
    },
    reducers: {
        startExamAction: (state, action) => {
            return {
                ...state,
                queue: action.payload
            }
        },
        setQuestion: (state, action) => {
            let currTrace = [...state.trace];
            currTrace[2] = action.payload;
            return {
                ...state,
                trace: currTrace
            }
        },
        setComp: (state, action) => {
            let currTrace = [...state.trace];
            currTrace[1] = action.payload;
            currTrace[2] = 0;
            return {
              ...state,
              trace: currTrace,
            };
        },
        setSection: (state, action) => {
            return {
                ...state,
                trace: [action.payload, 0, 0]
            }
        }
    }
})


export const { startExamAction, setQuestion, setComp, setSection} = questionReducer.actions;
export default questionReducer.reducer;