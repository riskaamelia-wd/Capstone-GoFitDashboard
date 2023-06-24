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
// import "@mobiscroll/react/dist/css/mobiscroll.min.css";
// import "react-datepicker/dist/react-datepicker.css";

import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/Forgot Password/ForgotPassword";
import ResetPassword from "./pages/Login/Reset Password/ResetPassword";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id_user" element={<ResetPassword />} />
          <Route path="/" element={<Login />} />
          {/* <Route element={<PrivateRoute />}>
 
          </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
