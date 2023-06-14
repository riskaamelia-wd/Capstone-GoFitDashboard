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
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);

  const [color, setColor] = useState(
    "linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)"
  );

  const { getGradientObject, previousColors } = useColorPicker(color, setColor);
  const gradientObject = getGradientObject();

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
    // add gradient for color
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
    setId(null);
    setColor(
      "linear-gradient(90deg, rgba(80,65,93,1) 0%, rgba(255,255,255,1) 100%)"
    );
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
  // const ModalAddMembership = () => {
  //   return (
  //     <>
  //       <Modal show={show} onHide={handleClose} centered>
  //         <Modal.Body className="modal-membership rounded-5">
  //           <div className="col-4">
  //             <p className="fs-4 modal-title fw-semibold">Add New Plan</p>
  //           </div>
  //           <div className="col-12">
  //             <TextField
  //               label={"Title"}
  //               type={"text"}
  //               name={"titlemembership"}
  //               id={"titlemembership"}
  //               onChange={(e) => {
  //                 setMembership((filledState) => ({
  //                   ...filledState,
  //                   title: e.target.value,
  //                 }));
  //               }}
  //               value={membership.title}
  //               placeholder={"Give the plan a name"}
  //               classNameLabel={" modal-input fs-4 mb-2 mt-2"}
  //             />
  //           </div>

  //           <div className="col-12 ">
  //             <TextField
  //               label={"Duration"}
  //               type={"text"}
  //               name={"durationmembership"}
  //               id={"durationmembership"}
  //               onChange={(e) => {
  //                 setMembership((filledState) => ({
  //                   ...filledState,
  //                   duration: e.target.value,
  //                 }));
  //               }}
  //               value={membership.duration}
  //               placeholder={"How many month?"}
  //               classNameLabel={" modal-input fs-4 mb-2 mt-2"}
  //             />
  //           </div>
  //           <div className="col-12 ">
  //             <TextField
  //               label={"Price"}
  //               type={"number"}
  //               name={"pricemembership"}
  //               id={"pricemembership"}
  //               onChange={(e) => {
  //                 e.target.value < 0
  //                   ? alert("The price cannot be minus")
  //                   : setMembership((filledState) => ({
  //                       ...filledState,
  //                       price: e.target.value,
  //                     }));
  //               }}
  //               value={membership.price}
  //               placeholder={"Input the price!"}
  //               classNameLabel={" modal-input fs-4 mb-2 mt-2"}
  //             />
  //           </div>
  //           <div className="col-12 ">
  //             <TextField
  //               label={"Description"}
  //               type={"text"}
  //               name={"descriptionmembership"}
  //               id={"descriptionmembership"}
  //               onChange={(e) => {
  //                 setMembership((filledState) => ({
  //                   ...filledState,
  //                   description: e.target.value,
  //                 }));
  //               }}
  //               value={membership.description}
  //               placeholder={"What's the benefits?"}
  //               classNameLabel={" modal-input fs-4 mb-2 mt-2"}
  //             />
  //           </div>
  //           <div className="col-12 mt-4">
  //             {membership.title !== "" &&
  //             membership.price !== 0 &&
  //             membership.duration !== "" &&
  //             membership.description !== "" ? (
  //               <ButtonComponent
  //                 type={"submit"}
  //                 className={"btn-add fs-5"}
  //                 id={"submitEmail"}
  //                 onClick={onSubmitAddHandle}
  //                 buttonName={"Submit"}
  //               />
  //             ) : (
  //               //   <ButtonComponent
  //               //     // type={"submit"}
  //               //     className={"btn-disabled fs-5 w-100"}
  //               //     id={"login"}
  //               //     onClick={() => {}}
  //               //     buttonName={"Submit"}
  //               //   />
  //               <button
  //                 id="disabledbutton"
  //                 className="btn w-100 fw-semibold fs-5"
  //                 style={{ backgroundColor: "#DFDFDF" }}
  //                 disabled>
  //                 Submit
  //               </button>
  //             )}
  //           </div>
  //         </Modal.Body>
  //       </Modal>
  //     </>
  //   );
  // };
  // const ModalEditMembership = () => {
  //   return (
  //     <>
  //       <Modal show={showEdit} onHide={handleClose} centered>
  //         <Modal.Body className="modal-membership rounded-5">
  //           <div className="col-4">
  //             <p className="fs-4 modal-title fw-semibold">Edit Plan</p>
  //           </div>
  //           <div className="col-12">
  //             <TextField
  //               label={"Title"}
  //               type={"text"}
  //               name={"titlemembership"}
  //               id={"titlemembership"}
  //               onChange={(e) => {
  //                 setMembership((filledState) => ({
  //                   ...filledState,
  //                   title: e.target.value,
  //                 }));
  //               }}
  //               value={membership.title}
  //               placeholder={"Give the plan a name"}
  //               classNameLabel={" modal-input fs-4 mb-2 mt-2"}
  //               // defaultValue={title}
  //             />
  //           </div>

  //           <div className="col-12 ">
  //             <TextField
  //               label={"Duration"}
  //               type={"text"}
  //               name={"durationmembership"}
  //               id={"durationmembership"}
  //               onChange={(e) => {
  //                 setMembership((filledState) => ({
  //                   ...filledState,
  //                   duration: e.target.value,
  //                 }));
  //               }}
  //               value={membership.duration}
  //               // defaultValue={duration}
  //               placeholder={"How many month?"}
  //               classNameLabel={" modal-input fs-4 mb-2 mt-2"}
  //             />
  //           </div>
  //           <div className="col-12 ">
  //             <TextField
  //               label={
  //                 <>
  //                   <div>
  //                     Price <span className="text-danger">* </span>
  //                   </div>
  //                 </>
  //               }
  //               type={"number"}
  //               name={"pricemembership"}
  //               id={"pricemembership"}
  //               onChange={(e) => {
  //                 e.target.value < 0
  //                   ? alert("The price cannot be minus")
  //                   : setMembership((filledState) => ({
  //                       ...filledState,
  //                       price: e.target.value,
  //                     }));
  //               }}
  //               value={membership.price}
  //               placeholder={"Input the price!"}
  //               classNameLabel={" modal-input fs-4 mb-2 mt-2"}
  //               // defaultValue={price}
  //             />
  //             <small>
  //               <span className="text-danger">*</span>please use dots(.) instead
  //               of comma (,)
  //             </small>
  //           </div>
  //           <div className="col-12 ">
  //             <TextField
  //               label={"Description"}
  //               type={"text"}
  //               name={"descriptionmembership"}
  //               id={"descriptionmembership"}
  //               onChange={(e) => {
  //                 setMembership((filledState) => ({
  //                   ...filledState,
  //                   description: e.target.value,
  //                 }));
  //               }}
  //               value={membership.description}
  //               placeholder={"What's the benefits?"}
  //               classNameLabel={" modal-input fs-4 mb-2 mt-2"}
  //               // defaultValue={description}
  //             />
  //           </div>

  //           <div className="col-12 mt-4">
  //             {membership.title !== "" &&
  //             membership.price !== 0 &&
  //             membership.duration !== "" &&
  //             membership.description !== "" ? (
  //               <ButtonComponent
  //                 type={"submit"}
  //                 className={"btn-add fs-5"}
  //                 id={"submitEmail"}
  //                 onClick={onSubmitEditHandle(id)}
  //                 buttonName={"Submit"}
  //               />
  //             ) : (
  //               //   <ButtonComponent
  //               //     // type={"submit"}
  //               //     className={"btn-disabled fs-5 w-100"}
  //               //     id={"login"}
  //               //     onClick={() => {}}
  //               //     buttonName={"Submit"}
  //               //   />
  //               <button
  //                 id="disabledbutton"
  //                 className="btn w-100 fw-semibold fs-5"
  //                 style={{ backgroundColor: "#DFDFDF" }}
  //                 disabled>
  //                 Submit
  //               </button>
  //             )}
  //           </div>
  //         </Modal.Body>
  //       </Modal>
  //     </>
  //   );
  // };
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
                    bgcard={`${items.bgcolor.gradientType}(${items.bgcolor.degree},${items.bgcolor.colors[0].value} 
                      ${items.bgcolor.colors[0].left}%,${items.bgcolor.colors[0].value} ${items.bgcolor.colors[0].left}%)`}
                    onClickEdit={() => {
                      setShowEdit(true);
                      setId(items.id);
                      setMembership({
                        title: items.title,
                        duration: items.duration,
                        price: parseFloat(items.price),
                        description: items.desc,
                      });
                      setColor(`${items.bgcolor.gradientType}(${items.bgcolor.degree},${items.bgcolor.colors[0].value} 
                        ${items.bgcolor.colors[0].left}%,${items.bgcolor.colors[0].value} ${items.bgcolor.colors[0].left}%)`);
                    }}
                  />
                </div>
              </>
            );
          })}
        </Carousel>
        {/* {ModalAddMembership()}
        {ModalEditMembership()} */}
        {/* add membership */}
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
          colorValue={color}
          color={setColor}
          preset={previousColors}
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
          colorValue={color}
          color={setColor}
          preset={previousColors}
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
