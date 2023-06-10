import React, { useState } from "react";

import OnlineExamPage from "../components/OnlineExam/OnlineExamPage";
import OnlineExamInstructions from "../components/OnlineExam/OnlineExamInstructions";
import classes from "./OnlineExam.module.css";

const OnlineExam = () => {
  const onAcceptHandler = () => {
    setContent(<OnlineExamPage />);
  };
  const [content, setContent] = useState(
    <OnlineExamInstructions onAcceptHandler={onAcceptHandler} />
  );
  return <>{content}</>;
};

export default OnlineExam;
