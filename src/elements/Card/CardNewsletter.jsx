import React from "react";
import "./CardNewsletter.css";
import Circlebutton from "../Buttons/Circlebutton";
import addicon1 from "../../assets/icons/add.svg"

const CardNewsletter = ({img, className, date, title}) => {
  return (
      <div className="card card-container-newsletter">
        <img src={img} alt="" className={className} />
        <div className="card-title">
            <h3>{date}</h3>
            <h1>{title}</h1>
        </div>
        <Circlebutton type={"button"} className={"btn-circle"} id={"btn-circle"} imgUrl={addicon1} imgClassName={"btn-circle-icon"}/>
      </div>
  );
};

export default CardNewsletter;
