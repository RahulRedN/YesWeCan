import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../Firebase/config";
import { useEffect } from "react";
import { setAllCourses } from "../redux/user_reducer";
import { useDispatch, useSelector } from "react-redux";

export const useCourseFetch = () => {
  const myCourses = useSelector((state) => state.user.myCourses);
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const coursesArr = [];
    const compareDates = (course) => {
      const dateA = new Date(course.limit).getTime();
      const dateB = new Date().getTime();
      return dateB - dateA;
    };
    const fetch = async () => {
      for (let index in myCourses) {
        const docRef = doc(db, "courses", myCourses[index].courseId);
        try {
          const res = await getDoc(docRef);
          if (res.exists()) {
            const status = (compareDates(myCourses[index])>0?false:true)
            coursesArr.push({ ...res.data(), id: res.id, status: status });
          }
        } catch (err) {
          console.log(err);
        }
      }
      setData([...coursesArr]);
      dispatch(setAllCourses([...coursesArr]));
    };
    fetch();
  }, []);

  return [data, setData];
};
