import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider} from 'react-router-dom'

import MainApp from "./pages/MainApp";
import OnlineExam from "./pages/OnlineExam";
import Dashboard from "./components/AppPages/Dashboard";
import Live from "./components/AppPages/Live";
import Feedback from "./components/AppPages/Feedback";
import Test from "./components/AppPages/Test";
import ViewResult from "./components/AppPages/ViewResult";

const Root = () => {
  return (<Outlet/>)
}

const courses = [
  {
    courseTitle: "Course 1",
    purchased: "1-1-2023",
    expires: "31-12-2023",
    amount: 233,
    status: "Unlocked",
  },
  {
    courseTitle: "Course 2",
    purchased: "1-1-2023",
    expires: "31-12-2023",
    amount: 322,
    status: "Unlocked",
  }
];

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<p>HomePage</p>} />
      <Route path="/login" element={<p>Login</p>} />
      <Route path="/user" element={<MainApp />}>
        <Route index element={<Dashboard myCourses={courses} />} />
        <Route path="/user/live" element={<Live />} />
        <Route path="/user/test" element={<Test />} />
        <Route path="/user/viewResult" element={<ViewResult />} />
        <Route path="/user/feedback" element={<Feedback />} />
        <Route path="/user/Typetest" element={<p>Type Test</p>} />
      </Route>
      <Route path="/user/online-exam" element={<OnlineExam/>} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={Router}/>
    </>
  );
}

export default App;
