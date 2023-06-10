import React from "react";

const TableData = (props) => {
  return (
    <>
      {props.myCourses.map((course, idx) => (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{course.courseTitle}</td>
          <td>{course.purchased}</td>
          <td>{course.expires}</td>
          <td>{course.amount}</td>
          <td>{course.status}</td>
        </tr>
      ))}
    </>
  );
};

export default TableData;
