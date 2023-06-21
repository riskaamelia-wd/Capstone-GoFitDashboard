import TextField from "../../elements/TextField/TextField"
import './Form.css'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";



const ClassLocation = ({
    onClick,
    classNameImg,
    style, 
    className, 
    btnModalText, 
    btnModalImg,
    city,
    cityValue,
    name,
    nameValue,
    longitude,
    longitudeValue,
    latitude,
    latitudeValue,
    onSubmit,
    address,
    addressValue,
    gmap
}) => {

    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBcj2ip9AhD5Q6MhtVMFREpApc6hBTmN9Y",
    });

    const navigate = useNavigate()

    
    return(
        <>
            <button 
                onClick={onClick}
                type="button" 
                className={className? className : "btn btn-save btn-add pe-4 ps-4 ms-3 fs-6" }
                width='fit-content'
                style={style}  
                data-bs-toggle="modal" 
                data-bs-target="#onlineClass"
            >
                {btnModalText}
                <img src={btnModalImg} 
                className={classNameImg?classNameImg:"ms-4"} 
                alt="" />

            </button>
            <div 
                className="modal fade" 
                id="onlineClass" 
                tabIndex="-1" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true"
            >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header mb-0">
                    <h1 className="modal-title fs-3  label-title" id="exampleModalLabel">Location</h1>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={()=> navigate('/offlineClass/location', {replace:true})}
                        data-bs-dismiss="modal" 
                        aria-label="Close"></button>
                </div>
                <div className="modal-body mt-3">
                {isLoaded ? (
                    <div className="row mb-2">
                    <div className="col-7 ">
                        {gmap}
                    </div>
                    </div>
                ) : (
                    <p>loading data</p>
                )}
                <form onSubmit={onSubmit}>
                    <TextField
                        label={'Name'}
                        classNameInput={'mb-2'}
                        placeholder={'GoFit Jakarta'}
                        type={'text'}
                        name={'name'}
                        id={'name'}
                        onChange={name}
                        value={nameValue}
                    />
                    <TextField
                        label={'City'}
                        classNameInput={'mb-2'}
                        placeholder={'Jakarta'}
                        type={'text'}
                        name={'city'}
                        id={'city'}
                        onChange={city}
                        value={cityValue}
                    />
                    <TextField
                        label={'Address'}
                        classNameInput={'mb-2'}
                        placeholder={'Jl. Otista No.251 Jakarta Timur'}
                        type={'text'}
                        name={'address'}
                        id={'address'}
                        onChange={address}
                        value={addressValue}
                    />
                    <TextField
                        label={'Latitude'}
                        classNameInput={'mb-2'}
                        placeholder={'7125471291281241'}
                        type={'text'}
                        name={'latitude'}
                        id={'latitude'}
                        onChange={latitude}
                        value={latitudeValue}
                        // value={lat || data?.latitude}
                    />
                    <TextField
                        label={'Longitude'}
                        classNameInput={'mb-2'}
                        placeholder={'123486210381237'}
                        type={'text'}
                        name={'longitude'}
                        id={'longitude'}
                        onChange={longitude}
                        value={longitudeValue}
                        // value={lng || data?.longitude}
                    />
                    <div className="text-center mt-4 mb-2">
                        <button
                            data-bs-dismiss="modal"
                            type="submit"
                            className="btn btn-save col-12"
                            disabled={
                                !name ||
                                !city ||
                                !address ||
                                !latitudeValue ||
                                !longitudeValue
                            }
                        >
                            Save
                        </button>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ClassLocation

