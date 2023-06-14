import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login/Login";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "react-datepicker/dist/react-datepicker.css";
import ManageMembership from "./pages/Manages Membership/ManageMembership";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ManageMembership />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
