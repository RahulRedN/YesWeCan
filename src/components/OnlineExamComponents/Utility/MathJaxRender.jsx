import React, { useEffect } from "react";

const MathJaxRender = ({ mathml, className }) => {
  useEffect(() => {
    window.MathJax && window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
  }, [mathml]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: mathml }} />;
};

export default MathJaxRender;
