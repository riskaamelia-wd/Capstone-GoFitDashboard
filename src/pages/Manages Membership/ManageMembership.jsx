/* eslint-disable react/prop-types */
import Cover from "../../elements/Card/Cover";
import member1 from "../../assets/icons/Members 1.svg";
import "./ManageMembership.css";
const ManageMembership = () => {
  // benerin pake timeout

  const generalView = () => {
    return <></>;
  };
  return (
    <>
      {/* {console.log(filteredDate)} */}
      <div className="container mt-5">
        <div className="mb-5">
          <Cover
            // list2={"list2"}
            // list3={"list3"}
            text={"Membership"}
            list1={"Home"}
            img={member1}
          />
        </div>

        <p>manage membership</p>
      </div>
    </>
  );
};
export default ManageMembership;
