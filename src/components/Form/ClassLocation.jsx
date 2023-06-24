import TextField from "../../elements/TextField/TextField"
import './Form.css'
import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Modal } from "react-bootstrap";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";



const ClassLocation = ({
    city,
    cityValue,
    name,
    nameValue,
    longitude,
    longitudeValue,
    latitude,
    latitudeValue,
    address,
    addressValue,
    gmap,
    show,
    handleClose,
    onSubmitHandle,
    modaltitle,
}) => {

    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBcj2ip9AhD5Q6MhtVMFREpApc6hBTmN9Y",
    });

    return(
        <>
            <Modal show={show} onHide={handleClose} centered>
            
            <Modal.Header closeButton>
                <Modal.Title className="fs-3  label-title">{modaltitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className=" rounded-5">
                <div>
                    {isLoaded ? (
                        <div className="row">
                            <div className="col-7 ">
                                {gmap}
                            </div>
                        </div>
                    ) : (
                        <p>loading data</p>
                    )}
                </div>
                <div className="col-12">
                    <TextField
                        label={'Name'}
                        classNameLabel={'mt-2 label-color'}
                        classNameInput={'form-control textfield-bg  borderInput'}
                        placeholder={'GoFit Jakarta'}
                        type={'text'}
                        name={'name'}
                        id={'name'}
                        onChange={name}
                        value={nameValue}
                    />
                </div>

                <div className="col-12 ">
                    <TextField
                        label={'City'}
                        classNameLabel={'mt-2 label-color'}
                        classNameInput={'form-control textfield-bg  borderInput'}
                        placeholder={'Jakarta'}
                        type={'text'}
                        name={'city'}
                        id={'city'}
                        onChange={city}
                        value={cityValue}
                    />
                </div>
                <div className="col-12 ">
                    <TextField
                        label={'Address'}
                        classNameLabel={'mt-2 label-color'}
                        classNameInput={'form-control textfield-bg  borderInput'}
                        placeholder={'Jl. Otista No.251 Jakarta Timur'}
                        type={'text'}
                        name={'address'}
                        id={'address'}
                        onChange={address}
                        value={addressValue}
                    />
                </div>
                <div className="col-12">
                    <TextField
                        label={'Latitude'}
                        classNameLabel={'mt-2 label-color'}
                        classNameInput={'form-control textfield-bg  borderInput'}
                        placeholder={'7125471291281241'}
                        type={'text'}
                        name={'latitude'}
                        id={'latitude'}
                        onChange={latitude}
                        value={latitudeValue}
                        // value={lat || data?.latitude}
                    /> 
                </div>
                <div  className="col-12">
                    <TextField
                        label={'Longitude'}
                        classNameLabel={'mt-2 label-color'}
                        classNameInput={'form-control textfield-bg  borderInput'}
                        placeholder={'123486210381237'}
                        type={'text'}
                        name={'longitude'}
                        id={'longitude'}
                        onChange={longitude}
                        value={longitudeValue}
                    />
                    </div>   
                <div/>

            <div className="col-12 text-center mt-4 mb-2">
                {nameValue !== "" &&
                cityValue !== "" &&
                addressValue !== "" &&
                latitudeValue !== ''  &&
                longitudeValue !== ''
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
                    disabled>
                    Submit
                </button>
                )}
            </div>
            </Modal.Body>
            </Modal>
        </>
    )
}

export default ClassLocation

