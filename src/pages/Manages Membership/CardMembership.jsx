import React, { useState } from "react";
import delete_membership from "../../assets/icons/delete_membership.svg";
import edit_membership from "../../assets/icons/edit_membership.svg";
const CardMembership = ({
  title,
  duration,
  price,
  desc,
  onClickDelete,
  onClickEdit,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const convertToMonth = (numberOfDays) => {
    var years = Math.floor(numberOfDays / 365);
    var months = Math.floor((numberOfDays % 365) / 30);
    var days = Math.floor((numberOfDays % 365) % 30);

    var yearsDisplay =
      years > 0 ? years + (years == 1 ? " year, " : " years, ") : "";
    var monthsDisplay =
      months > 0 ? months + (months == 1 ? " month, " : " months, ") : "";
    var daysDisplay = days > 0 ? days + (days == 1 ? " day" : " days") : "";
    return yearsDisplay + monthsDisplay + daysDisplay;
  };

  return (
    <>
      <div
        id="card-membership"
        className="card rounded-4"
        style={{ height: "60vh" }}
        onMouseEnter={() => {
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          setIsVisible(false);
        }}>
        <div className="card-body ">
          <div className="row card-title z-2">
            <div className="col-6 d-flex align-items-center justify-content-start">
              <p className="fs-4">{title}</p>
            </div>
            <div className="col-6 text-end" style={{ height: "15vh" }}>
              <p className="fs-3">
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(price)}
                /{convertToMonth(duration)}
              </p>
            </div>
          </div>
          <div
            className="p-3 d-flex justify-content-center align-item-center text-center card-text fs-4"
            style={{ height: "30vh" }}>
            <div
              className={
                isVisible ? "d-block z-3 position-absolute col-5" : "d-none"
              }>
              <div className="row">
                <div className="col-6 text-start">
                  <button
                    className=" rounded-3"
                    id="editButtonMembership"
                    onClick={onClickEdit}>
                    <img
                      src={edit_membership}
                      alt=""
                      className="img-thumbnail"
                    />
                  </button>
                </div>
                <div className="col-6 text-end">
                  <button
                    className=" rounded-3"
                    id="deleteButtonMembership"
                    onClick={onClickDelete}>
                    <img
                      src={delete_membership}
                      alt=""
                      className="img-thumbnail"
                    />
                  </button>
                </div>
              </div>
            </div>
            <p className="z-2">{desc}</p>
          </div>
          <div className="text-center fixec-bottom bottom-small z-2">
            <small>
              Terms and conditions
              <span style={{ color: "#C6C6C6" }}> apply.</span>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardMembership;
