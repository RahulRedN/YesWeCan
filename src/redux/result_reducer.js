import { createSlice } from "@reduxjs/toolkit"

export const resultReducer = createSlice({
    name: 'result',
    initialState: {
        result: {},
        status: { '0 0 0': { isVisited: true, isMarked: false, isAnswered: false } },
        timer: {'0 0 0': [0, 0, 0]}
    },
    reducers: {
        setVisit: (state, action) => {
            const arr = action.payload;
            const index = `${arr[0]} ${arr[1]} ${arr[2]}`;
            if (state.status[index]) {
                const obj = { ...state.status[index] };
                obj.isVisited = true;
                
                const newStatus = { ...state.status };
                newStatus[index] = obj;
                return {
                    ...state,
                    status: newStatus
                }
            } else {
                const obj = { isVisited: true, isMarked: false, isAnswered: false };
                const newStatus = { ...state.status };
                newStatus[index] = obj;
                return {
                    ...state,
                    status: newStatus
                }
            }
        },
        clearQues: (state, action) => {
            const arr = action.payload;
            const index = `${arr[0]} ${arr[1]} ${arr[2]}`;
            const newStatus = { ...state.status };
            newStatus[index] = { isVisited: true, isAnswered: false, isMarked: false };

            const newResult = { ...state.result };
            newResult[index] = null;
            return {
                ...state,
                result: newResult,
                status: newStatus
            }
        },
        saveAnswer: (state, action) => {
            const arr = action.payload;
            const index = `${arr[0]} ${arr[1]} ${arr[2]}`;
            const newResult = { ...state.result };
            newResult[index] = arr[3];

            const obj = { ...state.status[index] };
            obj.isAnswered = true;
            
            const newStatus = { ...state.status };
            newStatus[index] = obj;
            return {
                ...state,
                result: { ...newResult },
                status: { ...newStatus }
            }
        },
        markQuestion: (state, action) => {
            const arr = action.payload;
            const index = `${arr[0]} ${arr[1]} ${arr[2]}`;
            const obj = { ...state.status[index] };
            obj.isMarked = true;
            const newStatus = { ...state.status };
            newStatus[index] = obj;

            return {
                ...state, 
                status: newStatus
            }
        },
        markSave: (state, action) => {
            const arr = action.payload;
            const index = `${arr[0]} ${arr[1]} ${arr[2]}`;
            const newResult = { ...state.result };
            newResult[index] = arr[3];

            const obj = { ...state.status[index] };
            obj.isAnswered = true;
            obj.isMarked = true;
            
            const newStatus = { ...state.status };
            newStatus[index] = obj;
            return {
                ...state,
                result: { ...newResult },
                status: { ...newStatus }
            }
        },
        saveTimer: (state, action) => {
            const arr = action.payload.arr;
            const index = action.payload.index;
            const newTimer = { ...state.timer };
            newTimer[index] = arr;

            return {
                ...state,
                timer: newTimer
            }
        },
        resetResult: (state, action) => {
            return {
              result: {},
              status: {
                "0 0 0": {
                  isVisited: true,
                  isMarked: false,
                  isAnswered: false,
                },
              },
              timer: { "0 0 0": [0, 0, 0] },
            };
        }
    }
});

export const { setVisit, clearQues, saveAnswer, markQuestion, markSave, saveTimer, resetResult} = resultReducer.actions;

export default resultReducer.reducer;