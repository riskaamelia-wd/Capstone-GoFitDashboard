import TextField from "../../elements/TextField/TextField"
import './Form.css'
import React, {useEffect, useState} from "react";
import { useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../api/Api";
import { Select } from "../Recomended/CardAdd";
import useAxios from "../../api/useAxios";
import { Modal } from "react-bootstrap";
import axios from 'axios'
import ButtonComponent from "../../elements/Buttons/ButtonComponent";

const ClassPackages = ({
    classValue,
    classSelect,
    periodValue,
    periodSelect,
    priceValue,
    price,
    show,
    handleClose,
    onSubmitHandle,
    modaltitle,
    dataSelect

}) => {
    const token = useSelector((state) => state.tokenAuth.token_jwt)
    const [classTitle, setClassTitle] =  useState([])
    const[isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)

     
    const fetchData = async (currentPage) => {
        setIsLoading(true);
        await axios
          .get(`http://18.141.56.154:8000/admin/classes?page=${currentPage}`, 
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
          .then((response) => {
            console.log(response.data.pagination.total_data);
            const totalData = response.data.pagination.total_data
            const dataShown = response.data.pagination.data_shown
            const total = Math.ceil(totalData / dataShown);
            setTotalPages(total)
            const onlineData = response?.data?.data?.filter((item) => dataSelect ? item.class_type === 'online' : item.class_type === 'offline');
            setData(onlineData);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
    }

    // const { response , isLoading, error, fetchData } = useAxios({
    //     api: adminApi,
    
    //     method: "get",
    //     url: `/admin/classes`,
    //     body: JSON.stringify({}),
    //     header: JSON.stringify({
    //         Authorization: `Bearer ${token}`,
    //       }),
    //   });

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


    // const onlineData = response?.data.filter((item) => dataSelect ? item.class_type === 'online' : item.class_type === 'offline');
    useEffect(()=>{
        fetchData(currentPage)
    }, [currentPage])

    useEffect(() => {
        if(data !== null){
            const titles = data?.map((item) =>({ name : item.name, id : item.id}));
                const uniqueTitles = titles?.filter((value, index, self) => self.indexOf(value) === index);
                setClassTitle(uniqueTitles)
        }
    // }
  }, [  isLoading,  token])
    
  return(
    <>
        <Modal show={show} onHide={handleClose} centered>
        
        <Modal.Header closeButton>
            <Modal.Title className="fs-3  label-title">{modaltitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" rounded-5">
            <div className="col-12 row ">
                <div className="col-10">
                        <Select
                                classNameLabel={'mt-2 label-color'}
                                label={'Select Class'}
                                className={'form-control textfield-bg  borderInput'}
                                name={'classTitle'}
                                value = {classValue}
                                options= {classTitleList}
                                onSelect={classSelect}
                            />
                </div>
                <div className="col-2 p-0">
                        <TextField
                            classNameLabel={'mt-2 label-color'}
                            classNameInput={'form-control textfield-bg  borderInput'}
                            label={'Pages'}
                            placeholder={'1'}
                            type={'pages'}
                            name={'pages'}
                            id={'pages'}
                            onChange={(e) => { setCurrentPage( e.target.value)}}
                            value={currentPage}
                        />
                </div>
            </div>
        <div className="col-12 ">
                <Select
                        classNameLabel={'mt-2 label-color'}
                        label={'Select Period'}
                        className={'form-control textfield-bg  borderInput'}
                        name={'period'}
                        value = {periodValue}
                        options= {periodList}
                        onSelect={periodSelect}
                    />
        </div>
        <div className="col-12 ">
                <TextField
                    classNameLabel={'mt-2 label-color'}
                    classNameInput={'form-control textfield-bg  borderInput'}
                    label={'Price'}
                    placeholder={'19900'}
                    type={'number'}
                    name={'price'}
                    id={'price'}
                    onChange={price}
                    value={priceValue}
                />
        </div>
        <div className="col-12 text-center mt-4 mb-2">
            {classValue !== "" &&
            periodValue !== "" &&
            priceValue !== "" 
            ? (
            <ButtonComponent
                type={"submit"}
                className={"btn col-12 btn-save"}
                id={"submitPackages"}
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

export default ClassPackages