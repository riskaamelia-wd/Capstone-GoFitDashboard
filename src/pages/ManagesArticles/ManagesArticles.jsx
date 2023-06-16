import React from "react";
import "./ManagesArticles.css";
import Cover from "../../elements/Card/Cover";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import cardgirl1 from "../../assets/img/news-cardgirl.svg";
import cardboy1 from "../../assets/img/news-cardboy.svg";
import CardArticles from "../../elements/Card/CardArticles";

const ManagesArticles = () => {
  return (
    <>
      <div className="container manage-articles">
        <Cover text={"Articles"} list1={"Home"} img={imgCover} />
        <div className="newsletter-articles">
          <div className="title mb-4 newsletter-articles-title">
            <h1>Articles & News</h1>
          </div>
          <div className="newsletter-articles-card row">
            <div className="col-4">
              <CardArticles
                img={cardgirl1}
                date={"march 22, 2023"}
                title={"The 3 best exercises to doin your park"}
              />
            </div>
            <div className="col-4">
              <CardArticles
                img={cardboy1}
                date={"march 22, 2023"}
                title={"How to Choose The Right Equipment For You"}
              />
            </div>
            <div className="col-4">
              <CardArticles
                img={cardgirl1}
                date={"march 22, 2023"}
                title={"The 3 best exercises to doin your park"}
              />
            </div>
            <div className="col-4">
              <CardArticles
                img={cardboy1}
                date={"march 22, 2023"}
                title={"How to Choose The Right Equipment For You"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagesArticles;
