import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./common";

const PrivateRoute = () => {
  const token = getUser();

  let user;
  token ? (user = true) : (user = false);

  if (!user) {
    return <Navigate to={"/"} replace />;
  } else {
    return <Outlet />;
  }
};
export default PrivateRoute;
