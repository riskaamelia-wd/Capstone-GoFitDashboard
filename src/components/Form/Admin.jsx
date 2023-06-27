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
  handleSubmit,
  handleInput,
  deleteImg,
  nameValue,
  emailValue,
  passwordValue,
  confirmPasswordValue,
  handleClose,
  prevImg

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
  const roleList = [
    { value: "----", text: "Choose Your Role" },
    { value: "Admin", text: "Admin" },
    { value: "Super Admin", text: "Super Admin" },
  ];

  const [regex, setRegex] = useState({
    // name :/^[A-Za-z\s]+$/,
    email : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password:/^(?=.*[0-9]*)(?=.[a-zA-Z])[a-zA-Z0-9]{8,}$/
})


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
                  </div>
                  <div>
                    <TextField
                      placeholder={"Input your name"}
                      label={"Name"}
                      name={"name"}
                      id={"name"}
                      type={"text"}
                      onChange={handleInput}
                      value={nameValue}
                      classNameLabel={"mt-2   text-secondary"}
                    />
                    <Row>
                      <Col>
                        <TextField
                          placeholder={"anonimous@gmail.com"}
                          label={"Email"}
                          name={"email"}
                          id={"email"}
                          type={"email"}
                          onChange={handleInput}
                          value={emailValue}
                          classNameLabel={"mt-2 text-secondary"}
                        />
                         {emailValue && (!regex.email.test(emailValue)) ? (
                            <small className="text-danger">Invalid email address</small>
                            ) : (
                            <></>
                        )}
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
                          value={passwordValue}
                          classNameLabel={"mt-2 text-secondary"}
                        />
                        {passwordValue && (!regex.password.test(passwordValue) ) ? (
                            <small className="text-danger">a password must be eight characters and alphanumeric</small>
                            ) : (
                            <></>
                        )}
                      </Col>
                      <Col>
                        <TextField
                          placeholder={"8karakter"}
                          label={"Confrim Password"}
                          name={"confirmPassword"}
                          id={"confirmPassword"}
                          type={"password"}
                          onChange={handleInput}
                          value={confirmPasswordValue}
                          classNameLabel={"mt-2   text-secondary"}
                        />
                        {confirmPasswordValue &&
                        passwordValue !== confirmPasswordValue ? (
                          <small className=" text-danger">
                            New password and confirm password does not match
                          </small>
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                        disabled={
                            (!passwordValue || !regex.password.test(passwordValue)) ||
                            (confirmPasswordValue && (passwordValue !== confirmPasswordValue))
                             ||
                             (!emailValue || !regex.email.test(emailValue)) 
                        }
                      data-bs-dismiss="modal"
                      type="submit"
                      className=" btn btn-save mt-4 me-4 pe-4 ps-4"
                    >
                      save
                    </button>
                    <button
                        onClick={handleClose}
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
