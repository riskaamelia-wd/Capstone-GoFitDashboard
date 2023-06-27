import { useCallback, useEffect, useState } from "react";
import Cover from "../../elements/Card/Cover";
import DetailProduct from "../../components/DetailProduct.jsx/DetailProduct";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import { Row, Col } from "react-bootstrap";
import addSmall from "../../assets/icons/add_small.svg";
import { useSelector } from "react-redux";
import ClassLocation from "../../components/Form/ClassLocation";
import { adminApi } from "../../api/Api";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Loading from "../../components/Loading";
import useAxios from "../../api/useAxios";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import InputSearch from "../../elements/InputSearch/InputSearch";
import PaginateButton from "../ManagesOnlineClass/PaginateButton";


const ManageLocation = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.tokenAuth.token_jwt);
  const[isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  const containerStyle = {
    width: "180%",
    height: "200px",
  };
  const center = {
    lat: -6.2,
    lng: 106.816666,
  };

  const [markers, setMarker] = useState([]);
  const handleClicked = (e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarker([newMarker]);
  };

  const lastMarker = markers[markers.length - 1];

  const lat = lastMarker ? lastMarker.lat.toString() : null;
  const lng = lastMarker ? lastMarker.lng.toString() : null;

  // const { response, isLoading, error, fetchData } = useAxios({
  //     api: adminApi,
  //     method: "get",
  //     url: "/locations",
  //     body: JSON.stringify({}),
  //     header: JSON.stringify({}),
  // });
  
  const fetchData = async (currentPage) => {
    setIsLoading(true);
    await axios
      .get(`http://18.141.56.154:8000/locations?page=${currentPage}`, 
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
  const [loc, setLoc] = useState({
    name: "",
    city: "",
    address: "",
    latitude: lat,
    longitude: lng,
  });
  const onSubmitHandle = async (e) => {
      e.preventDefault();
      const body = {
        name: loc.name,
        city: loc.city,
        address: loc.address,
        latitude: lat,
        longitude: lng,
      };
      await axios
      .post("http://18.141.56.154:8000/admin/locations", body, config)
      .then(() => {
          alert("Location added successfully");
          setLoc({
            name: "",
            city: "",
            address: "",
            latitude: lat,
            longitude: lng,
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
        name: loc.name,
        city: loc.city,
        address: loc.address,
        latitude: lat,
        longitude: lng,
      };
      await axios
      .put(`http://18.141.56.154:8000/admin/locations/${id}`, body, config)
      .then(() => {
          alert("Location edited successfully");
          setLoc({
            name: "",
            city: "",
            address: "",
            latitude: lat,
            longitude: lng,
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
      .delete(`http://18.141.56.154:8000/admin/locations/${id}`, config)
      .then(() => {
          alert("Location deleted successfully!");
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
      setLoc({
        name: "",
        city: "",
        address: "",
        latitude: lat,
        longitude: lng,
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
              data?.sort((a,b) => b.id - a.id)?.map((item, id)  => {
              return (
                  <div key={id} className="mb-3 p-0">
                  <DetailProduct
                      key={item.id}
                      text={item.name}
                      date={`${item.address}, ${item.city}`}
                      category={`latitude : ${item.latitude}, longitude : ${item.longitude}`}
                      onClickDelete={() => HandleDelete(item.id)}
                      // onClickEdit={() => handleEdit(item.id)}
                      onClickEdit={() => {
                          setShowEdit(true);
                          setId(item.id);
                          console.log(item);
                          setLoc({
                            name: item.name,
                            city: item.city,
                            address: item.address,
                            latitude: item.latitude,
                            longitude: item.longitude,
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

          <ClassLocation
            gmap=
            {
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={20}
                mapTypeId="roadmap"
                mapContainerClassName="card-body d-inline-block rounded mobile-100"
                onClick={handleClicked}>
                {markers.map((marker, id) => (
                  <Marker
                    key={id}
                    position={{
                      // lat: {markLat},

                      lat: marker.lat,
                      lng: marker.lng,
                    }}
                    // onClick={handleClickMarker}
                  />
                ))}
              </GoogleMap>
              }
          modaltitle={"Add Location"}
          show={show}
          handleClose={handleClose}
          cityValue={loc?.city}
          nameValue={loc?.name}
          longitudeValue={lng || loc?.longitude}
          latitudeValue={lat || loc?.latitude}
          addressValue={loc?.address}
          city={(e) => {
            setLoc((filledState) => ({
              ...filledState,
              city: e.target.value,
            }));
          }}
          name={(e) => {
            setLoc((filledState) => ({
              ...filledState,
              name: e.target.value,
            }));
          }}
          address={(e) => {
            setLoc((filledState) => ({
              ...filledState,
              address: e.target.value,
            }));
          }}
          longitude={(e) => {
            setLoc((filledState) => ({
              ...filledState,
              longitude: lat,
            }));
          }}
          latitude={(e) => {
            setLoc((filledState) => ({
              ...filledState,
              latitude: lng,
            }));
          }}
          onSubmitHandle={onSubmitHandle}
          />
          {/* edit loc */}
          <ClassLocation
            gmap=
            {
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={20}
                mapTypeId="roadmap"
                mapContainerClassName="card-body d-inline-block rounded mobile-100"
                onClick={handleClicked}>
                {markers.map((marker, id) => (
                  <Marker
                    key={id}
                    position={{
                      // lat: {markLat},

                      lat: marker.lat,
                      lng: marker.lng,
                    }}
                    // onClick={handleClickMarker}
                  />
                ))}
              </GoogleMap>
              }
          modaltitle={"Edit Location"}
          show={showEdit}
          handleClose={handleClose}
          cityValue={loc?.city}
          nameValue={loc?.name}
          longitudeValue={lng || loc?.longitude}
          latitudeValue={lat || loc?.latitude}
          addressValue={loc?.address}
          city={(e) => {
            setLoc((filledState) => ({
              ...filledState,
              city: e.target.value,
            }));
          }}
          name={(e) => {
            setLoc((filledState) => ({
              ...filledState,
              name: e.target.value,
            }));
          }}
          address={(e) => {
            setLoc((filledState) => ({
              ...filledState,
              address: e.target.value,
            }));
          }}
          longitude={(e) => {
            setLoc((filledState) => ({
              ...filledState,
              longitude: lat,
            }));
          }}
          latitude={(e) => {
            setLoc((filledState) => ({
              ...filledState,
              latitude: lng,
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
                  <Cover text={"Manage Offline Class"} list1={"Class Data"} list2={'Locations'} img={imgCover} />
              
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
                              <ButtonComponent
                                  className={
                                      "btn-class ms-lg-5 m-0 border-0 border rounded ms-2 ps-lg-2 p-0 ps-3 pe-3"
                                  }
                                  id={"addLocation"}
                                  onClick={() => {
                                  setShow(true);
                                  }}
                                  imgClassName={'ps-2'}
                                  imgUrlEnd={addSmall}
                                  buttonName={"Add Location"}
                              />
                          </div>
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
export default ManageLocation;
