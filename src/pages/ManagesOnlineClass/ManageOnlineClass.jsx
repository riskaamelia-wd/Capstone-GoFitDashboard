/* eslint-disable react/prop-types */
import Cover from "../../elements/Card/Cover"
import "react-multi-carousel/lib/styles.css";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import { useEffect, useState } from "react";
import { adminApi } from "../../api/Api";
import useAxios from "../../api/useAxios";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../components/Loading";
import DetailProduct from "../../components/DetailProduct.jsx/DetailProduct";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import addSmall from "../../assets/icons/add_small.svg";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import InputSearch from "../../elements/InputSearch/InputSearch";
import { useNavigate } from "react-router-dom";
import OnlineClass from "../../components/Form/OnlineClass";

const ManageOnlineClass = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [id, setId] = useState(null);
    const [data, setData] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const token = useSelector((state) => state.tokenAuth);
    const [startDate, setStartDate] = useState(new Date());
    const formatDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");

    const { response, isLoading, error, fetchData } = useAxios({
        api: adminApi,
        method: "get",
        url: "/classes",
        body: JSON.stringify({}),
        header: JSON.stringify({}),
    });
    const config = {
        headers: {
        Authorization: `Bearer ${token.token_jwt}`,
        },
    };
    const [online, setOnline] = useState({
        name: "",
        started_at: null,
        description: "",
        image_banner: "",
        link: "",
        class_type: "online",
    });
    const onSubmitHandle = async (e) => {
        e.preventDefault();
        const body = {
            image_banner:online.image_banner,
            name: online.name,
            started_at: formatDate,
            description: online.description,
            link: online.link,
            class_type: "online",
        };
        await axios
        .post("http://18.141.56.154:8000/admin/classes", body, config)
        .then(() => {
            alert("Plan added successfully");
            setOnline({
                name: "",
                started_at: null,
                description: "",
                image_banner: "",
                link: "",
                class_type: "online",
            });
            handleClose();
            fetchData();
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
            image_banner:online.image_banner,
            name: online.name,
            started_at: formatDate,
            description: online.description,
            link: online.link,
            class_type: "online",
        };
        await axios
        .put(`http://18.141.56.154:8000/admin/classes/${id}`, body, config)
        .then(() => {
            alert("Plan edited successfully");
            setOnline({
                name: "",
                started_at: null,
                description: "",
                image_banner: "",
                link: "",
                class_type: "online",
            });
            handleClose();
            fetchData();
        })
        .catch((err) => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
        });
    };
    const HandleDelete = async (id) => {
        await axios
        .delete(`http://18.141.56.154:8000/admin/classes/${id}`, config)
        .then(() => {
            alert("Data deleted successfully!");
            fetchData();
        })
        .catch((e) => {
            console.log("==============");
            console.log(e);
        });
    };
    const handleClose = () => {
        setShow(false);
        setShowEdit(false);
        setOnline({
            name: "",
            started_at: null,
            description: "",
            image_banner: "",
            link: "",
            class_type: "online",
        });
        setId(null);
    };
    const generalView = () => {
        return (
        <>
            {isLoading ?
            
            <Loading />
            : 
            data?.length > 0 ? (
                data?.map((item, id) => {
                return (
                    <div key={id} className="mb-3 p-0">
                    <DetailProduct
                        key={item.id}
                        text={item.name}
                        img={item.image_banner}
                        date={item.started_at}
                        timeSession={item.link}
                        category={item.description}
                        onClickDelete={() => HandleDelete(item.id)}
                        // onClickEdit={() => handleEdit(item.id)}
                        onClickEdit={() => {
                            setShowEdit(true);
                            setId(item.id);
                            console.log(item);
                            setOnline({
                                name: item.name,
                                started_at: item.started_at,
                                description: item.description,
                                image_banner: item.image_banner,
                                link: item.link,
                                class_type: "online",
                            });
                        }}
                    />
                    </div>
                );
                }))
            : (
                <p className="text-center mt-5">No data available</p>
            )
            }

            <OnlineClass
            modaltitle={"Add Class"}
            show={show}
            handleClose={handleClose}
            nameValue={online?.name}
            description={(e) => {
                setOnline((filledState) => ({
                ...filledState,
                description: e.target.value,
                }));
            }}
            descriptionValue={online?.description}
            name={(e) => {
                setOnline((filledState) => ({
                ...filledState,
                name: e.target.value,
                }));
            }}
            startDate={startDate}
            startDateValue={(date) => 
                setStartDate(date) 
            }
            linkClass={(e) => {
                setOnline((filledState) => ({
                ...filledState,
                link: e.target.value,
                }));
            }}
            linkClassValue={online?.link}
            imageFile={(e) => {
                const file = e.target.files[0];
                setOnline((prevData) => ({
                ...prevData,
                image_banner: URL.createObjectURL(file),
                }));
            }}
            imageFileValue={online?.image_banner}
            onSubmitHandle={onSubmitHandle}
            />
            {/* edit online */}
            <OnlineClass
            modaltitle={"Edit Plan"}
            show={showEdit}
            handleClose={handleClose}
            nameValue={online?.name}
            description={(e) => {
                setOnline((filledState) => ({
                ...filledState,
                description: e.target.value,
                }));
            }}
            descriptionValue={online?.description}
            name={(e) => {
                setOnline((filledState) => ({
                ...filledState,
                name: e.target.value,
                }));
            }}
            startDate={startDate}
            startDateValue={(date) => 
                setStartDate(date) 
            }
            linkClass={(e) => {
                setOnline((filledState) => ({
                ...filledState,
                link: e.target.value,
                }));
            }}
            linkClassValue={online?.link}
            imageFile={(e) => {
                const file = e.target.files[0];
                setOnline((prevData) => ({
                ...prevData,
                image_banner: URL.createObjectURL(file),
                }));
            }}
            imageFileValue={online?.image_banner}
            onSubmitHandle={onSubmitEditHandle}
            />
        </>
        );
    };
    useEffect(() => {
        if (response !== null) {
            const onlineData = response.data.filter(
              (item) => item.class_type === "online"
            );
            setData(onlineData);
          } else {
        console.log(error);
        }
    }, [error, response]);
    return (
            <div className="container mt-5" id="container">
                <div className="mb-5">
                    <Cover text={"Manage Online Class"} list1={"Class Data"} img={imgCover} />
                
                    <Row className=" mt-5 mb-5 ms-4 me-4 d-flex justify-content-center">
                        <Col md={12} className=" d-flex flex-row justify-content-between">
                        <p
                            style={{
                            color: "var(--Neutral-Black-100)",
                            fontWeight: "700",
                            }}
                            className="p-0 m-0 fs-sm-6 fs-4">
                            Class Data
                        </p>
                            <div className="d-flex flex-row mb-3">
                                <div>
                                <InputSearch
                                    placeholder={"Search Class"}
                                    type={"text"}
                                    name={"searchClass"}
                                    id={"searchClass"}
                                    onChange={(e) => {
                                    setInputSearch(e.target.value.trim());
                                    }}
                                    value={inputSearch.replace("?search=", "")}
                                    height={45}
                                />
                                </div>
                                <ButtonComponent
                                onClick={() => navigate("/onlineClass/classPackages")}
                                buttonName={"Packages"}
                                className={
                                    "btn fw-light btn-class ms-lg-5 ms-2  ps-lg-4 pe-lg-4 pe-3 ps-3 m-0"
                                }
                                />
                                <ButtonComponent
                                    className={
                                        "btn-class pe-lg-3 ms-lg-5 ps-lg-4 pe-lg-4 ps-3 m-0 border-0 border rounded ms-2 ps-2 p-0"
                                    }
                                    id={"addOnline"}
                                    onClick={() => {
                                    setShow(true);
                                    }}
                                    imgClassName={'ms-2 pe-2'}
                                    imgUrlEnd={addSmall}
                                    buttonName={"Add Class"}
                                />
                            </div>
                        </Col>
                        <Row className="mb-4 p-0 m-0 w-100">
                        <Col className="p-0">
                            <ButtonComponent
                            onClick={() => navigate("/offlineClass")}
                            buttonName={"Offline"}
                            className={"btn col-12 btn-onl ps-0 pe-0 m-0"}
                            />
                        </Col>
                        <Col className="p-0">
                            <ButtonComponent
                            onClick={() => navigate("/onlineClass")}
                            buttonName={"Online"}
                            className={"btn col-12 btn-off ps-0 pe-0 m-0"}
                            />
                        </Col>
                        </Row>
                    
                    <div className="mt-5">
                        {isLoading ? (
                        <Loading/>)
                        : 
                        (
                        generalView()
                        )}
                    </div>
                    </Row>
                </div>
        </div>
    );
};
export default ManageOnlineClass;