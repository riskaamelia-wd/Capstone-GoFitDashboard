import "./Login.css";
import LoginImg from "../../assets/gif/Login.gif";
import google from "../../assets/icons/google.svg";

import TextField from "../../elements/TextField/TextField";
import { NavLink } from "react-router-dom";
import TextFieldPassword from "../../elements/TextField/TextFieldPassword";
import { useState } from "react";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <>
      <div className="overflow-hidden overflow-x-hidden">
        <div className="row">
          <div className="col-6 d-none d-md-block">
            <img
              src={LoginImg}
              alt=""
              style={{ height: "100vh", width: "55vw" }}
            />
          </div>
          <div className=" col-md-6 LoginRightSide rounded-5 d-flex justify-content-center align-items-center ">
            <div className=" w-75 ">
              <p className=" mt-5 fw-bold fs-1 h1-rightside">Welcome!</p>
              <p className=" mt-3 fw-semibold fs-5 mb-4">Log in you account</p>
              <TextField
                label={`Your Email`}
                type={"text"}
                name={"email"}
                id={"email"}
                onChange={() => {}}
                // value={}
                placeholder={"userName@gmail.com"}
                classNameLabel={"mb-2 text-secondary"}
              />

              <div className="mt-4">
                <TextFieldPassword
                  placeholder={"******"}
                  label="Password"
                  id={"password"}
                  name={"password"}
                  // value={}
                  onChange={() => {}}
                  classNameLabel={"mb-2 text-secondary"}
                />
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberme"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label
                      className="form-check-label fw-semibold"
                      htmlFor="exampleCheck1">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="col-6 text-end">
                  {/* <NavLink to={""}> */}
                  <p className="ForgotPasswordText">Forgot Password?</p>
                  {/* </NavLink> */}
                </div>
              </div>

              <ButtonComponent
                type={"submit"}
                className={"btn-login fs-5"}
                id={"login"}
                onClick={() => {
                  console.log("logging in");
                }}
                buttonName={"Log in"}
              />
              <div className="LineTextMiddle mt-5 mb-5">
                <span className="fs-5">or</span>
              </div>

              <ButtonComponent
                type={"button"}
                className={"btnGoogle p-2"}
                id={"googlelogin"}
                onClick={() => {
                  console.log("login with google");
                }}
                imgUrlStart={google}
                buttonName={
                  <span className="fs-5 ms-3 fw-semibold">
                    Continue with Google
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
