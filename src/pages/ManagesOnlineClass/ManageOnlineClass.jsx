import Cover from "../../elements/Card/Cover";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import { useNavigate } from "react-router-dom";
import InputSearch from "../../elements/InputSearch/InputSearch";
import DetailProduct from "../../components/DetailProduct.jsx/DetailProduct";
import { Col, Row, Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import { adminApi, classApi } from "../../api/Api";
import { useEffect, useState, useCallback } from "react";
import addSmall from "../../assets/icons/add_small.svg";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import moment from "moment";
import OnlineClass from "../../components/Form/OnlineClass";
import "./OnlineClass.css";
import Loading from "../../components/Loading";
import useAxios from "../../api/useAxios";

const ManagesOnlineClass = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.tokenAuth.token_jwt);
  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const formatDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
  const [online, setOnline] = useState({
    name: "",
    started_at: null,
    description: "",
    imageFile: "",
    linkClass: "",
    class_type: "online",
  });
  const { response, isLoading, error, fetchData } = useAxios({
    api: "http://18.141.56.154:8000",
    method: "get",
    url: `/classes?search=${inputSearch}`,
    body: JSON.stringify({}),
    header: JSON.stringify({
      Authorization: `Bearer ${token}`,
    }),
  });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getData = useCallback(async () => {
    await adminApi
      .get("/classes")
      .then(async (res) => {
        const resData = res.data;
        setData(resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (response !== null) {
      const onlineData = response.data.filter(
        (item) => item.class_type === "online"
      );
      setData(onlineData);
    }
    console.log(data);
    {
      console.log(error);
    }
  }, [error, getData, response]);

  const handleDelete = async (id) => {
    await adminApi.delete(`/admin/classes/${id}`, null, config).then(() => {
      fetchData();
      alert("Data deleted successfully");
    });
  };

  const handleEdit = async (id) => {
    await adminApi.get(`/admin/classes/${id}`, config).then(async (res) => {
      await fetchData();
      setOnline(res?.data?.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finder = data.find((item) => item.id === online.id);
    const body = {
      // image:online.imageFile,
      name: online.name,
      started_at: formatDate,
      description: online.description,
      link: online.linkClass,
      class_type: "online",
    };

    if (window.confirm("Are you sure you want to submit?")) {
      if (finder) {
        await adminApi
          .put(`/admin/classes/${online.id}`, body, config)
          .then((res) => {
            alert("data edited successfully");
            console.log(res);
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await adminApi
          .post("/admin/classes", body, config)
          .then((res) => {
            alert("data added successfully");
            console.log(res);
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div className="bgColor container-fluid">
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
            <OnlineClass
              btnModalImg={addSmall}
              btnModalText={"Add Class "}
              className={
                "btn-class pe-lg-3 ms-lg-5 ps-lg-4 pe-lg-4 ps-3 m-0 border-0 border rounded ms-2 ps-2"
              }
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
              startDateValue={(date) => setStartDate(date)}
              onSubmit={handleSubmit}
              linkClass={(e) => {
                setOnline((filledState) => ({
                  ...filledState,
                  linkClass: e.target.value,
                }));
              }}
              linkClassValue={online?.linkClass}
              imageFile={(e) => {
                const file = e.target.files[0];
                setOnline((prevData) => ({
                  ...prevData,
                  imageFile: URL.createObjectURL(file),
                }));
              }}
              imageFileValue={online?.imageFile}
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
        <Row className="pe-0">
          <Col className="p-0">
            {isLoading ? (
              <Loading />
            ) : data?.length > 0 ? (
              data?.map((item, id) => {
                return (
                  <div key={id} className="mb-3 p-0">
                    <DetailProduct
                      img={addSmall}
                      key={id}
                      text={item.name}
                      date={item.started_at}
                      timeSession={item.link}
                      category={item.description}
                      onClickDelete={() => handleDelete(item.id)}
                      onClickEdit={() => handleEdit(item.id)}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-center mt-5">No data available</p>
            )}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default ManagesOnlineClass;
