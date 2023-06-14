import React, { useEffect, useState } from "react";

const ComponentSection = ({
  disabled,
  questions,
  trace,
  onCompClickHandler,
  activeClass,
}) => {
  const [components, setComponents] = useState(null);

  useEffect(() => {
    if (questions) {
      setComponents(questions[trace[0]]?.components);
    }
  });

  const onClickHandler = (idx) => {
    onCompClickHandler(idx);
  };

  return (
    <>
      {components?.map((component, idx) => (
        <button
          key={idx}
          disabled={disabled}
          className={trace[1] == idx ? activeClass : ""}
          onClick={() => {
            onClickHandler(idx);
          }}
        >
          {component.componentTitle}
        </button>
      ))}
    </>
  );
};

export default ComponentSection;