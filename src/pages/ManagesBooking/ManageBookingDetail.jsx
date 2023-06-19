/* eslint-disable no-unused-vars */
// import React from 'react'
import { Col, Row } from 'react-bootstrap'
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
    const [idBooking, setIdBooking] = useState('')
    const token = useSelector((state) => state.tokenAuth.token_jwt)

    useEffect(() => {
        axios.get('http://18.141.56.154:8000/admin/classes/tickets',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            // console.log(response.data.data);
            setCustomers(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })

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
    },[id])

    function formatDate(dateString, type) {
        const date = new Date(dateString);
        const options = {year:'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat(type, options).format(date);
        return formattedDate;
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        const options = { hour: 'numeric', minute: 'numeric'};
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedTime;
    }

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
                        <h5 style={{color: 'var(--Neutral-White-800)'}}>Showing 5 from {customers.length} data</h5>
                    </div>
                </div>
                <Row>
                    <Col md={6} className="px-2 py-3 shadow">
                        <DetailBooking 
                            bookingType={booking.class_package?.period}
                            periode={booking.class_package?.class.started_at ? formatDate(booking.class_package.class.started_at, 'id-ID') : ''}
                            session={booking.class_package?.class.started_at ? formatTime(booking.class_package.class.started_at) : ''}
                            zoomCode={
                                booking.class_package?.class.class_type === 'online'? generateZoomCode().toUpperCase(): '-'
                            }
                            classType={booking.class_package?.class.class_type + " class"}
                            descClass={
                                booking.class_package?.class.class_type === 'online'? 'Private zoom with mentor': 'offline class with trainer'
                            }
                            status={booking.status}
                            image={booking.user?.profile_picture}
                        />
                    </Col>
                    <Col md={6} className="px-5 py-3 shadow">
                        <h2 className='mb-3' style={{ color: "var(--Neutral-Black-100)" }}>Customer Data</h2>
                        {
                            customers.length > 0 ? (
                                customers.slice(0, 5).map((customer, index) => { 
                                    return (
                                        <CardCustomerBooking 
                                            key={index}
                                            id={customer.id}
                                            name={customer.user.name}
                                            date={formatDate(customer.class_package.class.started_at, 'en-US')}
                                            status={customer.status}
                                            image={customer.profile_picture}
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