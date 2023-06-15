<<<<<<< HEAD:src/App.jsx
// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
=======
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
>>>>>>> ab64f7d6045252752b1f8167f1e2d34fcd03a74c:src/app.jsx
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


function App() {
<<<<<<< HEAD:src/App.jsx
  // const [count, setCount] = useState(0);
=======
  const [count, setCount] = useState(0);

>>>>>>> ab64f7d6045252752b1f8167f1e2d34fcd03a74c:src/app.jsx
  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
<<<<<<< HEAD:src/App.jsx
      {/* <ManageBooking /> */}
      <ManageBookingDetail />
=======

      <BrowserRouter>
        <Routes>
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id_user" element={<ResetPassword />} />
          <Route path="/" element={<Login />} />
          {/* <Route element={<PrivateRoute />}>
 
          </Route> */}
        </Routes>
      </BrowserRouter>

>>>>>>> ab64f7d6045252752b1f8167f1e2d34fcd03a74c:src/app.jsx
    </>
  );
}

export default App;