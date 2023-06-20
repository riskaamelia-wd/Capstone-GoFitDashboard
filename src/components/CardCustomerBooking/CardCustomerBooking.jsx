/* eslint-disable react/prop-types */
// import React from 'react'
import { Card } from "react-bootstrap"
import TagBookingStatus  from '../../elements/Tag/TagBookingStatus'
import { useNavigate } from "react-router"

const CardCustomerBooking = ({name, date, status, image, id}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/booking/detail/${id}`)
    }

    return (
        <>
            <Card onClick={handleClick} className="d-flex flex-row align-items-center p-3 mb-4 shadow border-0 rounded-5" style={{ cursor: 'pointer' }}>
                <div className="me-3">
                    <img src={image} alt="Booking" className="rounded-circle" style={{ width: '80px', height: '80px' }} />
                </div>
                <div>
                    <h5>{name}</h5>
                    <p style={{color: 'var(--Neutral-White-800)'}}>{date}</p>
                    <TagBookingStatus
                        status={status}
                    />
                </div>
            </Card>
        </>
    )
}

export default CardCustomerBooking