import React from 'react'
import ButtonCard from './UI/ButtonCard';


const QuestionButtons = ({ component, trace, status, onClickHandler }) => {
  return (
    <>
      {component?.questions.map((ques, idx) => {
        return (
          <ButtonCard
            key={`${trace[0]} ${trace[1]} ${idx}`}
            effects={status[`${trace[0]} ${trace[1]} ${idx}`]}
            clickHandler={() => {
              onClickHandler(idx);
            }}
          >
            {idx + 1}
          </ButtonCard>
        );
      })}
    </>
  );
}

export default QuestionButtons