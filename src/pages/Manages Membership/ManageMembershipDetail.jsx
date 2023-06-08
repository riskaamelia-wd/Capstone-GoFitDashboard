import { useNavigate, useParams } from "react-router-dom";
import Cover from "../../elements/Card/Cover";
import member1 from "../../assets/icons/Members 1.svg";
import test from "../../assets/gif/banana.gif";
import "./ManageMembership.css";
import TagMonthYear from "../../elements/Tag/TagMonthYear";
import TagStatus from "../../elements/Tag/TagStatus";
import { useEffect, useState } from "react";
import useAxios from "../../customhooks/useAxios";
import { membershipApi } from "../../api/Api";
import moment from "moment";
import { Puff } from "react-loader-spinner";
const ManageMembershipDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-5">
        <div className="mb-5">
          <Cover
            list2={"Contact Details"}
            // list3={"list3"}
            text={"Membership"}
            list1={
              <>
                <button
                  className="back-button"
                  onClick={() => {
                    navigate(-1);
                  }}>
                  Home
                </button>
              </>
            }
            img={member1}
          />
        </div>
        <p>manage membership detail</p>
      </div>
    </>
  );
};
export default ManageMembershipDetail;
