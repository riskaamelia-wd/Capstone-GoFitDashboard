import Cover from "../../elements/Card/Cover";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import { useNavigate } from "react-router-dom";
import InputSearch from "../../elements/InputSearch/InputSearch";
import DetailProduct from "../../components/DetailProduct.jsx/DetailProduct";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { adminApi, classApi } from "../../api/Api";
import { useEffect, useState, useCallback } from "react";
import addSmall from "../../assets/icons/add_small.svg";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import OfflineClass from "../../components/Form/OfflineClass";
import moment from "moment";
import Loading from "../../components/Loading";
import useAxios from "../../api/useAxios";
import axios from "axios";


/* eslint-disable react/prop-types */
import "react-multi-carousel/lib/styles.css";
import PaginateButton from "../ManagesOnlineClass/PaginateButton";

const ManageOfflineClass = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [id, setId] = useState(null);
    const [data, setData] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const token = useSelector((state) => state.tokenAuth.token_jwt);
    const [startDate, setStartDate] = useState(new Date());
    const formatDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
    const [image, setImage] = useState(null)
    const[isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);

    // const { response, isLoading, error, fetchData } = useAxios({
    //     api: adminApi,
    //     method: "get",
    //     url: "/admin/classes",
    //     body: JSON.stringify({}),
    //     header: JSON.stringify({
    //         Authorization: `Bearer ${token}`,
    //     }),
    // });
      
    const fetchData = async (currentPage) => {
        setIsLoading(true);
        await axios
        .get(`http://18.141.56.154:8000/admin/classes?page=${currentPage}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            const { data } = response.data;
            setData(data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }
      
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);
    

    useEffect(() => {
        if (data.length > 10) {
          handleNextPage();
        }
    }, [data, handleNextPage]);



    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const [offline, setOffline] = useState({
        name: "",
        started_at: null,
        description: "",
        image_banner: "",
        locate: {},
        class_type: "offline",
    });

    
    const generateUniqueID = () => {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        const uniqueID = `${randomNum}`;
        return uniqueID;
      };
    const uniqueId = generateUniqueID()


    const onSubmitHandle = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("file", image);

        const body = {
            // image_banner:offline.image_banner,
            name: offline.name,
            started_at: formatDate,
            description: offline.description,
            location: offline.locate,
            class_type: "offline",
        };
        try{
        await axios
        .post("http://18.141.56.154:8000/admin/classes", body, config)
        await axios.post(
            `http://18.141.56.154:8000/admin/classes/banner/${uniqueId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        ); 
            alert("Class added successfully");
            setOffline({
                name: "",
                started_at: null,
                description: "",
                image_banner: "",
                locate: "",
                class_type: "offline",
            });
            if(data.length>=10){
                const nextPage = currentPage+1
                setCurrentPage(nextPage);
                fetchData(nextPage);
            }else{
                setCurrentPage(currentPage)
                fetchData(currentPage)
            }
            handleClose();
        }
        catch(err) {
            console.log(err);
        };
    };
    const onSubmitEditHandle = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", image);
        const body = {
            // image_banner:offline.image_banner,
            name: offline.name,
            started_at: formatDate,
            description: offline.description,
            location: offline.locate,
            class_type: "offline",
        };
        try{
        await axios
        .put(`http://18.141.56.154:8000/admin/classes/${id}`, body, config)
        
        await axios.post(
            `http://18.141.56.154:8000/admin/classes/banner/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        ); 
            alert("Class edited successfully");
            setOffline({
                name: "",
                started_at: null,
                description: "",
                image_banner: "",
                locate: "",
                class_type: "offline",
            });
            setCurrentPage(currentPage)
            fetchData(currentPage)
            handleClose();
        }
        catch(err) {
            console.log(err);
        };
    };
    const HandleDelete = async (id) => {
        await axios
        .delete(`http://18.141.56.154:8000/admin/classes/${id}`, config)
        .then(() => {
            alert("Class deleted successfully!");
            if(data.length<=1){
                const previousPage = currentPage-1
                setCurrentPage(previousPage);
                fetchData(previousPage);
            }else{
                setCurrentPage(currentPage)
                fetchData(currentPage)
            }
        })
        .catch((e) => {
            console.log(e);
        });
    };
    const handleClose = () => {
        setShow(false);
        setShowEdit(false);
        setOffline({
            name: "",
            started_at: null,
            description: "",
            image_banner: "",
            locate: "",
            class_type: "offline",
        });
        setId(null);
    };
    
    const filteredData = data?.filter(item => item.class_type == 'offline');
    const generalView = () => {
        return (
        <>
            {isLoading ?
            
            <Loading />
            : 
            filteredData?.length > 0 ? (
                filteredData?.map((item, id) => {
                return (
                    <div key={id} className="mb-3 p-0">
                    <DetailProduct
                        key={item.id}
                        text={item.name}
                        // img={item.image_banner}
                        img={`http://18.141.56.154:8000/${item.image_banner}`}
                        date={item.started_at}
                        timeSession={item.location.name}
                        category={item.location.address}
                        onClickDelete={() => HandleDelete(item.id)}
                        // onClickEdit={() => handleEdit(item.id)}
                        onClickEdit={() => {
                            setShowEdit(true);
                            setId(item.id);
                            console.log(item);
                            setOffline({
                                name: item.name,
                                started_at: item.started_at,
                                description: item.description,
                                image_banner: item.image_banner,
                                locate: item.locate,
                                class_type: "offline",
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

            <OfflineClass
            modaltitle={"Add Class"}
            show={show}
            handleClose={handleClose}
            nameValue={offline?.name}
            description={(e) => {
                setOffline((filledState) => ({
                ...filledState,
                description: e.target.value,
                }));
            }}
            descriptionValue={offline?.description}
            name={(e) => {
                setOffline((filledState) => ({
                ...filledState,
                name: e.target.value,
                }));
            }}
            startDate={startDate}
            startDateValue={(date) => 
                setStartDate(date) 
            }
            locateSelect={(e) => {
                const parseValue = parseInt(e.target.value);
                const objValue = { id: parseValue };
                setOffline((filledState) => ({
                  ...filledState,
                  locate: objValue,
                }));
              }}
            locateValue={offline?.locate}
            imageFile={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setOffline((prevData) => ({
                ...prevData,
                image_banner: URL.createObjectURL(file),
                }));
            }}
            imageFileValue={offline?.image_banner}
            onSubmitHandle={onSubmitHandle}
            />
            {/* edit offline */}
            <OfflineClass
            modaltitle={"Edit Plan"}
            show={showEdit}
            handleClose={handleClose}
            nameValue={offline?.name}
            description={(e) => {
                setOffline((filledState) => ({
                ...filledState,
                description: e.target.value,
                }));
            }}
            descriptionValue={offline?.description}
            name={(e) => {
                setOffline((filledState) => ({
                ...filledState,
                name: e.target.value,
                }));
            }}
            startDate={startDate}
            startDateValue={(date) => 
                setStartDate(date) 
            }
            locateSelect={(e) => {
                const parseValue = parseInt(e.target.value);
                const objValue = { id: parseValue };
                setOffline((filledState) => ({
                  ...filledState,
                  locate: objValue,
                }));
              }}
            locateValue={offline?.locate}
            imageFile={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setOffline((prevData) => ({
                ...prevData,
                image_banner: URL.createObjectURL(file),
                }));
            }}
            imageFileValue={offline?.image_banner}
            onSubmitHandle={onSubmitEditHandle}
            />
        </>
        );
    };
    // useEffect(() => {
    //     if (response !== null) {
    //         const offlineData = response.data.filter(
    //           (item) => item.class_type === "offline"
    //         );
    //         setData(offlineData);
    //       } else {
    //     console.log(error);
    //     }
    // }, [error, response]);
    return (
            <div className="container mt-5" id="container">
                <div className="mb-5">
                    <Cover text={"Manage Offline Class"} list1={"Class Data"} img={imgCover} />
                
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
                                    onClick={() => navigate("/offlineClass/location")}
                                    buttonName={"Location"}
                                    className={
                                        "btn fw-light btn-class ms-lg-5 ms-2  ps-lg-4 pe-lg-4 pe-3 ps-3 m-0"
                                }
                                />
                                <ButtonComponent
                                onClick={() => navigate("/offlineClass/classPackages")}
                                buttonName={"Packages"}
                                className={
                                    "btn fw-light btn-class ms-lg-5 ms-2  ps-lg-4 pe-lg-4 pe-3 ps-3 m-0"
                                }
                                />
                                <ButtonComponent
                                    className={
                                        "btn-class pe-lg-3 ms-lg-5 ps-lg-4 m-0 border-0 border rounded ms-2 ps-lg-2 p-0"
                                    }
                                    id={"addOffline"}
                                    onClick={() => {
                                    setShow(true);
                                    }}
                                    imgClassName={'pe-2'}
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
                            className={"btn col-12 btn-off ps-0 pe-0 m-0"}
                            />
                        </Col>
                        <Col className="p-0">
                            <ButtonComponent
                            onClick={() => navigate("/onlineClass")}
                            buttonName={"Online"}
                            className={"btn col-12 btn-onl ps-0 pe-0 m-0"}
                            />
                        </Col>
                        </Row>
                    
                    <div className="mt-5">
                        <PaginateButton
                            handleNextPage={handleNextPage}
                            handlePrevPage={handlePrevPage}
                            disabledNext={data?.length < 10}
                            disabledPrevious={currentPage == 1}
                        />
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
export default ManageOfflineClass;