import { useEffect, useState } from "react";
import IconMember from '../../assets/icons/membership.svg'
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import axios from "axios";
import Cover from "../../elements/Card/Cover";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const ManageBooking = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.tokenAuth.token_jwt)
    const [datas, setdatas] = useState([]);
    const [viewDetail, setViewDetail] = useState({});
    const [selectedButton, setSelectedButton] = useState('online');
    
    useEffect(() => {
        //get semua data booking
        axios.get('http://18.141.56.154:8000/admin/classes/tickets',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data.data);
            setdatas(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[token])

    const handleClick = (id) => {
        //untuk menampilkan tombol view detail
        setViewDetail((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleViewDetail = (id) => {
        navigate(`/booking/detail/${id}`)
    }

    //untuk convert date dari bentuk dd/mm/yyyy ke mount date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate;
    }

    //untuk convert waktu dari 24 jam ke AM/PM
    function formatTime(dateString) {
        const date = new Date(dateString);
        const options = { hour: 'numeric', minute: 'numeric'};
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedTime;
    }

    const handleButtonClick = (status) => {
        setSelectedButton(status);
    };

    //untuk filter data yg ditampilkan online/offline
    const filteredDatas = datas.filter(data => data.class_package.class.class_type === selectedButton);
    console.log(filteredDatas.length);
    return (
        <>
        <Cover
            text={'Booking Class'}
            list1={'Home'}
            img={IconMember}
        />
        <div className="" style={{ padding: "42px" }}>
            <div className="title mb-4">
                <h3 style={{ color: "var(--primary-900)" }}>General Customer</h3>
                <div className="d-flex justify-content-between">
                    <h5>Here General Customer List Data</h5>
                    <div>
                        <Button
                            className='me-2 shadow'
                            onClick={() => handleButtonClick('online')}
                            style={{ backgroundColor: selectedButton === 'online' ? 'var(--Warning-500)' : 'white', color: 'var(--Warning-900)', border: 'none' }}
                        >
                            Online
                        </Button>
                        <Button
                            className="shadow"
                            onClick={() => handleButtonClick('offline')}
                            style={{ backgroundColor: selectedButton === 'offline' ? 'var(--Warning-500)' : 'white', color: 'var(--Warning-900)', border: 'none' }}
                        >
                            Offline
                        </Button>
                    </div>
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
                        <th scope="col">Class</th>
                        <th scope="col">Date Session</th>
                        <th scope="col">Price</th>
                        <th scope="col">Location</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDatas.length > 0 ? (
                        filteredDatas.map((data) => (
                            <tr key={data.id}>
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
                                <th>{data.user.name}</th>
                                {
                                    data.class_package.class.class_type === 'online' ? 
                                    <td>Via zoom</td>:
                                    <td>{data.class_package.class.name}</td>
                                }
                                <td>{formatDate(data.class_package.class.started_at)}, {formatTime(data.class_package.class.started_at)}</td>
                                <td>{data.class_package.price}/{data.class_package.period}</td>
                                <td>{data.class_package.class.location.address}</td>
                                <td className="d-flex">
                                    <ButtonComponent
                                        onClick={() => handleClick(data.id)}
                                        className={"border-0 bg-transparent text-bold"}
                                        buttonName={'...'}
                                    />
                                    {viewDetail[data.id] && (
                                        <button
                                            style={{color: "var(--info-600)", backgroundColor: "white"}}
                                            onClick={() => handleViewDetail(data.id)}
                                            className="shadow border-0 rounded-3"
                                        >
                                            View Detail
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">Tidak ada data booking</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default ManageBooking;
