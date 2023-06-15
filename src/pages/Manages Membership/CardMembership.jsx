import React, { useState } from "react";
import delete_membership from "../../assets/icons/delete_membership.svg";
import edit_membership from "../../assets/icons/edit_membership.svg";
// import delete from "../../assets/icons/delete_membership.svg"
const CardMembership = ({
  title,
  duration,
  price,
  desc,
  // id,
  onClickDelete,
  onClickEdit,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div
        id="card-membership"
        className="card rounded-4"
        // style={{
        //   background:
        // }}
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
            <div className="col-6 text-end">
              <p className="fs-3">
                Rp {price} /{duration}
              </p>
            </div>
          </div>
          <div
            className="p-3 d-flex justify-content-center align-item-center text-center card-text fs-4"
            style={{ height: "35vh" }}>
            <div
              className={
                isVisible ? "d-block z-3 position-absolute col-5" : "d-none"
              }>
              <div className="row">
                <div className="col-6 text-start">
                  <button className=" rounded-3" onClick={onClickEdit}>
                    <img
                      src={edit_membership}
                      alt=""
                      className="img-thumbnail"
                    />
                  </button>
                </div>
                <div className="col-6 text-end">
                  <button className=" rounded-3" onClick={onClickDelete}>
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
