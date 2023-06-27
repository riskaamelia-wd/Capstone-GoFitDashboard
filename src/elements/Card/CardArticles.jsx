import React, { useState } from "react";
// import "./CardArticles.css"
import "./CardArticlesv2.css";
import Circlebutton from "../Buttons/Circlebutton";
import addicon1 from "../../assets/icons/add.svg";

const CardArticles = ({
  img,
  className,
  classNameIMG,
  date,
  title,
  navigate,
  onDelete,
  onEdit,
}) => {
  const [show, setShow] = useState(false);
  const handleClickBtn = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <div className="position-relative m-2">
      <div className="card p-0 card-container-articles" onClick={navigate}>
        <div className="p-0 card-container-articles-body">
          <img src={img} className={classNameIMG} />
        </div>
        <div className="card-articles-body">
          <p className={"card-articles-body-Date"}>{date}</p>
          <p className={"card-articles-body-Title"}>{title}</p>
        </div>
        {/* <div>
          <Circlebutton
            type={"button"}
            className={"btn-circle"}
            id={"btn-circle"}
            imgUrl={addicon1}
            imgClassName={"btn-circle-icon"}
          />
        </div> */}
      </div>

      <div className={!show ? "article-setting" : "article-setting-show show-active"}>
        <button
          onClick={handleClickBtn}
          // style={{ textDecoration: "none", color: "white", width: "100%" }}
          className="btn article-setting-btn"
        >
          {show ? "..." : "..."}
        </button>
        {show && (
          <div className="article-setting-btn-editdelete">
            <p className="ps-3 p-2 mb-1 cursor fw-semibold text-hover" onClick={onEdit}>
              {" "}
              Edit
            </p>
            <p
              className="ps-3 p-2 mb-1 cursor fw-semibold text-hover"
              style={{ color: "red" }}
              onClick={onDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </div>
    // <div className="card card-container-articles">
    //     <img src={img} alt="" className={className} />
    //     <div className="card-title">
    //         <h3>{date}</h3>
    //         <h1>{title}</h1>
    //     </div>
    //     <Circlebutton type={"button"} className={"btn-circle"} id={"btn-circle"} imgUrl={addicon1} imgClassName={"btn-circle-icon"}/>
    //   </div>
  );
};

export default CardArticles;
