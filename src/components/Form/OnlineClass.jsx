import TextField from "../../elements/TextField/TextField"
import './Form.css'
import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import Textarea from '../../elements/TextField/Textarea' 
import useAxios from "../../api/UseAxios";
import { adminApi } from "../../api/Api";
import { useParams } from 'react-router-dom';
import { Select } from "../Recomended/CardAdd";
import DatePicker from "react-datepicker";
import add from '../../assets/icons/add_small.svg'



const OnlineClass = ({
    onClick,
    classNameImg,
    style, 
    className, 
    btnModalText, 
    btnModalImg,
    nameValue,
    description,
    descriptionValue,
    linkClass,
    linkClassValue,
    imageFile,
    imageFileValue,
    name,
    startDate,
    startDateValue,
    onSubmit
}) => {
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
                className={classNameImg?classNameImg:"ms-1"} 
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
                    <h1 className="modal-title fs-3  label-title" id="exampleModalLabel">Class Data</h1>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={()=> 
                            navigate('/onlineClass', {replace:true})
                        }
                        data-bs-dismiss="modal" 
                        aria-label="Close"></button>
                </div>
                <div className="modal-body mt-3">
                <form onSubmit={onSubmit}>
                    <div>
                        <label 
                        className='mt-2 label-color'
                        htmlFor="imageFile">Upload Photo</label>
                        <label
                        className="d-flex textfield-bg borderInput form-control justify-content-between flex-row"
                        >                  
                            <input 
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
                    </div>
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
                    <div className="border-2" style={{width:'100%'}}>
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
                    <div  className="styleTextarea">
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
                    <div className="text-center mt-4 mb-2">
                        <button
                            data-bs-dismiss="modal"
                            type="submit"
                            className="btn btn-save col-12"
                            disabled={
                                !nameValue ||
                                !descriptionValue ||
                                !linkClassValue 
                                // ||
                                // !imageFileValue 
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

export default OnlineClass