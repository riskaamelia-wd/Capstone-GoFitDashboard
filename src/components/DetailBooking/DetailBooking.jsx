/* eslint-disable react/prop-types */
// import React from 'react'

import CardCustomerBooking from "../CardCustomerBooking/CardCustomerBooking"
import CartIcon from '../../assets/icons/bx-cart-alt.svg'
import CalendarIcon from '../../assets/icons/bx-calendar.svg'
import TimeIcon from '../../assets/icons/bx-stopwatch.svg'
import CodeIcon from '../../assets/icons/bx-receipt.svg'
import { Col, Row } from "react-bootstrap"

const DetailBooking = ({bookingType, periode, session, zoomCode, classType, descClass, status, image, location}) => {
    return (
        <>
            <CardCustomerBooking 
                image={image}
                name={classType}
                date={descClass}
                status={status}
            />
            <div className="shadow p-3 rounded-5">
                <h4>Booking Details</h4>
                <Row style={{fontWeight: 'bold'}}>
                    <Col xs={9}>
                        <Row>
                            <Col xs={1}><img src={CartIcon} alt="" height="20"/></Col>
                            <Col style={{marginLeft: '-40px'}} xs={11}><p>Booking type</p></Col>                            
                        </Row>
                        <Row className="d-flex align-items-center">
                            <Col xs={1}>
                                <img src={CalendarIcon} alt="" />
                            </Col>
                            <Col style={{marginLeft: '-40px'}} xs={11}>
                                <p>Periode of Booking</p>
                            </Col>
                        </Row>
                        <Row className="d-flex align-items-center">
                            <Col xs={1}>
                                <img src={TimeIcon} alt="" />
                            </Col>
                            <Col style={{marginLeft: '-40px'}} xs={11}>
                                <p>Time session</p>
                            </Col>
                        </Row>
                        {
                            location === '' ? (
                                <Row className="d-flex align-items-center">
                                    <Col xs={1}>
                                        <img src={CodeIcon} alt="" />
                                    </Col>
                                    <Col style={{marginLeft: '-40px'}} xs={11}>
                                        <p>Zoom code</p>
                                    </Col>
                                </Row>
                            ):
                            (
                                <Row className="d-flex align-items-center">
                                    <Col xs={1}>
                                        <img src={CodeIcon} alt="" />
                                    </Col>
                                    <Col style={{marginLeft: '-40px'}} xs={11}>
                                        <p>Location</p>
                                    </Col>
                                </Row>
                            )
                        }
                    </Col>
                    <Col xs={3}>
                        <p>{bookingType}</p>
                        <p>{periode}</p>
                        <p>{session}</p>
                        {
                            location !== '' ?
                            (<p>{location}</p>):
                            (<p>{zoomCode}</p>)
                        }
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default DetailBooking