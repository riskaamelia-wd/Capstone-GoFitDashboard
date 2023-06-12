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
const ManageMembership = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [id, setId] = useState();
  const [data, setData] = useState([]);

  const [membership, setMembership] = useState({
    title: "",
    duration: "",
    price: 0,
    description: "",
  });
  const onSubmitHandle = () => {
    alert(
      `Title: ${membership.title} \n` +
        `Duration: ${membership.duration} \n` +
        `Price: ${membership.price} \n` +
        `Description: ${membership.description}\n`
    );
  };
  const onSubmitEditHandle = async ({ id }) => {
    // const { response, isLoading } = useAxios({
    //   api: membershipApi,
    //   method: "post",
    //   headers: JSON.stringify({
    //     accept: "*/*",
    //   }),
    //   // url: inputSearch === null ? `/membership` : `/membership${inputSearch}`,
    //   url: `/newmembership/${id}`,
    //   // filter: inputSearch,
    //   body: JSON.stringify({
    //     membership,
    //   }),
    // });
  };
  const { response, isLoading } = useAxios({
    api: membershipApi,
    method: "get",

    // url: inputSearch === null ? `/membership` : `/membership${inputSearch}`,
    url: `/newmembership/`,
    // filter: inputSearch,
    body: JSON.stringify({}),
  });
  useEffect(() => {
    if (response !== null) {
      setData(response);
      // console.log(response);
    }
  }, [response]);
  // useEffect(() => {
  //   if (response !== null) {
  //     setData(response);
  //   }
  // }, [response]);
  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
    setMembership({
      title: "",
      duration: "",
      price: 0,
      description: "",
    });
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
      id: 1,
      title: "Basic Montly",
      duration: "MONTH",
      price: "49.999",
      desc: "Unlimited Health Tips Content Unlimited Video Content Library Cancel Anytime",
    },
    {
      id: 2,
      title: "Intermediate Monthly",
      duration: "3 MONTH",
      price: "144.990",
      desc: "Unlimited Health Tips Content Unlimited Video Content Library Cancel Anytime",
    },
    {
      id: 3,
      title: "Advance Monthly",
      duration: "6 MONTH",
      price: "289.990",
      desc: "Unlimited Health Tips Content Unlimited Video Content Library Cancel Anytime",
    },
    {
      id: 4,
      title: "Student",
      duration: "MONTH",
      price: "29.990",
      desc: "Unlimited Health Tips Content Unlimited Video Content Library",
    },
    {
      id: 5,
      title: "Special",
      duration: "1 Year",
      price: "400.000",
      desc: "Unlimited Health Tips Content Unlimited Video Content Library Cancel Anytime",
    },
  ];
  const ModalAddMembership = () => {
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
                onChange={(e) => {
                  setMembership((filledState) => ({
                    ...filledState,
                    title: e.target.value,
                  }));
                }}
                value={membership.title}
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
                onChange={(e) => {
                  setMembership((filledState) => ({
                    ...filledState,
                    duration: e.target.value,
                  }));
                }}
                value={membership.duration}
                placeholder={"How many month?"}
                classNameLabel={" modal-input fs-4 mb-2 mt-2"}
              />
            </div>
            <div className="col-12 ">
              <TextField
                label={"Price"}
                type={"number"}
                name={"pricemembership"}
                id={"pricemembership"}
                onChange={(e) => {
                  e.target.value < 0
                    ? alert("The price cannot be minus")
                    : setMembership((filledState) => ({
                        ...filledState,
                        price: e.target.value,
                      }));
                }}
                value={membership.price}
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
                onChange={(e) => {
                  setMembership((filledState) => ({
                    ...filledState,
                    description: e.target.value,
                  }));
                }}
                value={membership.description}
                placeholder={"What's the benefits?"}
                classNameLabel={" modal-input fs-4 mb-2 mt-2"}
              />
            </div>
            <div className="col-12 mt-4">
              {membership.title !== "" &&
              membership.price !== 0 &&
              membership.duration !== "" &&
              membership.description !== "" ? (
                <ButtonComponent
                  type={"submit"}
                  className={"btn-add fs-5"}
                  id={"submitEmail"}
                  onClick={onSubmitHandle}
                  buttonName={"Submit"}
                />
              ) : (
                //   <ButtonComponent
                //     // type={"submit"}
                //     className={"btn-disabled fs-5 w-100"}
                //     id={"login"}
                //     onClick={() => {}}
                //     buttonName={"Submit"}
                //   />
                <button
                  id="disabledbutton"
                  className="btn w-100 fw-semibold fs-5"
                  style={{ backgroundColor: "#DFDFDF" }}
                  disabled>
                  Submit
                </button>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };
  const ModalEditMembership = () => {
    return (
      <>
        <Modal show={showEdit} onHide={handleClose} centered>
          <Modal.Body className="modal-membership rounded-5">
            <div className="col-4">
              <p className="fs-4 modal-title fw-semibold">Edit Plan</p>
            </div>
            <div className="col-12">
              <TextField
                label={"Title"}
                type={"text"}
                name={"titlemembership"}
                id={"titlemembership"}
                onChange={(e) => {
                  setMembership((filledState) => ({
                    ...filledState,
                    title: e.target.value,
                  }));
                }}
                value={membership.title}
                placeholder={"Give the plan a name"}
                classNameLabel={" modal-input fs-4 mb-2 mt-2"}
                // defaultValue={title}
              />
            </div>

            <div className="col-12 ">
              <TextField
                label={"Duration"}
                type={"text"}
                name={"durationmembership"}
                id={"durationmembership"}
                onChange={(e) => {
                  setMembership((filledState) => ({
                    ...filledState,
                    duration: e.target.value,
                  }));
                }}
                value={membership.duration}
                // defaultValue={duration}
                placeholder={"How many month?"}
                classNameLabel={" modal-input fs-4 mb-2 mt-2"}
              />
            </div>
            <div className="col-12 ">
              <TextField
                label={
                  <>
                    <div>
                      Price <span className="text-danger">* </span>
                    </div>
                  </>
                }
                type={"number"}
                name={"pricemembership"}
                id={"pricemembership"}
                onChange={(e) => {
                  e.target.value < 0
                    ? alert("The price cannot be minus")
                    : setMembership((filledState) => ({
                        ...filledState,
                        price: e.target.value,
                      }));
                }}
                value={membership.price}
                placeholder={"Input the price!"}
                classNameLabel={" modal-input fs-4 mb-2 mt-2"}
                // defaultValue={price}
              />
              <small>
                <span className="text-danger">*</span>please use dots(.) instead
                of comma (,)
              </small>
            </div>
            <div className="col-12 ">
              <TextField
                label={"Description"}
                type={"text"}
                name={"descriptionmembership"}
                id={"descriptionmembership"}
                onChange={(e) => {
                  setMembership((filledState) => ({
                    ...filledState,
                    description: e.target.value,
                  }));
                }}
                value={membership.description}
                placeholder={"What's the benefits?"}
                classNameLabel={" modal-input fs-4 mb-2 mt-2"}
                // defaultValue={description}
              />
            </div>

            <div className="col-12 mt-4">
              {membership.title !== "" &&
              membership.price !== 0 &&
              membership.duration !== "" &&
              membership.description !== "" ? (
                <ButtonComponent
                  type={"submit"}
                  className={"btn-add fs-5"}
                  id={"submitEmail"}
                  onClick={onSubmitEditHandle(id)}
                  buttonName={"Submit"}
                />
              ) : (
                //   <ButtonComponent
                //     // type={"submit"}
                //     className={"btn-disabled fs-5 w-100"}
                //     id={"login"}
                //     onClick={() => {}}
                //     buttonName={"Submit"}
                //   />
                <button
                  id="disabledbutton"
                  className="btn w-100 fw-semibold fs-5"
                  style={{ backgroundColor: "#DFDFDF" }}
                  disabled>
                  Submit
                </button>
              )}
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
          // customTransition="all .5"
          transitionDuration={500}
          partialVisbile={true}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          itemClass="carousel-item-padding">
          {data.map((items) => {
            return (
              <>
                <div key={items.id}>
                  <CardMembership
                    // id={items.id}
                    title={items.title}
                    duration={items.duration}
                    price={items.price.toString().replace(/\./g, ",")}
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
        {ModalAddMembership()}
        {ModalEditMembership()}
      </>
    );
  };
  console.log(data);
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
          {}
        </div>
      </div>
    </>
  );
};
export default ManageMembership;
