import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase/config";
import { useDispatch } from "react-redux";
import { setCourses } from "../redux/user_reducer";
import { useEffect } from "react";

export const updateInfo = (user) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (user) {
          const enrollments = collection(db, "enrollments");
          const query1 = query(enrollments, where("uid", "==", user));
          const coursesSnapshot = await getDocs(query1);
          if (coursesSnapshot.docs.length != 0) {
            const courses = coursesSnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            dispatch(setCourses(courses));
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  });
};

export const HomePageLoader = async () => {
  const returnData = {};
  try {
    const collRef = collection(db, "courses");
    const docRef = doc(collection(db, "homepage"), "EHUwKuyIsRPKzEY7fcXy");

    const res = await getDocs(collRef);
    if (!res.empty) {
      const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      returnData.courses = data;
    }
    const res1 = await getDoc(docRef);
    if (res1.exists) {
      returnData.images = [...res1.data().images];
    }
    return returnData;
  } catch (err) {
    console.log(err);
  }
};

export const DashboardLoader = async ({ request }) => {
  const url = new URL(request.url);
  const uid = url.searchParams.get("user");
  const testSeriesId = url.searchParams.get("testId");
  const courseId = url.searchParams.get("courseId");

  const compareDates = (a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  };

  try {
    const enrollmentRef = query(
      collection(db, "enrollments"),
      where("uid", "==", uid),
      where("courseId", "==", courseId)
    );
    const enrollDataRes = await getDocs(enrollmentRef);
    const status = { ...enrollDataRes.docs[0].data().status };

    const q = query(
      collection(db, "results_simple"),
      where("uid", "==", uid),
      where("courseId", "==", courseId),
      where("testSeriesId", "==", testSeriesId)
    );
    const res = await getDocs(q);
    const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    data.sort(compareDates);
    const recentTestData = [];

    for (let idx in data) {
      const examId = data[idx].examId;
      const courseId = data[idx].courseId;

      const q = query(
        collection(db, "results_simple"),
        where("examId", "==", examId),
        where("courseId", "==", courseId),
        where("testSeriesId", "==", testSeriesId),
        where("marks", ">", data[idx].marks)
      );
      const querySnapshot = await getDocs(q);

      const rank = querySnapshot.docs.length;

      recentTestData.push({
        courseName: data[idx].courseName,
        marks: data[idx].marks,
        maxMarks: data[idx].maxMarks,
        rank: rank + 1,
        attempts: status[examId][1],
      });
    }

    return recentTestData;
  } catch (err) {
    console.log(err);
  }

  return {};
};

export const TestsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const courseId = url.searchParams.get("courseId");
  const valid = url.searchParams.get("user");
  const role = url.searchParams.get("role");

  if (!id || !courseId || !valid || !role) {
    return {};
  }

  try {
    const docRef = doc(db, "test_series", id);
    const data = await getDoc(docRef);
    if (data.exists()) {
      const userData = data.data();
      userData.exams = userData.exams.filter(
        (exam) => exam.role != "classroom"
      );
      return userData;
    }
  } catch (err) {
    console.log(err);
  }

  return {};
};
