/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import TextField from "../../elements/TextField/TextField";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
const ModalMembership = ({
  show,
  handleClose,
  title,
  titleValue,
  duration,
  durationValue,
  price,
  priceValue,
  description,
  descriptionValue,

  onSubmitHandle,
  modaltitle,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="modal-membership rounded-5">
          <div className="col-4">
            <p className="fs-4 modal-title fw-semibold">{modaltitle}</p>
          </div>
          <div className="col-12">
            <TextField
              label={"Title"}
              type={"text"}
              name={"titlemembership"}
              id={"titlemembership"}
              onChange={title}
              value={titleValue}
              placeholder={"Give the plan a name"}
              classNameLabel={" modal-input fs-4 mb-2 mt-2"}
              // defaultValue={title}
            />
          </div>

          <div className="col-12 ">
            <TextField
              label={"Duration"}
              type={"text"}
              name={"durationmembership"}
              id={"durationmembership"}
              onChange={duration}
              value={durationValue}
              // defaultValue={duration}
              placeholder={"How many month?"}
              classNameLabel={" modal-input fs-4 mb-2 mt-2"}
            />
          </div>
          <div className="col-12 ">
            <TextField
              label={
                <>
                  <div>
                    Price <span className="text-danger">* </span>
                  </div>
                </>
              }
              type={"number"}
              name={"pricemembership"}
              id={"pricemembership"}
              onChange={price}
              value={priceValue}
              placeholder={"Input the price!"}
              classNameLabel={" modal-input fs-4 mb-2 mt-2"}
              // defaultValue={price}
            />
            <small>
              <span className="text-danger">*</span>please use dots(.) instead
              of comma (,)
            </small>
          </div>
          <div className="col-12 ">
            <TextField
              label={"Description"}
              type={"text"}
              name={"descriptionmembership"}
              id={"descriptionmembership"}
              onChange={description}
              value={descriptionValue}
              placeholder={"What's the benefits?"}
              classNameLabel={" modal-input fs-4 mb-2 mt-2"}
              // defaultValue={description}
            />
          </div>

          <div className="col-12 mt-4">
            {titleValue !== "" &&
            priceValue !== 0 &&
            durationValue !== "" &&
            descriptionValue !== "" ? (
              <ButtonComponent
                type={"submit"}
                className={"btn-add fs-5"}
                id={"submitEmail"}
                onClick={onSubmitHandle}
                buttonName={"Submit"}
              />
            ) : (
              //   <ButtonComponent
              //     // type={"submit"}
              //     className={"btn-disabled fs-5 w-100"}
              //     id={"login"}
              //     onClick={() => {}}
              //     buttonName={"Submit"}
              //   />
              <button
                id="disabledbutton"
                className="btn w-100 fw-semibold fs-5"
                style={{ backgroundColor: "#DFDFDF" }}
                disabled>
                Submit
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalMembership;
