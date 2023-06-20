import { useSelector } from "react-redux"
import axios from "axios"
import { useEffect, useState, useCallback } from "react"
import DetailProduct from "../../components/DetailProduct.jsx/DetailProduct"
import Cover from "../../elements/Card/Cover"
import imgCover from '../../assets/icons/Appreciation 1.svg'
import {Row,  Col} from 'react-bootstrap'
import { adminApi } from "../../api/Api"
import ClassPackages from "../../components/Form/classPackages"
import addSmall from '../../assets/icons/add_small.svg'
import Loading from "../../components/Loading"
import useAxios from "../../api/useAxios"

const ManageClassPackages = () => {
    const token = useSelector((state) => state.tokenAuth.token_jwt)
    const [data, setData] = useState([])
    const [packages, setPackage]= useState({
        classTitle:'',
        period:'',
        price:''
    })
    const { response, isLoading, error, fetchData } = useAxios({
        api: adminApi,
        method: "get",
        url: `/admin/classes/packages`,
        body: JSON.stringify({}),
        header: JSON.stringify({
            Authorization: `Bearer ${token}`,
          }),
      });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const getData = useCallback(async () => {
      await adminApi
        .get("/admin/classes/packages")
        .then(async (res) => {
          const resData = res.data;
          console.log(resData);
          setData(resData.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }, []);

    useEffect(() => {
        if (response !== null) {
            setData(response.data);
        }
        {
            console.log(error);
        }
    }, [error, getData, response])

    const handleDelete = async (id) => {
        await adminApi.delete(`/admin/classes/packages/${id}`, null, config).then(() => {
        fetchData();
        alert("Data deleted successfully");
        });
    };
    
    const handleEdit=async  (id) => {
        await adminApi.get(`/admin/classes/packages/${id}`, config).then(async (res) => {
            await fetchData();
            setPackage(res?.data?.data)
        })        
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const finder = data.find(item => item.id === packages.id)
        const body = {
        class: packages.classTitle,
        price: parseInt(packages.price),
        period: packages.period,
        };
        
        if(window.confirm('Are you sure you want to submit?')){
            if (finder){
                await adminApi
                .put(`/admin/classes/packages/${packages.id}`, body, config)
                .then((res) => {
                    alert('data edited successfully')
                    console.log(res);
                    fetchData();
                })
                .catch((err) => {
                    console.log(err);
                })
            } else {
                await adminApi
                .post("/admin/classes/packages", body, config)
                .then((res) => {
                    alert('data added successfully')
                    console.log(res);
                    fetchData();
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    }
    return(
        <div className="col-10 ms-5">
        <Cover
            text={'Manage Offline Class'}
            list1={'Class Data'}
            list2={'Class Packages'}
            img={imgCover}
        />
        <Row>
            <Col md={12} className="mt-4 mb-2 d-flex flex-row justify-content-between">
                <p style={{color:'var(--Neutral-Black-100)', fontSize:'28px', fontWeight:'700'}} className="p-0 m-0">Class Packages</p>
                <div className="d-flex flex-row mb-3">
                    <ClassPackages
                        linkClass={'offlineClass'}
                        btnModalImg={addSmall}
                        btnModalText={'Add Package'}
                        className={'btn-google m-0 border-0 border rounded ms-2'}
                        classValue={packages?.classTitle}
                        classSelect={(e) => {
                            const parseValue = parseInt(e.target.value)
                            const objValue = { "id": parseValue }
                            setPackage((filledState) => ({
                              ...filledState,
                              classTitle: objValue,
                            }));
                          }}
                        periodValue={packages?.period}
                        periodSelect={(e) => {
                            setPackage((filledState) => ({
                              ...filledState,
                              period: e.target.value,
                            }));
                          }}
                        priceValue={packages?.price}
                        price={(e) => {
                            setPackage((filledState) => ({
                              ...filledState,
                              price: e.target.value,
                            }));
                          }}
                        onSubmit={handleSubmit}
                    />
                </div>
            </Col>
            <Col>
                {
                    isLoading?
                        <Loading/>
                    :
                    data.length > 0 ? (
                        data?.map((item, id) =>{
                            return(
                                <div 
                                key={id}
                                className="mb-3">
                                    <DetailProduct
                                        key={id}
                                        text={item.class.name}
                                        date={item.period}
                                        timeSession={item.price}
    
    
                                        onClickDelete={()=>handleDelete(item.id)}
                                        onClickUpdate={() => handleEdit(item.id)}
                                    />
                                </div>
                            )
                        })
                    )
                    :
                    (
                        <p className="text-center mt-5">No data available</p>
                    )
                }
            </Col>
        </Row>
        </div>
    )
}
export default ManageClassPackages