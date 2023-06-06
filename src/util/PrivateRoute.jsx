import { Navigate, Outlet } from "react-router-dom";
import { getadmin } from "./common";

const PrivateRoute = () => {
  const token = getadmin();

  let admin;
  token ? (admin = true) : (admin = false);

  if (!admin) {
    return <Navigate to={"/"} replace />;
  } else {
    return <Outlet />;
  }
};
export default PrivateRoute;
