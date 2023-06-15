import { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import SidebarComp from "../components/SidebarComp/SidebarComp";
import NavbarComp from "../components/NavbarComp/NavbarComp";
import { routes } from "../schema/route";


function Layout() {
    const [isExpanded, setIsExpanded] = useState(true)
    // const handleMouse = (e) => {
    //   setIsExpanded(true)
    // }
  
      return(
          <div className="d-flex row m-0 row">
            <div className="col-2"
              >
              <SidebarComp isExpanded={'true'}/>
            </div>
            {isExpanded ? (
                <div className="col-10">
                    <NavbarComp/>
                    <Routes>
                        {
                            routes.map((route) => (
                                <Route
                                    path={route.path}
                                    element={<route.element/>}
                                    key={route.path}
                                />
                            ))
                        }
                    </Routes>
                </div>
            )
             : (
              <div className="col-11">
                <NavbarComp/>
                <Routes>
                    {
                        routes.map((route) => (
                            <Route
                                path={route.path}
                                element={<route.element/>}
                                key={route.path}
                            />
                        ))
                    }
                </Routes>
              </div>
            )
            }
          </div>
      )
}

export default Layout