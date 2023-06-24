import React from "react";
import video from '../../assets/icons/videocam_gray.svg'
import {Modal} from 'react-bootstrap'
import TextField from "../../elements/TextField/TextField";
import Textarea from "../../elements/TextField/Textarea";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";

export default function VideoTraining({
    show,
    title,
    handleClose,
    titleValue,
    videoChange,
    videoValue,
    description,
    descriptionValue,
    onSubmitHandle,
    uploadingVideo,
}) {

    return(
        <>
        
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className=" rounded-5">

          <div className="col-12 ">    
            <div className="mt-2 con mb-4 box">
                <label  
                    style={{
                        cursor:'pointer',
                    }}>
                        <div 
                            style={{marginBottom:'-10px'}}
                        >
                            <img 
                                src={video} 
                                alt="" 
                            />
                            <p 
                                className="mt-3" 
                                style={{
                                    color:'var(--Neutral-White-800)'
                                }}
                            >
                                {'Input Video'}
                            </p>
                        </div>
                    <input 
                        type="file" 
                        accept="video/*"
                        onChange={videoChange} 
                        style={{
                            width:'100%', 
                            display:'none'
                        }} 
                        name={'video'}
                        id={'video'}
                    />
                    {
                        videoValue?.length > 0 && 
                    <video 
                        className='bg-black bg'
                        src={videoValue}  
                        height={'190px'} 
                        controls
                        style={{width:'fit-content'}}
                    >
                    </video>
                    }
                </label>
            </div>
            {
                uploadingVideo > 0 &&
                <span>Uploading Video : {uploadingVideo}%</span> 
            }
          </div>
          <div className="col-12 ">
                <TextField
                    classNameInput={'form-control borderInput'}
                    placeholder={'Arm Circles'}
                    type={'text'}
                    name={'title'}
                    id={'title'}
                    onChange={title}
                    value={titleValue}
                />
          </div>
            <div  className="styleTextarea col-12">
                    
                <Textarea
                    name={'description'}
                    placeholder={'Detail Workout'}
                    id={'description'}
                    maxLength={200}
                    value={descriptionValue}
                    onChange={description}
                    classNameTextarea={'form-control rounded-3 borderInput'}
                />  
            </div>   
            <div/>
            
          <div className="col-12 text-center mt-4 mb-2 d-flex flex-row justify-content-end">
            
                    <button 
                        className='btn-closebtn me-4' 
                        onClick={handleClose}
                    >
                        Close
                    </button>
            {videoValue !== null &&
            titleValue !== "" &&
            descriptionValue !== ""
            ? (
              <ButtonComponent
                type={"submit"}
                className={"btn btn-createbtn"}
                id={"submitVideoTraining"}
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

