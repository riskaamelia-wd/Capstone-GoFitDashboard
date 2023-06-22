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
import moment from "moment";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import PaginateButton from "./PaginateButton";


const ManagePackagesOnline = () => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [id, setId] = useState(null);
    const [data, setData] = useState([]);
    const token = useSelector((state) => state.tokenAuth.token_jwt);
    const[isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);

     
    const fetchData = async (currentPage) => {
        setIsLoading(true);
        await axios
          .get(`http://18.141.56.154:8000/admin/classes/packages?page=${currentPage}`, 
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
            if(data.length>=10){
                const nextPage = currentPage+1
                setCurrentPage(nextPage);
                fetchData(nextPage);
            }else{
                setCurrentPage(currentPage)
                fetchData(currentPage)
            }
            handleClose();
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
            setCurrentPage(currentPage)
            fetchData(currentPage)
            handleClose();
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
        setPackage({
            classTitle: "",
            period: "",
            price: "",
        });
        setId(null);
    };
    const filteredData = data?.filter(item => item.class.class_type == 'online');
    const generalView = () => {
        return (
        <>
            {isLoading ?
            
            <Loading />
            : 
            filteredData?.length > 0 ? (
                filteredData?.sort((a,b) => b.id - a.id)?.map((item, id) => {
                return (
                    <div key={id} className="mb-3 p-0">
                    <DetailProduct
                        key={item.id}
                        text={item.class.name}
                        category={item.period}
                        date={item.price}
                        onClickDelete={() => HandleDelete(item.id)}
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
            modaltitle={"Add Package"}
            show={show}
            dataSelect={true}
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
                price:  parseFloat(e.target.value),
              }));
            }}
            onSubmitHandle={onSubmitHandle}
            />
            {/* edit packages */}
            <ClassPackages
            dataSelect={true}
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
                price:  parseFloat(e.target.value),
              }));
            }}
            onSubmitHandle={onSubmitEditHandle}
            />
        </>
        );
    };
    return (
            <div className="container mt-5" id="container">
                <div className="mb-5">
                    <Cover 
                        text={"Manage Online Class"}
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
                                        "btn-class pe-3 ps-3 m-0 border-0 border rounded p-0"
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
                    
                    <div className="mt-3">
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
export default ManagePackagesOnline;
