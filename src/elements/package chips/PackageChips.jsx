import { useState } from "react";
import "./PackageChips.css";
const PackageChips = ({ price, id, time }) => {
  const [packageChipsIsActive, setPackageChipsIsActive] = useState(false);
  return (
    <>
      <button
        type="button"
        className={
          packageChipsIsActive
            ? "btn ChipActive  rounded-5"
            : "btn Chip  rounded-5"
        }
        id={id}
        onClick={() => {
          setPackageChipsIsActive(!packageChipsIsActive);
        }}>
        <div className="fw-semibold lh-1">
          IDR {price} <br />/ {time}
        </div>
      </button>
    </>
  );
};
export default PackageChips;

// how to use

/*
<PackageChips 
price={"50000"}
time={"month"}
id={"monthly"}
/>
*/
