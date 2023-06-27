import TextField from "../../elements/TextField/TextField"
import './Form.css'
import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import Textarea from '../../elements/TextField/Textarea'
import { adminApi } from "../../api/Api";
import { useParams } from 'react-router-dom';
import { Select } from "../Recomended/CardAdd";
import DatePicker from "react-datepicker";
import useAxios from "../../api/useAxios";
import { Modal } from "react-bootstrap";
import add from '../../assets/icons/add.svg'
import ButtonComponent from "../../elements/Buttons/ButtonComponent";



const OfflineClass = ({  
    disabled,
    show,
    handleClose,
    name,
    nameValue,
    locateValue,
    locateSelect,
    startDate,
    startDateValue,
    imageFile,
    imageFileValue,
    description,
    descriptionValue,
    onSubmitHandle,
    modaltitle,
}) => {
    const token = useSelector((state) => state.tokenAuth.token_jwt)
    const [dataLocation, setDataLocation] =  useState([])

    const {id} = useParams()
    

    const { response , isLoading, error, fetchData } = useAxios({
        api: adminApi,
    
        method: "get",
        url: `/locations`,
        body:  JSON.stringify({}),
        header: JSON.stringify({
            Authorization: `Bearer ${token}`,
          }),
      });

    const locationList = [
        {value:'----', text:'Choose Location'},
        ...Object.keys(dataLocation)?.map((key) => ({
            value: dataLocation[key].id,
            text: dataLocation[key].name,
          })) 
    ];

    useEffect(() => {
        if(response !== null){
            const loc = response?.data?.map((item) =>({ name : item.name, id : item.id}));
                const uniqueLocations = loc.filter((value, index, self) => self.indexOf(value) === index);
                setDataLocation(uniqueLocations)
        }
    }, [ isLoading, response, id])



    return(
        <>
            <Modal show={show} onHide={handleClose} centered>
            
            <Modal.Header closeButton>
                <Modal.Title className="fs-3  label-title">{modaltitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className=" rounded-5">
                <div className="col-12">
                    <label 
                        className='label-color'
                        htmlFor="imageFile" >Upload Photo</label>
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
                    <Select
                            classNameLabel={'mt-2   label-color'}
                            label={'Select Location'}
                            className={'form-control textfield-bg  borderInput'}
                            name={'location'}
                            id={'location'}
                            value = {locateValue}
                            options= {locationList}
                            onSelect={locateSelect}
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
                locateValue !== "" &&
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

export default OfflineClass