import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  useNavigation,
  Navigate,
} from "react-router-dom";
import { AuthContexts } from "./Firebase/AuthContexts";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

import MainApp from "./pages/MainApp";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import HomePage from "./pages/HomePage";

import Dashboard from "./components/AppPages/Dashboard";
import Live from "./components/AppPages/Live";
import Feedback from "./components/AppPages/Feedback";
import Test from "./components/AppPages/Test";
import ViewResult from "./components/AppPages/ViewResult";

import OnlineExam from "./pages/OnlineExam";
import ResultPage from "./pages/ResultPage";

import * as Loader from "./Loaders/Loaders";
import ProfilePage from "./pages/ProfilePage";

import loading from "./App.module.css";
import Buy from "./pages/Buy";

const Root = () => {
  const { state } = useNavigation();
  if (state == "loading") {
    return (
      <div className={loading.loader}>
        <div className={loading.dot}></div>
        <div className={loading.dot}></div>
        <div className={loading.dot}></div>
        <div className={loading.dot}></div>
        <div className={loading.dot}></div>
      </div>
    );
  }
  return (
    <>
      <Outlet />
    </>
  );
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} loader={Loader.HomePageLoader} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/buy"
        element={
          <PrivateRoute>
            <Buy />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <MainApp />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/user/live" element={<Live />} />
        <Route
          path="/user/test"
          element={<Test />}
          loader={Loader.TestsLoader}
        />
        <Route
          path="/user/viewResult"
          element={<ViewResult />}
          loader={Loader.DashboardLoader}
        />
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
      <Route path="*" element={<Navigate to="/" replace />} />
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
