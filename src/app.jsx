import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Dashboard from "./pages/Dashboard/DashboardPages";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Dashboard />

      {/* <BrowserRouter>
        <Routes>
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:id_user" element={<ResetPassword />} />
          <Route path="/" element={<Login />} />
         
        </Routes>
      </BrowserRouter> */}

    </>
  );
}

export default App;