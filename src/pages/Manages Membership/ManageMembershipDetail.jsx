import { useNavigate, useParams } from "react-router-dom";
import Cover from "../../elements/Card/Cover";
import member1 from "../../assets/icons/Members 1.svg";
import test from "../../assets/test.svg";
import "./ManageMembership.css";
import TagMonthYear from "../../elements/Tag/TagMonthYear";
import TagStatus from "../../elements/Tag/TagStatus";
import { useState } from "react";
const ManageMembershipDetail = () => {
  const { id } = useParams();
  const [isVisibleStatus, setIsVisibleStatus] = useState(false);
  const [isVisibleType, setIsVisibleType] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-5">
        <p className="m-0 m-auto">Manage Membership Detail no {id}</p>

        <div className="mb-5">
          <Cover
            list2={"Contact Details"}
            // list3={"list3"}
            text={"Membership"}
            list1={
              <>
                <button
                  className="back-button"
                  onClick={() => {
                    navigate(-1);
                  }}>
                  Home
                </button>
              </>
            }
            img={member1}
          />
        </div>

        <div className="membership-detail-card mb-5">
          <div className="row">
            <div className="col-12 col-lg-5 border-end border-dark">
              <div className="row ps-4 ps-lg-3">
                <div className="col-11   col-lg-12  border-bottom border-dark p-lg-3">
                  <div className="fs-3 fw-semibold">Contact Details</div>
                </div>
                <div className="col-12">
                  <div className="row  p-3">
                    {/* user photo,name, and gender */}
                    <div className="col-12 mt-3 mb-5">
                      <div className="row">
                        <div className="col-3">
                          <img
                            src={test}
                            alt=""
                            className="rounded-circle"
                            width={"90vw"}
                          />
                        </div>
                        <div className="col-8">
                          <div className="row ">
                            <div className="col-12 lh-1">
                              <p className="fs-1 fw-bold">Emma Ryan rj.</p>
                            </div>
                            <div className="col-12 lh-1">
                              <p className="fs-2 fw-semibold">Male</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* email */}
                    <div className="col-12 mt-2 mb-5">
                      <div className="row">
                        <div className="col-12 lh-1">
                          <p className="fs-5 text-secondary">Email address</p>
                        </div>
                        <div className="col-12 lh-1">
                          <p className="fs-5 fw-semibold">emma123@gmail.com</p>
                        </div>
                      </div>
                    </div>
                    {/* user height,weight, and goal */}
                    <div className="col-12 mt-2">
                      <div className="row">
                        {/* height */}
                        <div className="col-4">
                          <div className="row">
                            <div className="col-12 lh-1">
                              <p className="text-secondary fs-4">Height</p>
                            </div>
                            <div className="col-12 lh-1">
                              <p className="fw-semibold fs-3">176 cm</p>
                            </div>
                          </div>
                        </div>
                        {/* weight */}
                        <div className="col-4">
                          <div className="row">
                            <div className="col-12 lh-1">
                              <p className="text-secondary fs-4">Weight</p>
                            </div>
                            <div className="col-12 lh-1">
                              <p className="fw-semibold fs-3">68 kg</p>
                            </div>
                          </div>
                        </div>
                        {/* goal */}
                        <div className="col-4">
                          <div className="row">
                            <div className="col-12 lh-1">
                              <p className="text-secondary fs-4">Goal Weight</p>
                            </div>
                            <div className="col-12 lh-1">
                              <p className="fw-semibold fs-3">60 kg</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-7">
              <div className="p-3">
                <div className="row">
                  <div className="col-12 mb-4">
                    <p className="fs-3 fw-semibold">Edit Membership</p>
                  </div>
                  {/* type */}
                  <div className="col-12 ">
                    <div className="row">
                      <div className="col-8">
                        <p className="fw-semibold fs-5">Type</p>
                      </div>
                      <div className="col-4">
                        <span className="fw-semibold me-3">:</span>
                        <button
                          className="special-button"
                          onClick={() => {
                            setIsVisibleType(!isVisibleType);
                          }}>
                          <TagMonthYear duration={"1 month"} />
                        </button>
                        {isVisibleType === true ? (
                          <>
                            <button
                              className="special-button"
                              type="button"
                              data-bs-toggle="dropdown">
                              {/* <p className="special-tag-visible">+3</p> */}
                              <span className="special-tag-visible">+2</span>
                            </button>
                            <ul className="dropdown-menu pt-2 shadow">
                              <li className="container">
                                <button
                                  className="special-button"
                                  onClick={() => {
                                    console.log("clicked 1 year");
                                  }}>
                                  <TagMonthYear duration={"1 year"} />
                                </button>
                              </li>
                              <li className="container mt-2 mb-2">
                                <button
                                  className="special-button"
                                  onClick={() => {
                                    console.log("clicked 3 month");
                                  }}>
                                  <TagMonthYear duration={"3 month"} />
                                </button>
                              </li>
                              <li className="container mt-2 mb-2">
                                <button
                                  className="special-button"
                                  onClick={() => {
                                    console.log("clicked 1 month");
                                  }}>
                                  <TagMonthYear duration={"1 month"} />
                                </button>
                              </li>
                            </ul>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* status */}
                  <div className="col-12">
                    <div className="row">
                      <div className="col-8">
                        <p className="fw-semibold fs-5">Status</p>
                      </div>
                      <div className="col-4">
                        <span className="fw-semibold me-3">:</span>
                        <button
                          className="special-button"
                          onClick={() => {
                            setIsVisibleStatus(!isVisibleStatus);
                          }}>
                          <TagStatus status={"pending"} />
                        </button>
                        {isVisibleStatus === true ? (
                          <>
                            <button
                              className="special-button"
                              type="button"
                              data-bs-toggle="dropdown">
                              {/* <p className="special-tag-visible">+3</p> */}
                              <span className="special-tag-visible">+3</span>
                            </button>
                            <ul className="dropdown-menu pt-2 shadow">
                              <li className="container">
                                <button
                                  className="special-button"
                                  onClick={() => {
                                    console.log("clicked active");
                                  }}>
                                  <TagStatus status={"active"} />
                                </button>
                              </li>
                              <li className="container mt-2 mb-2">
                                <button
                                  className="special-button"
                                  onClick={() => {
                                    console.log("clicked pending");
                                  }}>
                                  <TagStatus status={"pending"} />
                                </button>
                              </li>
                              <li className="container">
                                <button
                                  className="special-button"
                                  onClick={() => {
                                    console.log("clicked expired");
                                  }}>
                                  <TagStatus status={"expired"} />
                                </button>
                              </li>
                            </ul>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* dates */}
                  <div className="col-12 px-3 ">
                    <div className="row bg-white200 d-flex align-items-center rounded-2">
                      <div className="col-8">
                        <p className="fw-semibold fs-5 mt-2">Dates</p>
                      </div>
                      <div className="col-4">
                        <span className="fw-semibold me-3">:</span>
                        <div className={`special-tag`}>
                          <span className="fw-semibold">Apr 16th, 2023</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* amount */}
                  <div className="col-12 px-3 mt-2">
                    <div className="row bg-white200 d-flex align-items-center rounded-2">
                      <div className="col-8">
                        <p className="fw-semibold fs-5">Amount</p>
                      </div>
                      <div className="col-4">
                        <span className="fw-semibold me-3">:</span>
                        <div className={`special-tag`}>
                          <span className="fw-semibold">Rp 99,860</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* payment method */}
                  <div className="col-12 px-3 mt-2">
                    <div className="row bg-white200 d-flex align-items-center rounded-2">
                      <div className="col-8">
                        <p className="fw-semibold fs-5">Payment Method</p>
                      </div>
                      <div className="col-4">
                        <span className="fw-semibold me-3">:</span>
                        <div className={`special-tag`}>
                          <span className="fw-semibold">Credit card</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageMembershipDetail;
