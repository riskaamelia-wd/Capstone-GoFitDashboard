/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import ManageBookingDetail from "./pages/ManagesBooking/ManageBookingDetail";
// import ManageBooking from "./pages/ManagesBooking/ManageBooking";

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login/Login";
import PrivateRoute from "./util/PrivateRoute";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/Forgot Password/ForgotPassword";
import ResetPassword from "./pages/Login/Reset Password/ResetPassword";
import ManageMembership from "./pages/Manages Membership/ManageMembership";
import ManagesFeedback from "./pages/ManagesFeedback/ManagesFeedback";
import OnlineClass from "./pages/ManagesOnlineClass/OnlineClass";
import ManageTraining from "./pages/ManagesTraining/ManageTraining";
import LevelDetail from "./pages/ManagesTraining/LevelDetail";
import WorkoutDetail from "./pages/ManagesTraining/WorkoutDetail";
import Invoices from "./pages/Invoices/Invoices";
import Dashboard from "./pages/Dashboard/DashboardPages";
import ManageCustomers from "./pages/ManagesCustomers/ManageCustomers";
import ManagesArticles from "./pages/ManagesArticles/ManagesArticles";
import ManagesOnlineClass from "./pages/ManagesOnlineClass/ManageOnlineClass";
import ManagesOfflineClass from "./pages/ManageOfflineClass/ManagesOfflineClass";
import ManageClassPackages from "./pages/ManageOfflineClass/ManageClassPackages";
import ManagePackagesOnline from "./pages/ManagesOnlineClass/ManagePackagesOnline";
import ManageLocation from "./pages/ManageOfflineClass/ManageLocation";
import ManageTransaction from "./pages/ManageTransaction/ManageTransaction";
import ManageBooking from "./pages/ManagesBooking/ManageBooking";
import ArticlesDetail from "./pages/ManagesArticles/ArticlesDetail";
import ManageAdmin from "./pages/ManagesAdminAccount/ManageAdmin";
import DetailTransaction from "./pages/ManageTransaction/DetailTransaction";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id_user" element={<ResetPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/managesfeedback" element={<ManagesFeedback />} />
            <Route path="/articles" element={<ManagesArticles />} />
            <Route path="/articles/Detail/:id" element={<ArticlesDetail/>}/>
            <Route path="onlineClass" element={<ManagesOnlineClass />} />
            <Route path="onlineClass/classPackages" element={<ManagePackagesOnline />} />
            <Route path="offlineClass" element={<ManagesOfflineClass />} />
            <Route path="offlineClass/classPackages" element={<ManageClassPackages />} />
            <Route path="offlineClass/location" element={<ManageLocation />} />
            <Route path="training" element={<ManageTraining />} />
            <Route path="/manageCustomers" element={<ManageCustomers />} />
            <Route path="levelDetail/:level" element={<LevelDetail />} />
            <Route path="levelDetail/:level/:id" element={<LevelDetail />} />
            <Route
              path="levelDetail/:level/:id/:workoutDetail"
              element={<WorkoutDetail />}
            />
            <Route
              path="levelDetail/:level/:id/:workoutDetail/:idWorkout"
              element={<WorkoutDetail />}
            />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/membership" element={<ManageMembership />} />
            <Route path="/transaction" element={<ManageTransaction/>} />
            <Route path="/transaction/:id" element={<DetailTransaction/>} />
            <Route path="/booking" element={<ManageBooking />} />
            <Route path="/booking/detail/:id" element={<ManageBookingDetail />} />
            <Route path='/manageadmin' element={<ManageAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
