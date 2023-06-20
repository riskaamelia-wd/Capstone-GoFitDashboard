import TextField from "../../elements/TextField/TextField"
import './Form.css'
import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import Textarea from '../../elements/TextField/Textarea' 
import { useParams } from 'react-router-dom';
import useAxios from "../../api/useAxios";



const OfflineClass = ({
    onClick,
    classNameImg,
    style, 
    className, 
    btnModalText, 
    btnModalImg,
    nameValue,
    description,
    descriptionValue,
    locateValue,
    locateSelect,
    name,
    startDate,
    startDateValue,
    onSubmit
}) => {

//     <div>
//     <label 
//     className='mt-2 label-color'
//     htmlFor="imageFile">Upload</label>
//     <label
//     className="d-flex textfield-bg borderInput form-control justify-content-between flex-row"
//     >                  
//         <input 
//         style={{width:'100%', display:'none'}}
//             name={'imageFile'}
//             id={'imageFile'}
//             type='file'
//             onChange={handleInput}
//         />
//         {data?.imageFile ? data.imageFile : 'Upload class photo'}
//         <div style={{width:'12px'}}>
//             <img src={add} style={{width:'100%'}} alt="" />
//         </div>
//     </label>
// </div>
// {
//     !data.imageFile && 
//     <small className="text-danger">must be filled in</small>
// }

    // if (name === "imageFile") {
    //     const file = e.target.files[0];
    //   setData((prevData) => ({
    //     ...prevData,
    //     [name]: URL.createObjectURL(file)
    //   }));
    //   console.log(data.imageFile);
    // } 
    const navigate = useNavigate()
    const token = useSelector((state) => state.tokenAuth.token_jwt)
    const [dataLocation, setDataLocation] =  useState([])

    const {id} = useParams()
    
    const [bodyApi, setBodyApi] = useState({
        method: "",
        url: "",
        body: null,
      });

      const [data, setData] = useState({
        id:'',
        name:'',
        started_at:null,
        description:'',
        location:{},
        class_type:'offline'
    })

    const { response , isLoading, error, fetchData } = useAxios({
        api: adminApi,
    
        method: bodyApi.method,
        url: bodyApi.url,
        body: bodyApi.body,
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
        const handleGet = async () => {
            try {
                setBodyApi({
                    method: "get",
                    url: `/locations`,
                    body: JSON.stringify({}),
                });
                await fetchData();
                const loc = response?.data?.map((item) =>({ name : item.name, id : item.id}));
                const uniqueLocations = loc.filter((value, index, self) => self.indexOf(value) === index);
                setDataLocation(uniqueLocations)
            } catch (error) {
                console.log(error);
            }
           
        };
        if (token !== '') {
            handleGet();
        }
    }, [token, isLoading, id])

    const resetForm = () => {
        setData({
            id:'',
            name:'',
            started_at:new Date(),
            description:{},
            location:'',
            class_type:'offline'
        })
    }


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
                            navigate('/offlineClass', {replace:true})
                        }
                        data-bs-dismiss="modal" 
                        aria-label="Close"></button>
                </div>
                <div className="modal-body mt-3">
                <form onSubmit={onSubmit}>
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
                                !locateValue 
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

export default OfflineClass