/* eslint-disable react/prop-types */
import Cover from "../../elements/Card/Cover";
import member1 from "../../assets/icons/Members 1.svg";
import CardMembership from "./CardMembership";
import "./ManageMembership.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import add from "../../assets/icons/add.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { adminApi } from "../../api/Api";
import { Puff } from "react-loader-spinner";
import ModalMembership from "./ModalMembership";
import useAxios from "../../api/useAxios";
import { useSelector } from "react-redux";
import axios from "axios";

const ManageMembership = () => {
  const token = useSelector((state) => state.tokenAuth);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [shouldRenderLoadMore, setShouldRenderLoadMore] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${token.token_jwt}`,
    },
  };
  console.log(data);
  const getData = async (page) => {
    setIsLoading(true);
    await axios
      .get(`http://18.141.56.154:8000/plans/all?page=${page}`)
      .then((response) => {
        const responseData = response.data.data;
        if (page === 1) {
          setData(responseData);
        }
        if (page > 1) {
          console.log(responseData);
          setData([...data, ...responseData]);
        }
        if (responseData.length % 10 === 0) {
          setShouldRenderLoadMore(true);
        } else {
          setShouldRenderLoadMore(false);
        }
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [membership, setMembership] = useState({
    title: "",
    duration: "",
    price: 0,
    description: "",
  });
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const body = {
      name: membership.title,
      duration: parseInt(membership.duration),
      price: parseInt(membership.price),
      description: membership.description,
    };
    await axios
      .post("http://18.141.56.154:8000/admin/plans", body, config)
      .then(() => {
        alert("Plan added successfully");
        setMembership({
          title: "",
          duration: "",
          price: 0,
          description: "",
        });
        setPage(1);
        getData(1);
        handleClose();
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
  };

  const onSubmitEditHandle = async (e) => {
    e.preventDefault();
    const body = {
      name: membership.title,
      duration: parseInt(membership.duration),
      price: parseInt(membership.price),
      description: membership.description,
    };
    await axios
      .put(`http://18.141.56.154:8000/admin/plans/${id}`, body, config)
      .then(() => {
        alert("Plan edited successfully");
        setMembership({
          title: "",
          duration: "",
          price: 0,
          description: "",
        });
        setPage(1);
        getData(1);
        handleClose();
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
  };
  const HandleDelete = async (id) => {
    await axios
      .delete(`http://18.141.56.154:8000/admin/plans/${id}`, config)
      .then(() => {
        alert("Data deleted successfully!");
        setPage(1);
        getData(1);
      })
      .catch((e) => {
        console.log("==============");
        console.log(e);
        console.log("==============");
      });
  };
  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
    setMembership({
      title: "",
      duration: "",
      price: 0,
      description: "",
    });
    setId(null);
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleLoadClick = () => {
    setPage((prevPage) => prevPage + 1);
    carouselRef.current.goToSlide(0);
    getData(page + 1);
  };
  const generalView = () => {
    return (
      <>
        {isLoading ? (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <Puff
                height="80"
                width="80"
                radius={1}
                color="#FFA83F"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          </>
        ) : (
          <>
            <Carousel
              ref={carouselRef}
              swipeable={true}
              draggable={true}
              responsive={responsive}
              ssr={true}
              keyBoardControl={true}
              partialVisible={true}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              itemClass="carousel-item-padding">
              {data
                ?.sort((a, b) => b.id - a.id)
                .map((items) => (
                  <div key={items.id}>
                    <CardMembership
                      key={items.id}
                      title={items.name}
                      duration={items.duration}
                      price={items.price}
                      desc={items.description}
                      onClickEdit={() => {
                        setShowEdit(true);
                        setId(items.id);
                        setMembership({
                          title: items.name,
                          duration: items.duration,
                          price: parseFloat(items.price),
                          description: items.description,
                        });
                      }}
                      onClickDelete={() => {
                        HandleDelete(items.id);
                      }}
                    />
                  </div>
                ))}
              {/* {hasMoreData && !isLoading && (
                <div>
                  <CardLoad />
                </div>
              )} */}
            </Carousel>
          </>
        )}
        <ModalMembership
          modaltitle={"Add Plan"}
          show={show}
          handleClose={handleClose}
          title={(e) => {
            setMembership((filledState) => ({
              ...filledState,
              title: e.target.value,
            }));
          }}
          titleValue={membership.title}
          duration={(e) => {
            setMembership((filledState) => ({
              ...filledState,
              duration: e.target.value,
            }));
          }}
          durationValue={membership.duration}
          price={(e) => {
            e.target.value < 0
              ? alert("The price cannot be minus")
              : setMembership((filledState) => ({
                  ...filledState,
                  price: e.target.value,
                }));
          }}
          priceValue={membership.price}
          description={(e) => {
            setMembership((filledState) => ({
              ...filledState,
              description: e.target.value,
            }));
          }}
          descriptionValue={membership.description}
          onSubmitHandle={onSubmitHandle}
        />
        {/* edit membership */}
        <ModalMembership
          modaltitle={"Edit Plan"}
          show={showEdit}
          handleClose={handleClose}
          title={(e) => {
            setMembership((filledState) => ({
              ...filledState,
              title: e.target.value,
            }));
          }}
          titleValue={membership.title}
          duration={(e) => {
            setMembership((filledState) => ({
              ...filledState,
              duration: e.target.value,
            }));
          }}
          durationValue={membership.duration}
          price={(e) => {
            e.target.value < 0
              ? alert("The price cannot be minus")
              : setMembership((filledState) => ({
                  ...filledState,
                  price: e.target.value,
                }));
          }}
          priceValue={membership.price}
          description={(e) => {
            setMembership((filledState) => ({
              ...filledState,
              description: e.target.value,
            }));
          }}
          descriptionValue={membership.description}
          onSubmitHandle={onSubmitEditHandle}
        />
      </>
    );
  };

  useEffect(() => {
    getData(page);
  }, [page]);
  return (
    <>
      <div className="container mt-5" id="container">
        <div className="mb-5">
          <Cover text={"Membership"} list1={"Home"} img={member1} />
          <div className="col-12 d-flex align-items-center justify-content-end mt-3">
            {shouldRenderLoadMore && (
              <button
                onClick={handleLoadClick}
                className="btn-load fw-semibold fs-5 rounded-3">
                Load More Data
              </button>
            )}
          </div>
          <div className="mt-3">
            {isLoading ? (
              <>
                <div className="d-flex align-items-center justify-content-center">
                  <Puff
                    height="80"
                    width="80"
                    radius={1}
                    color="#FFA83F"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              </>
            ) : (
              generalView()
            )}
            <div className="col-12 text-center mt-5">
              <ButtonComponent
                className={"button-add fw-semibold fs-4 rounded-4"}
                id={"addmembership"}
                onClick={() => {
                  setShow(true);
                }}
                imgUrlStart={add}
                buttonName={"Add Membership Plan"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageMembership;
