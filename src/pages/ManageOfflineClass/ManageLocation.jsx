import { useCallback, useEffect, useState } from "react";
import Cover from "../../elements/Card/Cover";
import DetailProduct from "../../components/DetailProduct.jsx/DetailProduct";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import { Row, Col } from "react-bootstrap";
import addSmall from "../../assets/icons/add_small.svg";
import { useSelector } from "react-redux";
import ClassLocation from "../../components/Form/ClassLocation";
import { adminApi } from "../../api/Api";

// import { GoogleMap, Marker } from "@react-google-maps/api";
import Loading from "../../components/Loading";
import useAxios from "../../api/useAxios";

const ManageLocation = () => {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.tokenAuth.token_jwt);

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

  const [loc, setLoc] = useState({
    name: "",
    city: "",
    address: "",
    latitude: lat,
    longitude: lng,
  });

  const { response, isLoading, error, fetchData } = useAxios({
    api: adminApi,
    method: "get",
    url: `/locations`,
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
      .get("/locations")
      .then(async (res) => {
        const resData = res.data;
        console.log(resData);
        setData(resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (response !== null) {
      setData(response.data);
    }
    {
      console.log(error);
    }
  }, [error, getData, response]);

  const handleDelete = async (id) => {
    await adminApi.delete(`/admin/locations/${id}`, config).then(() => {
      fetchData();
      alert("Data deleted successfully");
    });
  };

  const handleEdit = async (id) => {
    await adminApi.get(`/locations/${id}`, config).then(async (res) => {
      await fetchData();
      setLoc(res?.data?.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finder = data.find((item) => item.id === loc.id);
    console.log(finder, " fid");
    const body = {
      name: loc.name,
      city: loc.city,
      address: loc.address,
      latitude: lat,
      longitude: lng,
    };
    if (window.confirm("Are you sure you want to submit?")) {
      if (finder) {
        await adminApi
          .put(`/admin/locations/${loc.id}`, body, config)
          .then((res) => {
            alert("data edited successfully");
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await adminApi
          .post("/admin/locations", body, config)
          .then((res) => {
            alert("data added successfully");
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <>
      <div>
        <Cover
          text={"Manage Offline Class"}
          list1={"Class Data"}
          list2={"Location"}
          img={imgCover}
        />
        <Row>
          <Col
            md={12}
            className="mt-4 mb-2 d-flex flex-row justify-content-between">
            <p
              style={{
                color: "var(--Neutral-Black-100)",
                fontSize: "28px",
                fontWeight: "700",
              }}
              className="p-0 m-0">
              Location
            </p>
            <div className="d-flex flex-row mb-3">
              <ClassLocation
                gmap={
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
                btnModalImg={addSmall}
                btnModalText={"Add Location"}
                className={"btn-google m-0 border-0 border rounded ms-2"}
                cityValue={loc?.city}
                nameValue={loc?.name}
                longitudeValue={loc?.longitude || lat}
                latitudeValue={loc?.latitude || lng}
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
                onSubmit={handleSubmit}
                // onClickedMap={handleClicked}
                markLat={(item) => markers[0].lat}
                markLng={(item) => markers[0].lng}
              />
            </div>
          </Col>
          <Col>
            {isLoading ? (
              <Loading />
            ) : data?.length > 0 ? (
              data?.map((item, id) => {
                return (
                  <div className="mb-3" key={id}>
                    <DetailProduct
                      key={id}
                      text={item.name}
                      date={`${item.address}, ${item.city}`}
                      category={`latitude : ${item.latitude}, longitude : ${item.longitude}`}
                      onClickDelete={() => handleDelete(item.id)}
                      onClickUpdate={() => handleEdit(item.id)}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-center mt-5">No data available</p>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ManageLocation;
