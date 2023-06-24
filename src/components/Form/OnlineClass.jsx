/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import TextField from "../../elements/TextField/TextField";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import add from '../../assets/icons/add.svg'
import DatePicker from "react-datepicker";
import Textarea from '../../elements/TextField/Textarea'
const OnlineClass = ({
  show,
  handleClose,
  name,
  nameValue,
  linkClass,
  linkClassValue,
  startDate,
  startDateValue,
  imageFile,
  imageFileValue,
  description,
  descriptionValue,
  onSubmitHandle,
  modaltitle,
  disabled
}) => {
  return (
    <>
        <Modal show={show} onHide={handleClose} centered>
        
        <Modal.Header closeButton>
            <Modal.Title className="fs-3  label-title">{modaltitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" rounded-5">
          <div className="col-12">
            <label 
                className='label-color'
                htmlFor="imageFile">Upload Photo</label>
                <label
                        disabled={disabled}
                    className="d-flex textfield-bg borderInput form-control justify-content-between flex-row"
                >                  
                    <input 
                        disabled={disabled}
                        style={{width:'100%', display:'none'}}
                        name={'imageFile'}
                        id={'imageFile'}
                        type='file'
                        onChange={imageFile}
                    />
                    {imageFileValue ? imageFileValue : 'Choose File'}
                    <div style={{width:'12px'}}>
                        <img src={add} style={{width:'100%'}} alt="" />
                    </div>
                </label>
                {disabled && <small className="text-danger">You can add photo after submit this data</small>}
          </div>

          <div className="col-12 ">
                <TextField
                    classNameLabel={'mt-2 label-color'}
                    classNameInput={'form-control textfield-bg  borderInput'}
                    label={'Name'}
                    placeholder={'Yoga Class'}
                    type={'text'}
                    name={'name'}
                    id={'name'}
                    onChange={name}
                    value={nameValue}
                />
          </div>
          <div className="col-12 ">
                <TextField
                    classNameLabel={'mt-2 label-color'}
                    classNameInput={'form-control textfield-bg  borderInput'}
                    label={'Via Zoom'}
                    placeholder={'sPQ-pji-NiV'}
                    type={'text'}
                    name={'linkClass'}
                    id={'linkClass'}
                    onChange={linkClass}
                    value={linkClassValue}
                />
          </div>
            <div className="border-2 col-12" style={{width:'100%'}}>
                <label 
                    htmlFor="started_at"
                    className="mt-2 label-color col-12"
                    >Started at</label>
                <DatePicker
                    placeholderText="Click to select a date"
                    className="form-control textfield-bg  borderInput datePickerOffline"
                    selected={startDate}
                    onChange={startDateValue}
                    // onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM do yyyy, h:mm aa"
                    showTimeInput
                />
            </div>
            <div  className="styleTextarea col-12">
                    <Textarea
                        classNameLabel={'mt-2   label-color'}
                        name={'description'}
                        id={'description'}
                        onChange={description}
                        value={descriptionValue}
                        placeholder={'Maximum 1.000.000 Words'}
                        label={'Class Description'}
                        classNameTextarea={'form-control textfield-bg  borderInput textarea'}
                    />   
                </div>   
            <div/>

          <div className="col-12 text-center mt-4 mb-2">
            {nameValue !== "" &&
            linkClassValue !== "" &&
            descriptionValue !== ""
            &&
            imageFileValue !== null
            ? (
              <ButtonComponent
                type={"submit"}
                className={"btn col-12 btn-save"}
                id={"submitEmail"}
                onClick={onSubmitHandle}
                buttonName={"Submit"}
              />
            ) : (
              <button
                id="disabledbutton"
                className="btn w-100 col-12 fw-semibold fs-5"
                style={{ backgroundColor: "#DFDFDF" }}
                disabled
                    >
                Submit
              </button>
            )}
          </div>
        </Modal.Body>
        </Modal>
    </>
  );
};
export default OnlineClass;