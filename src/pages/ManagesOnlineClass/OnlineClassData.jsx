import Cover from "../../elements/Card/Cover"
import imgCover from '../../assets/icons/Appreciation 1.svg'
import './OnlineClass.css'
import { useNavigate } from "react-router-dom"
import InputSearch from "../../elements/InputSearch/InputSearch"
import DetailProduct from "../../components/DetailProduct.jsx/DetailProduct"
import img from '../../assets/img/back.svg'
import addSmall from '../../assets/icons/add_small.svg'
import './ManagesOnlineClass.css'
import { Col,  Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteOnlineClass } from "../../redux/Slice/OnlineClassSlice"

const OnlineClassData = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const onlineClasses = useSelector((state) => state.onlineClass)


    const handleDelete =(id) => {
        if(window.confirm('Are you sure you want to delete?'))
        console.log(id);
        dispatch(deleteOnlineClass(id))
    }

    const handleEdit= (id) => {
        console.log(id,' id');
        navigate('/DataClass'
        ,{state:{data:id}}
        )
    }
    
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
                    <div className="d-flex flex-row">
                        <div>
                            <InputSearch
                                placeholder={'Search Class'}
                            />
                        </div>
                        <button 
                            className="btn btn-save btn-add pe-4 ps-4 ms-3" 
                            onClick={() => navigate('/DataClass')}
                        >
                            Add Class
                            <img src={addSmall} className="ms-4" alt="" />
                        </button>
{/* 
                        <button type="button" className="btn btn-save btn-add pe-4 ps-4 ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add Class
                            <img src={addSmall} className="ms-4" alt="" />
                        </button>

                    <div class="modal fade" style={{backgroundColor:'black'}} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" >
                        <div class="modal-content" style={{backgroundColor:'black'}}>
                        <div class="modal-body" style={{backgroundColor:'black'}}>
                            <AddOnlineClass/>
                        </div>
                        </div>
                    </div>
                    </div> */}

                    </div>
                </Col>
                <Row>
                <Col md={6} >
                    {
                        onlineClasses.length > 0 ? (
                            onlineClasses.map((onlineClass, id) =>{
                                return(
                                    
                                    <div className="mb-3">
                                        <DetailProduct
                                            img={img}
                                            key={id}
                                            text={onlineClass.onlineClassName}
                                            date={onlineClass.onlineClassDate}
                                            timeSession={onlineClass.onlineClassTime}
                                            referralCode={onlineClass.onlineClassReferralCode}
                                            onClickDelete={()=>handleDelete(onlineClass.onlineClassId)}
                                            onClickEdit={() => handleEdit(onlineClass.onlineClassId)}
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

export default OnlineClassData