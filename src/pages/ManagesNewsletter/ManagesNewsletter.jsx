import React from "react";
import "./ManagesNewsletter.css";
import Cover from "../../elements/Card/Cover";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import cardgirl1 from "../../assets/img/news-cardgirl.svg"
import cardboy1 from "../../assets/img/news-cardboy.svg"
import ListRecomended from "../../elements/Card/ListRecomended";
import CardTraining from "../../elements/Card/CardTraining";
import CardNewsletter from "../../elements/Card/CardNewsletter";

const ManagesNewsletter = () => {
  return (
    <>
      <div className="container manage-newsletter">
        <Cover text={"Newsletter"} list1={"Home"} img={imgCover} />
        <div className="newsletter-articles">
          <div className="title mb-4 newsletter-articles-title">
            <h1>Articles & News</h1>
          </div>
          {/* <div>
            <CardTraining img={cardgirl1} />
          </div> */}
          <div className="newsletter-articles-card">
            <CardNewsletter img={cardgirl1} date={"march 22, 2023"} title={"The 3 best exercises to doin your park"}/>
            <CardNewsletter img={cardboy1} date={"march 22, 2023"} title={"How to Choose The Right Equipment For You"}/>
          </div>
          <div className="newsletter-articles-card">
            <CardNewsletter img={cardgirl1} date={"march 22, 2023"} title={"How to Maximum Time Spent at the Gym."}/>
            <CardNewsletter img={cardboy1} date={"march 22, 2023"} title={"The best day ever"}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagesNewsletter;
