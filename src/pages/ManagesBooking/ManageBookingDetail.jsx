/* eslint-disable no-unused-vars */
// import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import DetailBooking from '../../components/DetailBooking/DetailBooking'
import CardCustomerBooking from '../../components/CardCustomerBooking/CardCustomerBooking'
import { useEffect, useState } from 'react'
import Cover from '../../elements/Card/Cover'
import IconHeader from '../../assets/icons/Appreciation 1.svg'
import { useParams } from 'react-router'
import axios from 'axios'
import { useSelector } from 'react-redux'

const ManageBookingDetail = () => {
    const { id } = useParams();
    const [customers, setCustomers] = useState([]);
    const [booking, setBooking] = useState({})
    const token = useSelector((state) => state.tokenAuth.token_jwt)
    const [selectedButton, setSelectedButton] = useState('online');
    const [pagination, setPagination] = useState({
        page: 1,
        dataShown: 0,
        totalData: 0
    });

    useEffect(() => {
        //get data booking untuk ditampilkan di customers data
        const fetchData = async () => {
            try {
                let allData = [];
                let page = 1;
                let totalData = 0;
                let dataShown = 0;

                while (dataShown < totalData || page === 1) {
                    const response = await axios.get(`http://18.141.56.154:8000/admin/classes/tickets?page=${page}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const { data, pagination } = response.data;
                    allData = [...allData, ...data];
                    page = pagination.page + 1;
                    totalData = pagination.total_data;
                    dataShown += pagination.data_shown;
                }

                setCustomers(allData);
                setPagination({
                    page: page - 1,
                    dataShown,
                    totalData
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        //untuk get detail booking dari id yg dikirimkan di param
        axios.get(`http://18.141.56.154:8000/admin/classes/tickets/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            // console.log(response.data.data);
            setBooking(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[id, token])

    //untuk convert date dari bentuk dd/mm/yyyy ke mount date, year
    function formatDate(dateString, type) {
        const date = new Date(dateString);
        const options = {year:'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat(type, options).format(date);
        return formattedDate;
    }

    //untuk convert waktu dari 24 jam ke AM/PM
    function formatTime(dateString) {
        const date = new Date(dateString);
        const options = { hour: 'numeric', minute: 'numeric'};
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedTime;
    }

    //untuk generate zoom code karena response data API tidak ada zoom code
    function generateZoomCode() {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 9; i++) {
          result += letters[Math.floor(Math.random() * letters.length)];
        }
        // Memisahkan setiap 3 huruf dengan '-'
        result = result.match(/.{1,3}/g).join('-');
        return result;
    }

    const handleButtonClick = (status) => {
        setSelectedButton(status);
    };

    //untuk filter data yg ditampilkan online/offline
    const filteredDatas = customers.filter(data => data.class_package?.class.class_type === selectedButton);
    
    return (
        <>
            <Cover
                text={'Booking Class'}
                list1={'Home'}
                list2={'Detail Customer'}
                img={IconHeader}
            />
            <div className="" style={{ padding: "42px" }}>
                <div className="title mb-4">
                    <h3 style={{ color: "var(--primary-900)" }}>Order Customer</h3>
                    <div className='d-flex justify-content-between'>
                        <h5>Here Customer Data</h5>
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
                <Row>
                    <Col md={12} className="px-2 py-3 shadow">
                        <DetailBooking 
                            bookingType={booking.class_package?.period}
                            periode={booking.class_package?.class.started_at ? formatDate(booking.class_package.class.started_at, 'id-ID') : ''}
                            session={booking.class_package?.class.started_at ? formatTime(booking.class_package.class.started_at) : ''}
                            zoomCode={generateZoomCode().toUpperCase()}
                            location={booking.class_package?.class.location.address}
                            classType={booking.class_package?.class.class_type + " class"}
                            descClass={
                                booking.class_package?.class.class_type === 'online'? 'Private zoom with mentor': booking.class_package?.class.name
                            }
                            status={booking.status}
                            image={`http://18.141.56.154:8000/${booking.user?.profile_picture}`}
                        />
                    </Col>
                    <Col md={12} className="mt-5 py-3">
                        <div className='d-flex justify-content-between'>
                            <h2 className='mb-3' style={{ color: "var(--Neutral-Black-100)" }}>Customer Data</h2>
                            <h5 style={{color: 'var(--Neutral-White-800)'}}>Showing {Math.min(5, filteredDatas.length)} from {filteredDatas.length} data</h5>
                        </div>
                        {
                            filteredDatas.length > 0 ? (
                                filteredDatas.slice(0, 5).map((customer, index) => { 
                                    return (
                                        <CardCustomerBooking 
                                            key={index}
                                            id={customer.id}
                                            name={customer.user.name}
                                            date={formatDate(customer.class_package?.class?.started_at, 'en-US')}
                                            status={customer.status}
                                            image={`http://18.141.56.154:8000/${customer.user.profile_picture}`}
                                        />
                                    );
                                })                                  
                            ):
                            (
                                <p>Belum ada customer</p>
                            )
                        }
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ManageBookingDetail