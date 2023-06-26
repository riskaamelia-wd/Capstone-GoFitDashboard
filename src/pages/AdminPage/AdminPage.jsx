import React from "react";
import { useSelector } from "react-redux";
const AdminPage = () => {
  const users = useSelector((state) => state.users.data_user);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 mb-3 d-flex justify-content-center">
            <img
              src={`http://18.141.56.154:8000/${users.profile_picture}`}
              alt=""
            />
          </div>
          <div className="col-12 mb-1">
            <div className="row">
              <div className="col-1">Name:</div>
              <div className="col-3">{users.name}</div>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="row">
              <div className="col-1">Email:</div>
              <div className="col-3">{users.email}</div>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="row">
              <div className="col-1">Gender:</div>
              <div className="col-3">{users.gender}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
