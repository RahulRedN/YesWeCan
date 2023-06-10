export const reducer = (state, action) => {
  switch (action.type) {
    case "SetTimer":
      return {
        hour: action.payload[0],
        minute: action.payload[1],
        second: action.payload[2],
      };
    case "RunTimer": {
      if (state.second < 59) {
        return { ...state, second: state.second + 1 };
      } else if (state.second == 59) {
        if (state.minute < 59) {
          return { ...state, minute: state.minute + 1, second: 0 };
        } else if (state.minute == 59) {
          return { hour: state.hour + 1, minute: 0, second: 0 };
        }
      }
    }
  }
};

export const reducerCoutdown = (state, action) => {
  switch (action.type) {
    case "SetCountdown": {
      return {
        hour: action.payload[0],
        minute: action.payload[1],
        second: action.payload[2],
      };
    }
    case "RunCountdown": {
      if (state.second > 0) {
        return { ...state, second: state.second - 1 };
      } else if (state.minute > 0) {
        return { ...state, minute: state.minute - 1, second: 59 };
      } else if (state.hour > 0) {
        return { hour: state.hour - 1, minute: 59, second: 59 };
      } else if (state.hour == 0) {
        return state;
      }
    }
  }
};

export const reducerStatus = (state, action) => {
  switch (action.type) {
    case "UpdateStatus": {
      const trace = [...action.payload.trace];
      let ans = 0,
        nAns = 0,
        mark = 0,
        markS = 0;
      for (let key in action.payload.status) {
        const effect = action.payload.status[key];
        const [sec, comp, ques] = key.split(" ");
        if (trace[0] == sec && trace[1] == comp) {
          if (effect?.isMarked && effect?.isAnswered) {
            markS++;
          } else if (effect?.isMarked) {
            mark++;
          } else if (effect?.isAnswered) {
            ans++;
          } else if (effect?.isVisited) {
            nAns++;
          }
        }
      }
      const nVisit = action.payload.len - (ans + nAns + mark + markS);
      return {
        ans: ans,
        nAns: nAns,
        mark: mark,
        markS: markS,
        nVisit: nVisit,
      };
    }
  }
};

export const reducerTimeState = (state, action) => {
  switch (action.type) {
    case "SetTotal":
      return {
        isTotal: true,
        isSection: [false, 0],
        isComponent: [false, 0],
      };
    case "SetSection":
      return {
        isTotal: false,
        isSection: [true, action.index],
        isComponent: [false, 0, 0],
      };
    case "SetComp":
      return {
        isTotal: false,
        isSection: [false, 0],
        isComponent: [true, ...action.arr],
      };
  }
};

export const reducerMarks = (state, action) => {
  switch (action.type) {
    case "SetMarks":
      return [...action.payload];
  }
};


export const reducerAlert = (state, action) => {
  switch (action.type) {
    case 'Reset':
      return [false, {}]
    case "Set":
      return [true, {...action.payload}]
  }
}