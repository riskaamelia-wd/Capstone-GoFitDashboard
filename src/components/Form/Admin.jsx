/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import TextField from "../../elements/TextField/TextField";
import "./Form.css";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const Admin = ({
  onClick,
  classNameImg,
  style,
  className,
  btnModalText,
  btnModalImg,
  fetchStatus,
}) => {
  const token = useSelector((state) => state.tokenAuth.token_jwt);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [uploadingImage, setUploadingImage] = useState(0);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    imgFile: "",
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [prevImg, setPrevImg] = useState("https://placeholder.com/40x40");

  const roleList = [
    { value: "----", text: "Choose Your Role" },
    { value: "Admin", text: "Admin" },
    { value: "Super Admin", text: "Super Admin" },
  ];

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgFile" && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      setPrevImg(imageUrl);
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex = /^.{8,}$/;

  const validateField = (fieldName) => {
    let errorMessage = "";

    if (fieldName === "email") {
      if (!data.email || !emailRegex.test(data.email)) {
        errorMessage = "Invalid email address";
      }
    } else if (fieldName === "password") {
      if (!data.password || !passwordRegex.test(data.password)) {
        errorMessage = "Password must be at least 8 characters long";
      }
    }

    setError((prevError) => ({
      ...prevError,
      [fieldName]: errorMessage,
    }));
  };

  const deleteImg = () => {
    setPrevImg("https://placeholder.com/40x40");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!data.email || !emailRegex.test(data.email)) {
      validationErrors.email = "Invalid email address";
    }

    if (!data.password || !passwordRegex.test(data.password)) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(`http://18.141.56.154:8000/register`, {
          name: data.name,
          email: data.email,
          password: data.password,
          gender: "pria",
          height: 168,
          weight: 60,
          training_level: "beginner",
        })
        .then((response) => {
          postProfilePicture(response.data.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const postProfilePicture = (id) => {
    const formData = new FormData();
    formData.append("file", data.imgFile);

    axios
      .post(`http://18.141.56.154:8000/users/profile/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Profile picture uploaded successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    fetchStatus(true);
    alert("User created");
    setData({
      imgFile: "",
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    });
    setPrevImg("https://placeholder.com/40x40");
  };

  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={
          className ? className : "btn btn-save btn-add pe-4 ps-4 ms-3 fs-6"
        }
        width="fit-content"
        style={style}
        data-bs-toggle="modal"
        data-bs-target="#admin"
      >
        {btnModalText}
        <img
          src={btnModalImg}
          className={classNameImg ? classNameImg : "ms-4"}
          alt=""
        />
      </button>
      <div
        className="modal fade"
        id="admin"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div style={{ width: "fit-content" }} className="modal-content">
            <div className="modal-body">
              <p className="fs-3 fw-semibold">Add Admin</p>

              <form onSubmit={handleSubmit}>
                <div className="shadow p-3" style={{ width: "606px" }}>
                  <div className="row">
                    <div className="col-12 text-center">
                      Change your profile picture from here
                    </div>
                    <div className="col-12 d-flex flex-row justify-content-center">
                      <div
                        className="me-4"
                        style={{ width: "83px", height: "83px" }}
                      >
                        <img
                          style={{ width: "100%" }}
                          className="rounded-pill"
                          src={prevImg}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="d-flex mt-2 flex-row">
                          <label className="btn-save btn ps-3 me-3 pe-3 p-1 rounded pt-2">
                            <input
                              accept="image/*"
                              type="file"
                              onChange={handleInput}
                              id="imgFile"
                              name="imgFile"
                            />
                            Upload
                          </label>
                          <ButtonComponent
                            className={"btn-cancel"}
                            id={"submitEmail"}
                            buttonName={"Cancel"}
                            onClick={deleteImg}
                          />
                        </div>
                        <p
                          style={{ fontSize: "10px" }}
                          className="text-secondary mt-2"
                        >
                          Allowed JPG, GIF or PNG. Max size of 800K
                        </p>
                      </div>
                    </div>
                    {uploadingImage > 0 && (
                      <span>Uploading Image : {uploadingImage}%</span>
                    )}
                  </div>
                  <div>
                    <TextField
                      placeholder={"Input your name"}
                      label={"Name"}
                      name={"name"}
                      id={"name"}
                      type={"text"}
                      onChange={handleInput}
                      value={data.name}
                      classNameLabel={"mt-2   text-secondary"}
                    />
                    <small className="text-danger text-center">
                      {error.name}
                    </small>
                    <Row>
                      <Col>
                        <TextField
                          placeholder={"anonimous@gmail.com"}
                          label={"Email"}
                          name={"email"}
                          id={"email"}
                          type={"email"}
                          onChange={handleInput}
                          value={data.email}
                          onBlur={() => validateField("email")}
                          classNameLabel={"mt-2 text-secondary"}
                        />
                        {
                          <small className="text-danger text-center">
                            {error.email}
                          </small>
                        }
                      </Col>
                      <Col>
                        <label className="mt-2   text-secondary" htmlFor="role">
                          Select Role
                        </label>
                        <select
                          id={"role"}
                          className={
                            "text-secondary form-control borderInput col-12"
                          }
                          name={"role"}
                          onChange={handleInput}
                        >
                          {roleList?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.text}
                            </option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <TextField
                          placeholder={"8karakter"}
                          label={"Password"}
                          name={"password"}
                          id={"password"}
                          type={"password"}
                          onChange={handleInput}
                          value={data.password}
                          onBlur={() => validateField("password")}
                          classNameLabel={"mt-2 text-secondary"}
                        />
                        {
                          <small className="text-danger text-center">
                            {error.password}
                          </small>
                        }
                      </Col>
                      <Col>
                        <TextField
                          placeholder={"8karakter"}
                          label={"Confrim Password"}
                          name={"confirmPassword"}
                          id={"confirmPassword"}
                          type={"password"}
                          onChange={handleInput}
                          value={data.confirmPassword}
                          classNameLabel={"mt-2   text-secondary"}
                        />
                        {data.confirmPassword &&
                        data.password !== data.confirmPassword ? (
                          <span className=" text-danger">
                            New password and confirm password does not match
                          </span>
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      data-bs-dismiss="modal"
                      type="submit"
                      className=" btn btn-save mt-4 me-4 pe-4 ps-4"
                    >
                      save
                    </button>
                    <button
                      data-bs-dismiss="modal"
                      type="button"
                      className=" btn btn-cancel mt-4 ps-4 pe-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
