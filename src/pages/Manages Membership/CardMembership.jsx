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
  // style A for hover
  const [isVisible, setIsVisible] = useState(false);
  {
    /* <div
        style={{
          border: "1px solid gray",
          width: 300,
          height: 300,
          padding: 10,
          margin: 100,
        }}
        onMouseEnter={(e) => {
          //   setStyle({ display: "block" });
          setIsVisible(true);
        }}
        onMouseLeave={(e) => {
          //   setStyle({ display: "none" });
          setIsVisible(false);
        }}>
        <button style={isVisible ? { display: "block" } : { display: "none" }}>
          Click
        </button>
      </div> */
  }

  // styla B for hove
  // const [style, setStyle] = useState({display: 'none'});
  {
    /* <div
        style={{
          border: "1px solid gray",
          width: 300,
          height: 300,
          padding: 10,
          margin: 100,
        }}
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}>
        <button style={isVisible? {displ}}>Click</button>
      </div> */
  }
  return (
    <>
      <div
        className="card rounded-4"
        onMouseEnter={() => {
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          setIsVisible(false);
        }}
        style={{
          height: "50vh",
          //   background:
          //     "linear-gradient(50deg, #fa7c30 40%, rgba(0, 0, 0, 0.1)30%)",
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
            className="p-5 d-flex justify-content-center align-item-center text-center card-text fs-4"
            style={{ height: "30vh" }}>
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
