import TextField from "../../elements/TextField/TextField"
import './Form.css'
import React, {useEffect, useState} from "react";
import { useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import useAxios from "../../api/UseAxios";
import { adminApi } from "../../api/Api";
import { Select } from "../Recomended/CardAdd";



const ClassPackages = ({
    onClick,
    classNameImg,
    style, 
    className, 
    btnModalText, 
    btnModalImg,
    classValue,
    classSelect,
    periodValue,
    periodSelect,
    priceValue,
    price,
    onSubmit,
    linkClass

}) => {
    const navigate = useNavigate()
    const token = useSelector((state) => state.tokenAuth.token_jwt)
    const [classTitle, setClassTitle] =  useState([])
   

    const [bodyApi, setBodyApi] = useState({
        method: "",
        url: "",
        body: null,
      });


    const { response , isLoading, error, fetchData } = useAxios({
        api: adminApi,
    
        method: bodyApi.method,
        url: bodyApi.url,
        body: bodyApi.body,
        header: JSON.stringify({
            Authorization: `Bearer ${token}`,
          }),
      });

    const classTitleList = [
        {value:'----', text:'Choose Class'},
        ...Object.keys(classTitle)?.map((key) => ({
            value: classTitle[key]?.id,
            text: classTitle[key].name,
          })) 
    ];

    const periodList = [
        {value:'----', text:'Choose Period'},
        {value:"daily", text: "Daily"},
        {value:"weekly", text: "Weekly"},   
        {value:"monthly", text: "Monthly"},
    ];


  useEffect(() => {
    const handleGet = async () => {
        try {
            setBodyApi({
                method: "get",
                url: `/admin/classes`,
                body: JSON.stringify({}),
            });
            await fetchData();
            const titles = response?.data?.map((item) =>({ name : item.name, id : item.id}));
            const uniqueTitles = titles.filter((value, index, self) => self.indexOf(value) === index);
            setClassTitle(uniqueTitles)
        } catch (error) {
            console.log(error);
        }
       
    };
    if(token != ''){
        handleGet()
    }
  }, [token, isLoading])
    
    
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
                    <h1 className="modal-title fs-3  label-title" id="exampleModalLabel">Class Packages</h1>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={()=> navigate(`/${linkClass}/classPackages`, {replace:true})}
                        data-bs-dismiss="modal" 
                        aria-label="Close"></button>
                </div>
                <div className="modal-body mt-3">
                <form onSubmit={onSubmit}>
                    <Select
                        classNameLabel={'mt-2 label-color'}
                        label={'Select Class'}
                        className={'form-control textfield-bg  borderInput'}
                        name={'classTitle'}
                        value = {classValue}
                        options= {classTitleList}
                        onSelect={classSelect}
                    />
                    <Select
                        classNameLabel={'mt-2 label-color'}
                        label={'Select Period'}
                        className={'form-control textfield-bg  borderInput'}
                        name={'period'}
                        value = {periodValue}
                        options= {periodList}
                        onSelect={periodSelect}
                    />
                    <TextField
                        classNameLabel={'mt-2 label-color'}
                        label={'Price'}
                        placeholder={'19900'}
                        type={'number'}
                        name={'price'}
                        id={'price'}
                        onChange={price}
                        value={priceValue}
                    />
                    <div className="text-center mt-4 mb-2">
                        <button
                            disabled={
                                !classValue ||
                                !periodValue ||
                                !priceValue
                            }
                            data-bs-dismiss="modal"
                            type="submit"
                            className="btn btn-save col-12"
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

export default ClassPackages