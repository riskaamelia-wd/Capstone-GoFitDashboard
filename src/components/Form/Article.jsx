import React from "react";
import { Modal } from "react-bootstrap";
import brokenImage1 from '../../assets/icons/broken_image_gray.svg'
import TextField from "../../elements/TextField/TextField";
import Textarea from "../../elements/TextField/Textarea";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";

export default function Article({
    countText,
    show,
    title,
    handleClose,
    titleValue,
    imgFileChange,
    imgFileValue,
    introductionValue,
    introduction,
    onSubmitHandle,
    uploadingImg

}) {
    return(
        <>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className="rounded-5">

                <div className="col-12">
                    <p>New Parts</p>
                    <div className="mb-4 box" style={{borderRadius:'20px'}}>
                        <label style={{
                            borderRadius:'20px',
                            cursor:'pointer',
                            backgroundImage:`url(${brokenImage1})`,
                            backgroundRepeat:'no-repeat',
                            height:'fit-content',
                            width:'100%',
                            backgroundPosition:'center'
                        }}>
                            <input
                            accept='image/*'
                            type="file"
                            onChange={imgFileChange}
                            name="image"/>
                            <img src={imgFileValue}
                            height={'200px'}
                            style={{width:'fit-content'}}
                            alt=""/>

                        </label>
                    </div>
                    {
                        uploadingImg > 0 &&
                        <span>Uploading Image : {uploadingImg}%</span>
                    }
                </div>

                <div className="col-12">
                    <TextField
                    classNameInput={'form-control borderInput'}
                    placeholder={'Input Title'}
                    type={'text'}
                    name={'title'}
                    id={'title'}
                    onChange={title}
                    value={titleValue}
                    />
                </div>

                <div className="styleTextarea col-12 mt-4 m-0" >
                    <Textarea
                     classNameLabel={'fw-semibold mb-3'}
                     label={'Introduction'}
                     name={'introduction'}
                     id={'introduction'}
                     classNameTextarea={'form-control rounded-3 bprderInput'}
                     maxLength={200}
                     value={introductionValue}
                     onChange={introduction}
                     count={`${countText} / 200 word`}
                    />
                </div>

                <div className="col-12 text-center d-flex justify-content-center flex-row mt-4 mb-2">

                    <button
                    className="btn-closebtn me-4"
                    onClick={handleClose}
                    > Close
                    </button>
                    {
                        imgFileValue !== null &&
                        titleValue!== "" &&
                        introductionValue !== "" 
                        ? (
                            <ButtonComponent
                            type={"submit"}
                            className={"btn btn-createbtn"}
                            id={"submitArticle"}
                            onClick={onSubmitHandle}
                            buttonName={"Submit"}
                            />
                        ) : (
                            <button
                            id="disabledbutton"
                            className="btn fw-semibold"
                            style={{backgroundColor: "#DFDFDF"}}
                            disabled
                            >
                                Submit
                            </button>
                        )
                    }

                </div>




            </Modal.Body>


        </Modal>
        
        
        </>
    )
}
