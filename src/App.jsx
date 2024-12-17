import React, { useEffect, lazy, Suspense } from "react";
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

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

const HomePage = lazy(() => import("./pages/HomePage"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Policies = lazy(() => import("./pages/Policies"));

const Dashboard = lazy(() => import("./components/AppPages/Dashboard"));
const Live = lazy(() => import("./components/AppPages/Live"));
const Feedback = lazy(() => import("./components/AppPages/Feedback"));
const Test = lazy(() => import("./components/AppPages/Test"));
const ViewResult = lazy(() => import("./components/AppPages/ViewResult"));

const OnlineExam = lazy(() => import("./pages/OnlineExam"));
const ResultPage = lazy(() => import("./pages/ResultPage"));

import * as Loader from "./Loaders/Loaders";
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

import loading from "./App.module.css";
const TypingTestSteno = lazy(() =>
  import("./components/AppComponents/TypingTestSteno")
);
const ViewResultType = lazy(() =>
  import("./components/AppPages/ViewResultType")
);
const TypingMain = lazy(() => import("./components/AppPages/TypingMain"));
const TypingTest = lazy(() => import("./components/AppComponents/TypingTest"));
const Buy = lazy(() => import("./pages/Buy"));

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
    <Suspense
      fallback={
        <div className={loading.loader}>
          <div className={loading.dot}></div>
          <div className={loading.dot}></div>
          <div className={loading.dot}></div>
          <div className={loading.dot}></div>
          <div className={loading.dot}></div>
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} loader={Loader.HomePageLoader} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/policies" element={<Policies />} />
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
        <Route path="/user/typing" element={<TypingMain />} />
        <Route path="/user/typingtest" element={<TypingTest />} />
        <Route path="/user/typingtestSteno" element={<TypingTestSteno />} />
        <Route path="/user/viewResultType" element={<ViewResultType />} />
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
  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <AuthContexts>
      <RouterProvider router={Router} />
    </AuthContexts>
  );
}

export default App;
