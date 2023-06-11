import React, { useState } from "react";
const CardMembership = ({ title, duration, price, desc }) => {
  // style A for hover
  //   const [isVisible, setIsVisible] = useState(false);
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
        style={{
          height: "50vh",
          //   background:
          //     "linear-gradient(50deg, #fa7c30 40%, rgba(0, 0, 0, 0.1)30%)",
        }}>
        <div className="card-body">
          <div className="row card-title">
            <div className="col-6 d-flex align-items-center justify-content-start">
              <p className="fs-4">{title}</p>
            </div>
            <div className="col-6 text-end">
              <p className="fs-3">
                Rp {price} /{duration}
              </p>
            </div>
          </div>
          <p
            className="p-5 text-center card-text fs-4"
            style={{ height: "30vh" }}>
            {desc}
          </p>
          <div className="text-center fixec-bottom bottom-small">
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
