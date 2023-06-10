import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { SetComp } from '../../hooks/FetchQuestion';

const ComponentSection = ({disabled, questions, trace, onCompClickHandler}) => {
  const [components, setComponents] = useState(null);

  useEffect(() => {
    if (questions) {
      setComponents(questions[trace[0]]?.components);
    }
  })

  const onClickHandler = (idx) => {
    onCompClickHandler(idx);
  }

  return (
    <>
      {components?.map((component, idx) => (
        <button key={idx} disabled={disabled} onClick={() => { onClickHandler(idx)}}>{component.componentTitle}</button>
      ))}
    </>
  );
}

export default ComponentSection