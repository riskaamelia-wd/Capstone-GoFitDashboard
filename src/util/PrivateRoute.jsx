import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const token = useSelector((state) => state.tokenAuth.token_jwt);

  let user;
  token ? (user = true) : (user = false);

  if (!user) {
    return <Navigate to={"/"} replace />;
  } else {
    return <Outlet />;
  }
};
export default PrivateRoute;
