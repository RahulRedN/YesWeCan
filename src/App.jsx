import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthContexts } from "./Firebase/AuthContexts";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

import MainApp from "./pages/MainApp";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./components/AppPages/Dashboard";
import Live from "./components/AppPages/Live";
import Feedback from "./components/AppPages/Feedback";
import Test from "./components/AppPages/Test";
import ViewResult from "./components/AppPages/ViewResult";

import OnlineExam from "./pages/OnlineExam";
import ResultPage from "./pages/ResultPage";

const Root = () => {
  return <Outlet />;
};

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
  },
];

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<p>HomePage</p>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <MainApp />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard myCourses={courses} />} />
        <Route path="/user/live" element={<Live />} />
        <Route path="/user/test" element={<Test />} />
        <Route path="/user/viewResult" element={<ViewResult />} />
        <Route path="/user/feedback" element={<Feedback />} />
        <Route path="/user/Typetest" element={<p>Type Test</p>} />
      </Route>
      <Route
        path="/online-exam"
        element={
          <PrivateRoute>
            <OnlineExam />
          </PrivateRoute>
        }
      />
      <Route
        path="/result"
        element={
          <PrivateRoute>
            <ResultPage />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <AuthContexts>
      <RouterProvider router={Router} />
    </AuthContexts>
  );
}

export default App;
