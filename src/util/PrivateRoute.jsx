import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import SidebarComp from "../components/SidebarComp/SidebarComp";
import NavbarComp from "../components/NavbarComp/NavbarComp";

const PrivateRoute = () => {
  const [isExpanded, setExpandState] = useState(false);
  // const [isApps, setExpandApps] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const token = useSelector((state) => state.tokenAuth.token_jwt);

  let user;
  token ? (user = true) : (user = false);

  if (!user) {
    return <Navigate to={"/"} replace />;
  } else {
    return (
      <>
        <div className="d-flex row sidebar-main-pages w-[18rem] border-r">
          <div
          className={isExpanded ? "col-lg-3 fixed h-full w-[295px] overflow-y-auto " : "col-lg-1 fixed h-full w-[295px] overflow-y-auto "}
          >
            <SidebarComp
              isExpanded={isExpanded}
              setExpandState={setExpandState}
            />
          </div>
          {isExpanded ? (
            <div
              className="col-lg-9  main-sidebar-margin min-h-[100vh] flex-1"
              // className="main-sidebar-margin"
              // style={{marginLeft: "220px"}}
            >
              <NavbarComp
                isExpanded={isExpanded}
                setExpandState={setExpandState}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              <div className="main-content-scrollable">
              <Outlet/>
              </div>
            </div>
          ) : (
            <div
              className="col-lg-11  main-sidebar-margin-NX min-h-[100vh] flex-1"
              // className="main-sidebar-margin-NX"
              //   style={{marginLeft: "80px"}}
            >
              <NavbarComp
                isExpanded={isExpanded}
                setExpandState={setExpandState}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              <div className="main-content-scrollable">
              <Outlet/>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
};
export default PrivateRoute;
