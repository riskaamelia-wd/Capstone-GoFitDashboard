/* eslint-disable react/prop-types */
import Cover from "../../elements/Card/Cover";
import member1 from "../../assets/icons/Members 1.svg";
import CardMembership from "./CardMembership";
import "./ManageMembership.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import add from "../../assets/icons/add.svg";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import TextField from "../../elements/TextField/TextField";
import { adminApi, membershipApi } from "../../api/Api";
import useAxios from "../../customhooks/useAxios";
import { Puff } from "react-loader-spinner";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";
import ModalMembership from "./ModalMembership";

const ManageMembership = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);

  const [membership, setMembership] = useState({
    title: "",
    duration: "",
    price: 0,
    description: "",
  });
  const onSubmitHandle = (e) => {
    e.preventDefault();
    alert(
      `Title: ${membership.title} \n` +
        `Duration: ${membership.duration} \n` +
        `Price: ${membership.price} \n` +
        `Description: ${membership.description}\n`
    );
  };

  const { response, isLoading } = useAxios({
    api: membershipApi,
    method: "get",
    url: `/newmembership/`,
    body: JSON.stringify({}),
  });
  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);

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
  const generalView = () => {
    return (
      <>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          ssr={true}
          keyBoardControl={true}
          partialVisbile={true}
          // sliderClass={"p-3"}
          // containerClass={"p-3 shadow"}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          itemClass="carousel-item-padding ">
          {data.map((items) => {
            return (
              <>
                <div key={items.id}>
                  <CardMembership
                    // id={items.id}
                    title={items.title}
                    duration={items.duration}
                    price={items.price.toLocaleString("ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                    desc={items.desc}
                    onClickEdit={() => {
                      setShowEdit(true);
                      setId(items.id);
                      setMembership({
                        title: items.title,
                        duration: items.duration,
                        price: parseFloat(items.price),
                        description: items.desc,
                      });
                    }}
                  />
                </div>
              </>
            );
          })}
        </Carousel>

        <ModalMembership
          modaltitle={"Edit Plan"}
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
          onSubmitHandle={onSubmitHandle}
        />
      </>
    );
  };
  return (
    <>
      <div className="container mt-5" id="container">
        <div className="mb-5">
          <Cover text={"Membership"} list1={"Home"} img={member1} />
          <div className="mt-5">
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
                // imgClassName={""}
                imgUrlStart={add}
                // imgUrlEnd,
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
