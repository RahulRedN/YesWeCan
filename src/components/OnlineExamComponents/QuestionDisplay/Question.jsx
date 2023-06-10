import React, { useEffect} from "react";
import { useSelector } from "react-redux";

import IsNormal from "./IsNormal";

const Question = ({question, trace, check, setCheck}) => {
  const result = useSelector(state => state.results.result);
  const onSelect = (idx) => {
    setCheck(idx);
  }

  useEffect(() => {
    if (result) {
      const index = `${trace[0]} ${trace[1]} ${trace[2]}`;
      if (result[index] || result[index]===0) {
        setCheck(result[index]);
      }
      else {
        setCheck(undefined);
      }
    }
  }, [trace])

  
  return (
    <>
      <IsNormal question={question} trace={trace} onSelect={onSelect} check={check} />
    </>
  );
};

export default Question;
