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
import { useState } from "react";
import TextField from "../../elements/TextField/TextField";
const ManageMembership = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      slidesToSlide: 2, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
  };
  const item = [
    {
      title: "Basic Montly",
      duration: "MONTH",
      price: "49,999",
      desc: "Unlimited Health Tips Content Unlimited Video Content Library Cancel Anytime",
    },
    {
      title: "Intermediate Monthly",
      duration: "3 MONTH",
      price: "144.990",
      desc: "Unlimited Health Tips Content Unlimited Video Content Library Cancel Anytime",
    },
    {
      title: "Advance Monthly",
      duration: "6 MONTH",
      price: "289,990",
      desc: "Unlimited Health Tips Content Unlimited Video Content Library Cancel Anytime",
    },
    {
      title: "Student",
      duration: "MONTH",
      price: "29,990",
      desc: "Unlimited Health Tips Content Unlimited Video Content Library",
    },
    {
      title: "Special",
      duration: "1 Year",
      price: "400,000",
      desc: "Unlimited Health Tips Content Unlimited Video Content Library Cancel Anytime",
    },
  ];
  const ModalMembership = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body className="modal-membership rounded-5">
            <div className="col-4">
              <p className="fs-4 modal-title fw-semibold">Add New Plan</p>
            </div>
            <div className="col-12">
              <TextField
                label={"Title"}
                type={"text"}
                name={"titlemembership"}
                id={"titlemembership"}
                // onChange={()=>{}}
                // value
                placeholder={"Give the plan a name"}
                classNameLabel={" modal-input fs-4 mb-2 mt-2"}
              />
            </div>

            <div className="col-12 ">
              <TextField
                label={"Duration"}
                type={"text"}
                name={"durationmembership"}
                id={"durationmembership"}
                // onChange={()=>{}}
                // value
                placeholder={"How many month?"}
                classNameLabel={" modal-input fs-4 mb-2 mt-2"}
              />
            </div>
            <div className="col-12 ">
              <TextField
                label={"Price"}
                type={"text"}
                name={"pricemembership"}
                id={"pricemembership"}
                // onChange={()=>{}}
                // value
                placeholder={"Input the price!"}
                classNameLabel={" modal-input fs-4 mb-2 mt-2"}
              />
            </div>
            <div className="col-12 ">
              <TextField
                label={"Description"}
                type={"text"}
                name={"descriptionmembership"}
                id={"descriptionmembership"}
                // onChange={()=>{}}
                // value
                placeholder={"What's the benefits?"}
                classNameLabel={" modal-input fs-4 mb-2 mt-2"}
              />
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };
  const generalView = () => {
    return (
      <>
        <Carousel
          swipeable={true}
          draggable={true}
          // showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          // infinite={true}
          // autoPlay={this.props.deviceType !== "mobile" ? true : false}
          // autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          partialVisbile={true}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          itemClass="carousel-item-padding">
          {item.map((items) => {
            return (
              <>
                <div>
                  <CardMembership
                    title={items.title}
                    duration={items.duration}
                    price={items.price}
                    desc={items.desc}
                  />
                </div>
              </>
            );
          })}
        </Carousel>
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
        {ModalMembership()}
      </>
    );
  };

  return (
    <>
      {/* {console.log(filteredDate)} */}
      <div className="container mt-5">
        <div className="mb-5">
          <Cover
            // list2={"list2"}
            // list3={"list3"}
            text={"Membership"}
            list1={"Home"}
            img={member1}
          />
          <div className="mt-5">{generalView()}</div>
        </div>
      </div>
    </>
  );
};
export default ManageMembership;
