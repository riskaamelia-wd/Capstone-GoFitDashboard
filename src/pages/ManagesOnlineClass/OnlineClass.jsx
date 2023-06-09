import Cover from "../../elements/Card/Cover"
import imgCover from '../../assets/icons/Appreciation 1.svg'
import './OnlineClass.css'
import { useNavigate } from "react-router-dom"
import InputSearch from "../../elements/InputSearch/InputSearch"
import DetailProduct from "../../components/DetailProduct.jsx/DetailProduct"
import { Col,  Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addOnlineClass, deleteOnlineClass } from "../../redux/Slice/OnlineClassSlice"
import AddOnlineClass from "../../components/Form/OnlineClass"
import { classApi } from "../../api/Api"
import { useEffect, useState } from "react"
import useAxios from "../../api/UseAxios"
import axios from "axios"
import addSmall from '../../assets/icons/add_small.svg'

const OnlineClass = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {response, isLoading} = useAxios({
        api: classApi,
        method: 'get',
        url:`/class`
    })

    const [data, setData]= useState([])
    const onlineClasses = useSelector((state) => state.onlineClass)
    const [isLoad, setIsLoad] = useState(false);
    
    useEffect(() => {
        if(response !== null){
            setData(response)
        }
        // console.log(onlineClasses, 'online class');
    }, [response])
    
    // useEffect(() => {
    //     fetchData();
    //     console.log(data);
    //   }, []);

    //   const fetchData = async () => {
    //     try {
    //       setIsLoad(true);
    //       const response = await axios.get('https://647612b1e607ba4797dd420e.mockapi.io/class');
    //       setData(response.data);
    //       setIsLoad(false);
    //       console.log(data, '1 ');
    //     } catch (error) {
    //       console.log(error);
    //       setIsLoad(false);
    //     }
    //   };


    // const handleDelete =(id) => {
    //     if(window.confirm('Are you sure you want to delete?'))
    //     console.log(id);
    //     // dispatch(deleteOnlineClass(id))
    //     deleteOnlineClass(id)
    // }

    const handleDelete = async (id) => {
        try {
          if (window.confirm('Are you sure you want to delete?')) {
            await axios.delete(`https://647612b1e607ba4797dd420e.mockapi.io/class/${id}`);
            setData((prevClasses) =>
              prevClasses.filter((onlineClass) => onlineClass.id !== id)
            );
            console.log('Data deleted successfully');
          }
        } catch (error) {
          console.log(error);
        }
      };

    // async function deleteOnlineClass(id){
    //     try{
    //         const deleteOnlineClass = await axios.delete(`https://647612b1e607ba4797dd420e.mockapi.io/class/${id}`)
    //         setData(response)
    //         alert('Product deleted successfully')
    //     }catch (error){
    //         alert(error.message)
    //     }
    // }

    const handleEdit= (id) => {
        console.log(id,' id');
        navigate(`/${id}`
        ,
        {state:{data:id}}
        )
    }
    const combinedArray = data.concat(onlineClasses);
    
    return(
        <>
            <Cover
                text={'Manage Online Class'}
                list1={'Class Data'}
                img={imgCover}
            />
            
            <Row className=' mt-5 mb-5'>
                <Col md={12} className=" d-flex flex-row justify-content-between">
                    <p style={{color:'var(--Neutral-Black-100)', fontSize:'28px', fontWeight:'700'}} className="p-0 m-0">Class Data</p>
                    <div className="d-flex flex-row mb-3">
                        <div>
                            <InputSearch
                                placeholder={'Search Class'}
                                height={45}
                            />
                        </div>
                        <AddOnlineClass
                            btnModalImg={addSmall}
                            btnModalText={'Add Class '}
                            className={'btn-google m-0 border-0 border rounded ms-2'}
                        />
                    </div>
                </Col>
                <Row>
                <Col>
                    {
                        combinedArray.length > 0 ? (
                            combinedArray?.map((onlineClass, id) =>{
                                return(
                                    <div 
                                    key={id}
                                    className="mb-3">
                                        <DetailProduct
                                            img={onlineClass.imageFile}
                                            key={id}
                                            text={onlineClass.name}
                                            date={onlineClass.classDate}
                                            timeSession={onlineClass.timeSession}
                                            category={onlineClass.classCategory}
                                            onClickDelete={()=>handleDelete(onlineClass.id)}
                                            onClickEdit={() => handleEdit(onlineClass.id)}
                                        />
                                    </div>
                                )
                            }))
                            :
                            (
                                <p className="text-center mt-5">Belum ada kelas online yang tersedia</p>
                            )
                    }
                    </Col>
                </Row>
            </Row>
        </>
    )
}

export default OnlineClass