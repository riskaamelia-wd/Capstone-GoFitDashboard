/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Cover from '../../elements/Card/Cover'
import CoverIcon from '../../assets/icons/Appreciation 1.svg'
import SearchIcon from "../../assets/icons/search.svg";
import AddIcon from '../../assets/icons/add-white.svg'
import { Button } from 'react-bootstrap'
import TagRole from '../../elements/Tag/TagRole';
import ResetPasswordIcon from '../../assets/icons/forward_media.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import ResetPasswordAdmin from '../../components/Form/ResetPasswordAdmin';
import Admin from '../../components/Form/Admin';
import { useSelector } from 'react-redux';
import axios from 'axios';
import IconArrowBack from '../../assets/icons/arrow_left.svg'
import IconArrowNext from '../../assets/icons/arrow_right.svg'
import img from '../../assets/img/default_image.jpg'

const ManageAdmin = () => {
    const token = useSelector((state) => state.tokenAuth.token_jwt)
    const [datas, setDatas] = useState([]);
    const [searchData, setSearchData] = useState('')
    const [fetchStatus, setFetchStatus] = useState(true)
    const [pagination, setPagination] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalData, setTotalData] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)
    const [idResetPassword, setIdResetPassword] = useState('')
    const [prevImg, setPrevImg] = useState("https://placeholder.com/40x40");    

    useEffect(() => {
        if(fetchStatus){
            axios.get(`http://18.141.56.154:8000/users?page=${pagination}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setDatas(response.data.data);
                setTotalPages(Math.ceil(response.data.pagination.total_data / itemPerPage))
                setTotalData(response.data.pagination.total_data)
                setFetchStatus(false);
            })
            .catch((error) => {
                console.log(error);
                setFetchStatus(false);
            })
        }
    },[fetchStatus, setFetchStatus, pagination, setPagination, itemPerPage, token])

    const handleAddAdmin = () => {
        // alert('Added')
    }

    const handleResetPassword = (id) => {
        setIdResetPassword(id)
    }

    const handleDelete = (id) => {
        axios.delete(`http://18.141.56.154:8000/users/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            alert('user deleted');
            setFetchStatus(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handlePaginations = (value) => {
        const newPagination = pagination + parseInt(value);
        if (newPagination > 0 && newPagination <= totalPages) {
            setPagination(newPagination);
            setFetchStatus(true);
        }
    }

    const handleSearch = (e) => {
        setSearchData(e.target.value);
    }

    
    const [data, setData] = useState({
        imgFile: "",
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
    });

  
    const handleInput = (e) => {
        const { name, value, files } = e.target;
        if (name === "imgFile" && files.length > 0) {
        const file = files[0];
        const imageUrl = URL.createObjectURL(file);
        setData((prevData) => ({
            ...prevData,
            [name]: file,
        }));
        setPrevImg(imageUrl);
        } else {
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        }
    };

    const handleCloseAddAdmin=()=>{
        setData({
            imgFile : '',
            name : '',
            email : '',
            role:'',
            password:'',
            confirmPassword:''
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`http://18.141.56.154:8000/register`, {
            name: data.name,
            email: data.email,
            password: data.password,
            gender: "pria",
            height: 168,
            weight: 60,
            training_level: "beginner",
            })
            .then((response) => {
            postProfilePicture(response.data.data.id);
            setData({
                imgFile : '',
                name : '',
                email : '',
                role:'',
                password:'',
                confirmPassword:''
            })
            if(data.length>=10){
                let nextPage = totalPages+1
                setPagination(nextPage);
                setFetchStatus(true);
            }else{
                setPagination(totalPages)
                setFetchStatus(true);
            }
            handleCloseAddAdmin()
            })
            .catch((error) => {
            console.log(error);
            });
    };

    const deleteImg = () => {
        setPrevImg("https://placeholder.com/40x40");
    };

    const postProfilePicture = (id) => {
        const formData = new FormData();
        formData.append("file", data.imgFile);

        axios
        .post(`http://18.141.56.154:8000/users/profile/${id}`, formData, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            alert("Profile picture uploaded successfully");
        })
        .catch((error) => {
            console.log(error);
        });

        setFetchStatus(true);
        alert("User created");
        setData({
        imgFile: "",
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
        });
        setPrevImg("https://placeholder.com/40x40");
    };

    const filteredByName = datas.filter(data => {
        return data.name.toLowerCase().includes(searchData.toLowerCase());
    });

    return (
        <div className="container">
            <Cover 
                img={CoverIcon}
                text={'Manage Admin'}
                list1={'Home'}
            />
            <div className="shadow mt-3 px-5 py-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <h1 className="border-end pe-3">All Admin</h1>
                        <p>{totalData} Total</p>
                        <p>0 Inactive</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="search-container">
                            <img src={SearchIcon} className='icon-search'/>
                            <input 
                                name={'inputSearchData'}
                                id={'inputSearchData'}
                                placeholder={'Search your name'}                
                                className = "search py-2"
                                value={searchData}
                                onChange={handleSearch}
                            />
                        </div>
                        <Admin 
                            onClick={handleAddAdmin}
                            btnModalText={'Add Admin'}
                            btnModalImg={AddIcon}
                            fetchStatus={setFetchStatus}
                            handleSubmit={handleSubmit}
                            handleInput={handleInput}
                            deleteImg={deleteImg}
                            nameValue={data?.name}
                            emailValue={data?.email}
                            passwordValue={data?.password}
                            confirmPasswordValue={data?.confirmPassword}
                            handleClose={handleCloseAddAdmin}
                            prevImg={prevImg}
                        />
                        {console.log(data)}
                    </div>
                </div>
                <table className="table table-borderless">
                    <thead
                        style={{
                        borderTop: "2px solid var(--Neutral-White-900)",
                        borderBottom: "2px solid var(--Neutral-White-900)",
                        color: "var(--Neutral-White-900)",
                        }}
                    >
                        <tr style={{ color: "var(--Neutral-White-900)" }}>
                            <td style={{ width: '40px' }}>
                                <div
                                style={{
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--primary-100)',
                                    width: '24px',
                                    height: '24px',
                                    margin: 'auto',
                                }}
                                ></div>
                            </td>
                            <th scope="col">Name</th>
                            <th scope="col">Site Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredByName.length > 0 ? (
                        filteredByName.map((data, index) => {
                            return (
                            <tr key={index}>
                                <td style={{ width: '40px' }}>
                                    <div
                                    style={{
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--primary-100)',
                                        width: '24px',
                                        height: '24px',
                                        margin: 'auto',
                                    }}
                                    ></div>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="me-3"> {
                                                data?.profile_picture !== '' ?

                                                <img
                                                    src={`http://18.141.56.154:8000/${data?.profile_picture}`}
                                                    alt="Booking"
                                                    className="rounded-circle"
                                                    style={{ width: '40px', height: '40px' }}
                                                />
                                                :
                                                <> 
                                                <img
                                                    src={img}
                                                    alt="Booking"
                                                    className="rounded-circle"
                                                    style={{ width: '40px', height: '40px' }}
                                                />
                                                </>
                                            }
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <span style={{fontWeight: 'bold', fontSize: '14px'}}>{data.name}</span>
                                            <span style={{color: 'var(--Neutral-White-900)' ,fontWeight: 'normal', fontSize: '14px'}}>{data.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <TagRole 
                                        role={data.role}
                                    />
                                </td>
                                <td>
                                    <div className="d-flex gap-3 justify-content-end">
                                        <ResetPasswordAdmin
                                            onClick={() => handleResetPassword(data.id)}
                                            id={idResetPassword}
                                            currentPass={data.password}
                                            btnModalText={'Reset Password'}
                                            btnModalImg={ResetPasswordIcon}
                                        />
                                        <Button variant='outline-none' onClick={() => handleDelete(data.id)}>
                                            <img src={DeleteIcon} alt="" style={{ width: '20px', height: '20px' }} className='pe-2'/>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            );
                        })
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Tidak ada data admin</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='d-flex justify-content-between align-items-center' style={{borderTop: '1px solid black'}}>
                    <div className="d-flex gap-5 justify-content-between">
                        <div className="d-flex gap-2">
                            item per page:
                            <input type="number" value={itemPerPage} style={{ width: '44px', border: 'none' }} disabled/>
                        </div>
                        <div className="d-flex gap-2">
                            {pagination * itemPerPage - 9} - {pagination * itemPerPage > totalData? totalData: pagination * itemPerPage} of {totalData}
                        </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        {pagination} of {totalPages} pages
                        <Button onClick={() => handlePaginations(-1)} className="bg-white border-0">
                            <img src={IconArrowBack} alt="" />
                        </Button>
                        <Button onClick={() => handlePaginations(1)} className="bg-white border-0">
                            <img src={IconArrowNext} alt="" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageAdmin