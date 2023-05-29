import React from "react";
import "./SidebarComp.css";
import { NavLink } from "react-router-dom";
import Icon1Gym from "../../assets/icons/exercise.svg";
import Icon2Invoices from "../../assets/icons/receipt_long.svg";
import Icon3Transactions from "../../assets/icons/monetization_on.svg";
import Icon4Membership from "../../assets/icons/remember_me.svg";
import Icon5Bookingclass from "../../assets/icons/sports_gymnastics.svg";
import Icon6Newsletter from "../../assets/icons/explore.svg";
import Icon7Users from "../../assets/icons/person.svg";
import Icon8Admin from "../../assets/icons/manage_accounts.svg";
import Icon9Feedback from "../../assets/icons/help.svg";
import Icon10LandingPages from "../../assets/icons/gallery_thumbnail.svg";
import Icon11Logout from "../../assets/icons/logout_red.svg";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";

const SidebarComp = ({ isExpanded, setExpandState }) => {
  const handleMouseEnter = () => {
    setExpandState(true);
  };

  const handleMouseLeave = () => {
    setExpandState(false);
  };
  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded ? (
            <div className="nav-brand">LOGO</div>
          ) : (
            <div className="nav-brand-NX">
              LOGO
              {/* <img alt="brand logo" src="" className="rounded-circle" />{" "} */}
            </div>
          )}
        </div>
        <div className="nav-menu">
          <h1 className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}>
            HOME
          </h1>
          <NavLink to={"/"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-sidebar" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "Gym" : ""}
              imgUrlStart={Icon1Gym}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>
          <NavLink to={"/dashboard"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-sidebar" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "Invoices" : ""}
              imgUrlStart={Icon2Invoices}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>
          <NavLink to={"/"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-sidebar" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "Transactions" : ""}
              imgUrlStart={Icon3Transactions}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>

          <h1 className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}>
            Apps
          </h1>

          <NavLink to={"/"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-sidebar" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "Membership" : ""}
              imgUrlStart={Icon4Membership}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>
          <NavLink to={"/"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-sidebar" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "Booking Class" : ""}
              imgUrlStart={Icon5Bookingclass}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>
          <NavLink to={"/"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-sidebar" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "News Letter" : ""}
              imgUrlStart={Icon6Newsletter}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>
          <NavLink to={"/"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-sidebar" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "Users" : ""}
              imgUrlStart={Icon7Users}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>

          <h1 className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}>
            Pages
          </h1>
          <NavLink to={"/"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-sidebar" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "Admin Setting" : ""}
              imgUrlStart={Icon8Admin}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>
          <NavLink to={"/"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-sidebar" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "Feedback" : ""}
              imgUrlStart={Icon9Feedback}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>
          <NavLink to={"/"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-sidebar" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "Landing Pages" : ""}
              imgUrlStart={Icon10LandingPages}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>

          <h1 className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}>
            Auth
          </h1>
          <NavLink to={"/"}>
            <ButtonComponent
              type={"button"}
              className={isExpanded ? "btn-logout" : "btn-sidebar-NX"}
              buttonName={isExpanded ? "Log out" : ""}
              imgUrlStart={Icon11Logout}
              imgClassName={
                isExpanded ? "btn-sidebar-icon" : "btn-sidebar-icon-NX"
              }
            ></ButtonComponent>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SidebarComp;
