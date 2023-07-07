import React from "react";

const ExamResults = ({ courseName, marks, maxMarks, rank, idx, attempts }) => {
  return (
    <>
      <tr>
        <td>{idx + 1}</td>
        <td>{courseName}</td>
        <td>{marks}</td>
        <td>{maxMarks}</td>
        <td>{attempts}</td>
        <td>{rank}</td>
      </tr>
    </>
  );
};

export default ExamResults;
