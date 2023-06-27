import React, { useState, useEffect } from "react";
import "./ManagesFeedback.css";
import "./FeedbackDetail.css";
import Cover from "../../elements/Card/Cover";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import Icon1Expandmore from "../../assets/icons/expand_more.svg";
import Icon2Expandless from "../../assets/icons/expand_less.svg";
import Icon3Anonymous from "../../assets/icons/feedback_anonymous_img.svg";
import Icon4Deletecard from "../../assets/icons/delete_feedback_gray.svg";
import Icon5back from "../../assets/icons/close-cancel.svg";
import ListMenuFeedbackCard from "../../elements/Card/ListMenuFeedbackCard";
import CardFeedbackDetails from "../../elements/Card/CardFeedbackDetails";
import { Pagination } from "react-bootstrap";
import axios from "axios";
// import Tabsfeedbackcomp from "../../components/Tabsfeedback/Tabsfeedbackcomp";

const ManagesFeedback = () => {
  const [feedbacks, setfeedback] = useState([
    // {
    //   title: "Emmer",
    //   date: "2022-06-01",
    //   subtitle: "Grass-roots background synergy",
    //   id: 1,
    // },
    // {
    //   title: "Hilhj",
    //   date: "2023-05-23",
    //   subtitle: "Devolved eco-centric hardware",
    //   id: 2,
    // },
  ]);

  const fetchfeedback = async () => {
    try {
      const response = await axios.get(
        "https://64866e02beba6297278ec839.mockapi.io/feedback"
      );
      setfeedback(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchfeedback();
  }, []);

  const [openbuttonweek, setopenbuttonweek] = useState(false);
  const [openfeedback, setopenfeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState("This Week");

  // Define the time thresholds for each category
  const oneYearago = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  const oneMonthago = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const oneWeekago = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const Yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const Today = new Date();

  // Filter the feedbacks based on the time categories
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const feedbackTime = new Date(feedback.time);

    if (feedbackTime >= oneYearago) {
      // Feedback within the past year
      return true;
    } else if (feedbackTime >= oneMonthago) {
      // Feedback within the past month
      return selectedOption === "This Month";
    } else if (feedbackTime >= oneWeekago) {
      // Feedback within the past week
      return selectedOption === "This Week";
    } else if (feedbackTime >= Yesterday) {
      // Feedback from yesterday
      return selectedOption === "Yesterday";
    } else {
      // Feedback from today
      return selectedOption === "Today";
    }
  });

  // Sort ascending id
  const [isSortFeedback, setSortFeedback] = useState({
    key: null,
    direction: "ascending",
  });
  const [iscurrentpagefeedback, setcurrentpagefeedback] = useState(1);
  const feedbackinPage = 10;

  const sortedFeedback = [...feedbacks].sort((a, b) => {
    if (isSortFeedback.key) {
      if (a[isSortFeedback.key] < b[isSortFeedback.key]) {
        return isSortFeedback.direction === `ascending` ? -1 : 1;
      }
      if (a[isSortFeedback.key] > b[isSortFeedback.key]) {
        return isSortFeedback.direction === `ascending` ? 1 : -1;
      }
    }
    return 0;
  });
  //reverse sorted id
  const reversedSortedFeedback = [...sortedFeedback].reverse();

  //calculate pagenation
  const indexOfLastItem = iscurrentpagefeedback * feedbackinPage;
  const indexOfFirstItem = indexOfLastItem - feedbackinPage;
  const currentFeedback = reversedSortedFeedback.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const showingFrom = indexOfFirstItem + 1;
  const showingTo = Math.min(indexOfLastItem, reversedSortedFeedback.length);

  // Change page
  const handlePageChange = (pageNumber) => {
    setcurrentpagefeedback(pageNumber);
  };

  const handlePrevPage = () => {
    if (iscurrentpagefeedback > 1) {
      setcurrentpagefeedback(iscurrentpagefeedback - 1);
    }
  };

  const handleNextPage = () => {
    if (
      iscurrentpagefeedback <
      Math.ceil(reversedSortedFeedback.length / feedbackinPage)
    ) {
      setcurrentpagefeedback(iscurrentpagefeedback + 1);
    }
  };

  // Generate page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(reversedSortedFeedback.length / feedbackinPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  // feedback detail
  const [selectedfeedback, setselectedfeedback] = useState(null);
  const getselectedfeedback = () => {
    return feedbacks.find((feedback) => feedback.id === selectedfeedback);
  };

  const handleOpenbtn = () => {
    setopenbuttonweek(!openbuttonweek);
  };
  const handleMenuSelection = (option) => {
    setSelectedOption(option);
    setopenbuttonweek(false);
  };
  const handleclosefeedback = () => {
    setopenfeedback(false);
  };

  // feedback close delete detail
  const handleclosedeletefeedback = (id) => {
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete this feedback id:(${id})?`
    //   )
    // ) {
      setfeedback((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback.id !== selectedfeedback)
      );
      setopenfeedback(false);
    // }
  };

  // const handleclosedeletefeedback = async (id) => {
  //   if (window.confirm(`Are you sure you want to delete this feedback id:(${id})?`)) {
  //   try {
  //     await axios.delete(
  //       `https://64866e02beba6297278ec839.mockapi.io/feedback/${id}/`
  //     );
  //     // Fetch the updated feedbacks after deletion
  //     setfeedback((prevFeedbacks) =>
  //       prevFeedbacks.filter((feedback) => feedback.id !== id)
  //     );
  //     setopenfeedback(false);
  //     fetchfeedback()
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // };

  const handleDeleteFeedback = async (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete this feedback id:(${id})?`
      )
    ) {
      try {
        await axios.delete(
          `https://64866e02beba6297278ec839.mockapi.io/feedback/${id}`
        );
        // Fetch the updated feedbacks after deletion
        fetchfeedback();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const handleDeleteFeedback = (id) => {
  //   setfeedback((prevFeedbacks) =>
  //     prevFeedbacks.filter((feedback) => feedback.id !== id)
  //   );
  // };

  //   const buttonweekclassname = `btn-feedback-sort ${openbuttonweek ? "active" : ""} ${openfeedback ? "btn-feedback-sort-NX" : ""}`;
  const buttonfeedbackstateclassname = `${
    openfeedback
      ? "feedback-history-body-card-NX"
      : "feedback-history-body-card"
  }`;

  const historybody1classname = `${
    openfeedback ? "feedback-history-body-1-NX" : "feedback-history-body-1"
  }`;

  return (
    <>
      <div className="container manage-feedback">
        <Cover text={"Feedback"} list1={"Home"} img={imgCover} />
        <div className="container feedback-history">
          <div className="feedback-history-split">
            <div className={historybody1classname}>
              <div className="feedback-history-top">
                <h1
                  className={`${
                    openfeedback
                      ? "feedback-history-top-review-NX"
                      : "feedback-history-top-review"
                  }`}
                >
                  Review
                </h1>
                <div className="dropdown">
                  <ButtonComponent
                    type={"button"}
                    className={`btn-feedback-sort ${
                      openbuttonweek ? "active" : ""
                    }`}
                    buttonName={selectedOption}
                    imgUrlEnd={
                      openbuttonweek ? Icon2Expandless : Icon1Expandmore
                    }
                    imgClassName={"btn-feedback-sort-img"}
                    onClick={handleOpenbtn}
                  />
                  {openbuttonweek ? (
                    <ul className="feedback-sort-menu">
                      <li className="menu-item feedback-sort-menu-option">
                        <ButtonComponent
                          type={"button"}
                          className={"btn-feedback-sort-menu"}
                          buttonName={"Today"}
                          onClick={() => handleMenuSelection("Today")}
                        />
                        <ButtonComponent
                          type={"button"}
                          className={"btn-feedback-sort-menu"}
                          buttonName={"Yesterday"}
                          onClick={() => handleMenuSelection("Yesterday")}
                        />
                        <ButtonComponent
                          type={"button"}
                          className={"btn-feedback-sort-menu"}
                          buttonName={"This Week"}
                          onClick={() => handleMenuSelection("This Week")}
                        />
                        <ButtonComponent
                          type={"button"}
                          className={"btn-feedback-sort-menu"}
                          buttonName={"This Month"}
                          onClick={() => handleMenuSelection("This Month")}
                        />
                        <ButtonComponent
                          type={"button"}
                          className={"btn-feedback-sort-menu"}
                          buttonName={"This Year"}
                          onClick={() => handleMenuSelection("This Year")}
                        />
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>

              {currentFeedback.length > 0 ? (
                currentFeedback.map((feedback) => {
                  return (
                    <div
                      key={feedback.id}
                      className={buttonfeedbackstateclassname}
                    >
                      <ListMenuFeedbackCard
                        img={Icon3Anonymous}
                        judul={feedback.title}
                        date={feedback.time}
                        subJudul={feedback.subtitle}
                        className1={"listMenuFeedback p-2 d-flex flex-row"}
                        className2={"ps-3 pe-3"}
                        className3={"feedback-card-top"}
                        className4={"feedback-card-top-title"}
                        className5={"feedback-card-top-subtitle"}
                        onClick={(e) => {
                          setselectedfeedback(feedback.id);
                          setopenfeedback(true);
                        }}
                      />
                      <ButtonComponent
                        type={"button"}
                        className={"btn-feedback-body-card-delete"}
                        buttonName={"Delete"}
                        imgUrlStart={Icon4Deletecard}
                        imgClassName={"img-body-card-delete"}
                        onClick={() => handleDeleteFeedback(feedback.id)}
                      />
                    </div>
                  );
                })
              ) : (
                <div>data kosong</div>
              )}
              {feedbacks.length > 0 && (
                <div>
                  <Pagination className="d-flex justify-content-between">
                    <p>
                      showing {showingFrom} to {showingTo} of{" "}
                      {sortedFeedback.length} entries
                    </p>
                    <div className="d-flex flex-row">
                      <Pagination.Prev
                        onClick={handlePrevPage}
                        disabled={iscurrentpagefeedback === 1}
                        className="me-2 rounded-3"
                      >
                        Previous
                      </Pagination.Prev>

                      {pageNumbers.map((number) => (
                        <Pagination.Item
                          key={number}
                          active={number === currentFeedback}
                          onClick={() => handlePageChange(number)}
                        >
                          {number}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next
                        onClick={handleNextPage}
                        disabled={
                          iscurrentpagefeedback ===
                          Math.ceil(sortedFeedback.length / feedbackinPage)
                        }
                        className="ms-2"
                      >
                        Next
                      </Pagination.Next>
                    </div>
                  </Pagination>
                </div>
              )}
            </div>
            {openfeedback ? (
              <>
                <hr className="middle-line" />
                <div className="feedback-history-body-2">
                  <div className="feedback-history-top-2">
                    <h1 className="feedback-history-top-2-detail">Detail</h1>
                  </div>
                  <CardFeedbackDetails
                    feedback={getselectedfeedback()}
                    className1={"feedback-card-detail"}
                    className2={"feedback-card-detail-top"}
                    className3={"feedback-card-detail-top-title"}
                    className4={"feedback-card-detail-top-date"}
                    className5={"feedback-card-detail-bottom"}
                    className6={"feedback-card-detail-bottom-title"}
                  />
                  <div className="feedback-history-bottom-back">
                    <ButtonComponent
                      type={"button"}
                      className={"btn-feedback-body-card-back"}
                      buttonName={""}
                      imgUrlStart={Icon5back}
                      imgClassName={"img-body-card-delete"}
                      onClick={handleclosefeedback}
                    />
                  </div>
                  <div className="feedback-history-bottom-2">
                    <ButtonComponent
                      type={"button"}
                      className={"btn-feedback-body-card-delete"}
                      buttonName={"Delete"}
                      imgUrlStart={Icon4Deletecard}
                      imgClassName={"img-body-card-delete"}
                      onClick={handleclosedeletefeedback}
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagesFeedback;
