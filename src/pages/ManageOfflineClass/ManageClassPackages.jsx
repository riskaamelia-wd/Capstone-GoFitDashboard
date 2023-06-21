import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import DetailProduct from "../../components/DetailProduct.jsx/DetailProduct";
import Cover from "../../elements/Card/Cover";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import { Row, Col } from "react-bootstrap";
import { adminApi } from "../../api/Api";
import ClassPackages from "../../components/Form/classPackages";
import addSmall from "../../assets/icons/add_small.svg";
import Loading from "../../components/Loading";
import useAxios from "../../api/useAxios";
import { useNavigate } from "react-router-dom";
import InputSearch from "../../elements/InputSearch/InputSearch";
import moment from 'moment'
import ButtonComponent from "../../elements/Buttons/ButtonComponent";


const ManageClassPackages = () => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [id, setId] = useState(null);
    const [data, setData] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const token = useSelector((state) => state.tokenAuth);
    const [startDate, setStartDate] = useState(new Date());

    const { response, isLoading, error, fetchData } = useAxios({
        api: adminApi,
        method: "get",
        url: "/admin/classes/packages",
        body: JSON.stringify({}),
        header: JSON.stringify({
            Authorization: `Bearer ${token.token_jwt}`,
        }),
    });
    const config = {
        headers: {
        Authorization: `Bearer ${token.token_jwt}`,
        },
    };
    const [packages, setPackage] = useState({
        classTitle: "",
        period: "",
        price: "",
    });
    const onSubmitHandle = async (e) => {
        e.preventDefault();
        const body = {
            class: packages.classTitle,
            period: packages.period,
            price: packages.price,
        };
        await axios
        .post("http://18.141.56.154:8000/admin/classes/packages", body, config)
        .then(() => {
            alert("Package added successfully");
            setPackage({
                classTitle: "",
                period: "",
                price: "",
            });
            handleClose();
            fetchData();
        })
        .catch((err) => {
            console.log(err);
        });
    };
    const onSubmitEditHandle = async (e) => {
        e.preventDefault();
        const body = {
            class: packages.classTitle,
            period: packages.period,
            price: packages.price,
        };
        await axios
        .put(`http://18.141.56.154:8000/admin/classes/packages/${id}`, body, config)
        .then(() => {
            alert("Package edited successfully");
            setPackage({
                classTitle: "",
                period: "",
                price: "",
            });
            handleClose();
            fetchData();
        })
        .catch((err) => {
            console.log(err);
        });
    };
    const HandleDelete = async (id) => {
        await axios
        .delete(`http://18.141.56.154:8000/admin/classes/packages/${id}`, config)
        .then(() => {
            alert("Package deleted successfully!");
            fetchData();
        })
        .catch((e) => {
            console.log(e);
        });
    };
    const handleClose = () => {
        setShow(false);
        setShowEdit(false);
        setPackage({
            classTitle: "",
            period: "",
            price: "",
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
                        text={item.class.name}
                        category={item.period}
                        date={item.price}
                        onClickDelete={() => HandleDelete(item.id)}
                        // onClickEdit={() => handleEdit(item.id)}
                        onClickEdit={() => {
                            setShowEdit(true);
                            setId(item.id);
                            console.log(item);
                            setPackage({
                                classTitle: item.class,
                                period: item.period,
                                price: item.price,
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

            <ClassPackages
            dataSelect={false}
            modaltitle={"Add Package"}
            show={show}
            handleClose={handleClose}
            classValue={packages?.classTitle}
            classSelect={(e) => {
              const parseValue = parseInt(e.target.value);
              const objValue = { id: parseValue };
              setPackage((filledState) => ({
                ...filledState,
                classTitle: objValue,
              }));
            }}
            periodValue={packages?.period}
            periodSelect={(e) => {
              setPackage((filledState) => ({
                ...filledState,
                period: e.target.value,
              }));
            }}
            priceValue={packages?.price}
            price={(e) => {
              setPackage((filledState) => ({
                ...filledState,
                price: parseFloat(e.target.value),
              }));
            }}
            onSubmitHandle={onSubmitHandle}
            />
            {/* edit packages */}
            <ClassPackages
            dataSelect={false}
            modaltitle={"Edit Package"}
            show={showEdit}
            handleClose={handleClose}
            classValue={packages?.classTitle}
            classSelect={(e) => {
              const parseValue = parseInt(e.target.value);
              const objValue = { id: parseValue };
              setPackage((filledState) => ({
                ...filledState,
                classTitle: objValue,
              }));
            }}
            periodValue={packages?.period}
            periodSelect={(e) => {
              setPackage((filledState) => ({
                ...filledState,
                period: e.target.value,
              }));
            }}
            priceValue={packages?.price}
            price={(e) => {
              setPackage((filledState) => ({
                ...filledState,
                price: parseFloat(e.target.value),
              }));
            }}
            onSubmitHandle={onSubmitEditHandle}
            />
        </>
        );
    };
    useEffect(() => {
        if (response !== null) {
            const offlineData = response?.data.filter(
                (item) => item.class.class_type === "offline"
              );
            setData(offlineData)
            setData(response.data)
          } else {
        console.log(error);
        }
    }, [error, response]);
    return (
            <div className="container mt-5" id="container">
                <div className="mb-5">
                    <Cover 
                        text={"Manage Offline Class"}
                        list1={"Class Data"}
                        list2={"Class Packages"}
                        img={imgCover} 
                    />
                
                    <Row className=" mt-5 mb-5 ms-4 me-4 d-flex justify-content-center">
                        <Col md={12} className=" d-flex flex-row justify-content-between">
                        <p
                            style={{
                            color: "var(--Neutral-Black-100)",
                            fontWeight: "700",
                            }}
                            className="p-0 m-0 fs-sm-6 fs-4">
                            Class Packages
                        </p>
                            <div className="d-flex flex-row mb-3">
                                <ButtonComponent
                                    className={
                                        "btn-class pe-3 ms-lg-5 ps-3 m-0 border-0 border rounded ms-2  p-0"
                                    }
                                    id={"addPackage"}
                                    onClick={() => {
                                    setShow(true);
                                    }}
                                    imgClassName={'ps-2'}
                                    imgUrlEnd={addSmall}
                                    buttonName={"Add Package"}
                                />
                            </div>
                        </Col>
                    
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
export default ManageClassPackages;
