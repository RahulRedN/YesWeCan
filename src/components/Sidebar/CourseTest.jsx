import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CourseTestPart from "./CourseTestPart";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";

import { FaChalkboard } from "react-icons/fa";
import { PiBooksFill } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

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
        to={`/user/test?id=${test.id}&courseId=${
          props.courseId ? props.courseId : props.course.id
        }&user=${props.course?.status}&role=${props.role}`}
        key={test.id}
      >
        <FaCircle size={7} /> {test.title}
      </NavLink>
    ));
  } else if (props.course?.courses?.length > 0) {
    content = courses?.map((cor, idx) => (
      <CourseTest
        key={idx}
        role={props.role}
        course={cor}
        classes={props.classes}
        courseId={props.course.id}
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
          {props.course?.courses?.length > 0 ? (
            <>
              <PiBooksFill size={25} /> Courses
            </>
          ) : (
            <>
              <FaChalkboard size={25} strokeWidth={1.2} /> Online Exams
            </>
          )}
          <div className={dropdown ? props.classes.clicked : ""}>
            <IoIosArrowDown size={25} />
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
