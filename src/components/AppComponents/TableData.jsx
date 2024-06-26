import React from "react";

const TableData = ({ myCourses, allCourses }) => {
  const compareDates = (course) => {
    const dateA = new Date(course.limit).getTime();
    const dateB = new Date().getTime();
    return dateB - dateA;
  };

  const getCourseInfo = (id) => {
    return allCourses.filter((course) => course.id == id)[0];
  };
  return (
    <>
      {myCourses.length != 0 ? (
        myCourses?.map((course, idx) => {
          const courseData = getCourseInfo(course.courseId);
          const date1 = new Date(course.enrolledAt);
          const date2 = new Date(course.limit);
          return (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{courseData?.title}</td>
              <td>{date1.toLocaleDateString("en-IN")}</td>
              <td>{date2.toLocaleDateString("en-IN")}</td>
              <td>{courseData?.price}</td>
              <td>{compareDates(course) > 0 ? "Expired" : "Valid"}</td>
            </tr>
          );
        })
      ) : (
        <>
          <tr>
            <td colSpan={6}>Empty</td>
          </tr>
        </>
      )}
    </>
  );
};

export default TableData;
