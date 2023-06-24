import './Form.css'
import React from "react";
import {Modal} from 'react-bootstrap'
import TextField from "../../elements/TextField/TextField";
import brokenImage from '../../assets/icons/broken_image_gray.svg'
import Textarea from "../../elements/TextField/Textarea";
import AddLess from "../AddLess/AddLess";
import ButtonComponent from '../../elements/Buttons/ButtonComponent';

export default function Training({
    countText,
    show,
    title,
    handleClose,
    titleValue,
    imgFileChange,
    imgFileValue,
    introductionValue,
    introduction,
    workoutValue,
    durationValue,
    incrementDuration,
    incrementWorkout,
    decrementDuration,
    decrementWorkout,
    onSubmitHandle,
    uploadingImg,
}) {
    return(
        <>
        
        
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className=" rounded-5">

          <div className="col-12 "> 
                <div className=" mb-4 box" style={{borderRadius:'20px'}}>
                    <label  
                        style={{
                            borderRadius:'20px',
                            cursor:'pointer',
                            backgroundImage:`url(${brokenImage})`,
                            backgroundRepeat:'no-repeat',
                            height:'fit-content',
                            width:'100%',
                            backgroundPosition:'center'
                        }}>
                        <input 
                            accept='image/*'
                            type="file" 
                            onChange={imgFileChange}         
                            name="image"
                        />
                        <img 
                            // width={'100%'} 
                            src={imgFileValue} 
                            height={'200px'}
                            style={{width:'fit-content'}} 
                            
                        alt="" />
                    </label>
                </div>
                {
                    uploadingImg > 0 &&
                    <span>Uploading Image : {uploadingImg}%</span> 
                }
          </div>
          <div className="col-12 ">
                <TextField
                    classNameInput={'form-control  borderInput'}
                    placeholder={'Input title'}
                    type={'text'}
                    name={'title'}
                    id={'title'}
                    onChange={title}
                    value={titleValue}
                />
          </div>
            
            <div className="styleTextarea col-12 mt-4 m-0">
                <Textarea
                    classNameLabel={'fw-semibold mb-3'}
                    label={'Introduction'}
                    name={'introduction'}
                    id={'introduction'}
                    classNameTextarea={'form-control rounded-3 borderInput'}
                    maxLength={200}
                    value={introductionValue}
                    onChange={introduction}
                    count={`${countText} / 200 word`}
                />
            </div>

                
            <div className='col-12'>
                <p className="fw-semibold">Info</p>
                <div className="row">
                    <div className="col-7">
                        <p>How long will it take?</p>
                        <div className="d-flex flex-row">
                            <AddLess
                                decrement={decrementDuration}
                                increment={incrementDuration}
                                qty={durationValue}
                            />
                            <select className="form-select selectTextarea" aria-label="Default select example">
                            <option selected value={'Minutes'}>Minutes</option>
                            <option value="Hours">Hours</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-5">
                        <p>How much workouts?</p>
                        <AddLess
                            decrement={decrementWorkout}
                            increment={incrementWorkout}
                            qty={workoutValue}   
                        />
                    </div>
                </div>
                </div>
            <div/>
            
          <div className="col-12 text-center d-flex justify-content-end flex-row mt-4 mb-2">
            
                    <button 
                        className='btn-closebtn me-4' 
                        onClick={handleClose}
                    >
                        Close
                    </button>
            {imgFileValue !== null &&
            titleValue !== "" &&
            introductionValue !== "" &&
            workoutValue !== "" &&
            durationValue !== ""
            ? (
              <ButtonComponent
                type={"submit"}
                className={"btn btn-createbtn"}
                id={"submitTraining"}
                onClick={onSubmitHandle}
                buttonName={"Submit"}
              />
            ) : (
              <button
                id="disabledbutton"
                className="btn fw-semibold"
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
    )
}