import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CourseTestPart from "./CourseTestPart";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";

const CourseTest = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [courses, setCourses] = useState();
  const toggleViewHandler = () => {
    setDropdown((prev) => !prev);
  };
  let content;
  if (props.course.phases) {
    content = props.course.phases.map((phase, idx) => (
      <CourseTestPart
        key={idx}
        title={phase.title}
        tests={phase.tests}
        classes={props.classes}
        courseId={props.course.id}
        status={props.course.status}
        role={props.role}
      />
    ));
  } else if (props.course.tests) {
    content = props.course.tests.map((test) => (
      <NavLink
        to={`/user/test?id=${test.id}&courseId=${props.course.id}&user=${props.course?.status}&role=${props.role}`}
        key={test.id}
      >
        <i className="fa-solid fa-circle"></i> {test.title}
      </NavLink>
    ));
  } else if (props.course?.courses?.length > 0) {
    content = courses?.map((cor, idx) => (
      <CourseTest
        key={idx}
        role={props.role}
        course={cor}
        classes={props.classes}
      />
    ));
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        let courseArr = [];
        props.course.courses.forEach(async (cour) => {
          const docRef = doc(collection(db, "courses"), cour);
          const res = await getDoc(docRef);
          if (res) {
            courseArr.push({
              ...res.data(),
              id: res.id,
              status: props.course?.status,
            });
          }
        });
        setCourses(courseArr);
      } catch (error) {
        console.error(error);
      }
    };
    if (props.course?.courses?.length > 0) {
      fetch();
    }
  }, []);
  return (
    <li className={props.classes.course}>
      <div className={props.classes.courseName}>{props.course.title}</div>
      <div className={props.classes.courseContent}>
        <button onClick={toggleViewHandler}>
          <i className="fa-solid fa-tv"></i>{" "}
          {props.course?.courses?.length > 0 ? "Courses" : "Online Exams"}
          <div className={dropdown ? props.classes.clicked : ""}>
            <i className="fa-solid fa-angle-down"></i>
          </div>
        </button>
        <div
          className={
            dropdown ? props.classes.dropdown : props.classes.displayNone
          }
        >
          {content}
        </div>
      </div>
    </li>
  );
};

export default CourseTest;
