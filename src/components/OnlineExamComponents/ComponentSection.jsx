import React, { useEffect, useRef, useState } from "react";

const ComponentSection = ({
  disabled,
  questions,
  trace,
  onCompClickHandler,
  activeClass,
  buttonClass,
  componentClass
}) => {
  const [components, setComponents] = useState(null);

  useEffect(() => {
    if (questions) {
      setComponents(questions[trace[0]]?.components);
    }
  });

  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= 100; // Adjust the scroll distance as needed
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += 100; // Adjust the scroll distance as needed
  };

  const onClickHandler = (idx) => {
    onCompClickHandler(idx);
  };

  return (
    <>
      <div className="scrollable-container" style={{display: "flex"}}>
        <button className={buttonClass} onClick={scrollLeft}>
          &lt;
        </button>
        <div className={componentClass} ref={containerRef} style={{overflowX: "hidden", display: "flex"}}>
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
        </div>
        <button className={buttonClass} onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default ComponentSection;