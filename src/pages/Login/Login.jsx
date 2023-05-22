import "./Login.css";
import LoginImg from "../../assets/gif/Login.gif";
import visibility from "../../assets/icons/visibility.svg";
import visibility_off from "../../assets/icons/visibility_off.svg";
import TextField from "../../elements/TextField/TextField";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import TextFieldPassword from "../../elements/TextField/TextFieldPassword";
const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <>
      <div className="">
        <div className="row">
          <div className="col-6">
            <img
              src={LoginImg}
              alt=""
              style={{ height: "100vh", width: "55vw" }}
            />
          </div>
          <div className="col-6 LoginRightSide rounded-5">
            <div className="ms-5 justify-content-center align-items-center  mt-5 w-75">
              <p className=" mt-5 fw-bold fs-1">Welcome!</p>
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
              {/* <div className="row mt-3">
                <div className="col-12">
                  <label htmlFor="password" className="text-secondary">
                    Password
                  </label>
                </div>
                <div className="col-12">
                  <div className="input-group mt-3">
                    <input
                      type={showPassword ? "password" : "text"}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="******"
                      defaultValue=""
                    />
                    <button
                      className="input-group-text"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}>
                      <img
                        src={showPassword ? visibility_off : visibility}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div> */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
