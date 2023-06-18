/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import IconMember from '../../assets/icons/membership.svg'
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import axios from "axios";
import Cover from "../../elements/Card/Cover";
import { useNavigate } from "react-router";

const ManageBooking = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [viewDetail, setViewDetail] = useState({});

    useEffect(() => {
        axios.get('https://642feb34c26d69edc886a350.mockapi.io/class')
        .then((response) => {
            console.log(response);
            setCustomers(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

    const handleClick = (id) => {
        setViewDetail((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
        }));
    };

    const handleViewDetail = (id) => {
        navigate(`/booking/detail/${id}`)
    }

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
                <h5>Here General Customer List Data</h5>
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
                    {customers.length > 0 ? (
                    customers.map((customer) => {
                        return (
                        <tr key={customer.id}>
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
                            <th>{customer.name}</th>
                            <td>{customer.classCategory}</td>
                            <td>{customer.classDate}, {customer.timeSession}</td>
                            <td>{customer.dailyPrice}.000/daily</td>
                            <td>{customer.location}</td>
                            <td className="d-flex">
                                <ButtonComponent
                                    onClick={() => handleClick(customer.id)}
                                    className={"border-0 bg-transparent text-bold"}
                                    buttonName={'...'}
                                />
                                {viewDetail[customer.id] && (
                                    <button
                                        style={{color: "var(--info-600)", backgroundColor: "white"}}
                                        onClick={() => handleViewDetail(customer.id)}
                                        className="shadow border-0 rounded-3"
                                        >
                                        View Detail
                                    </button>
                                )}
                            </td>
                        </tr>
                        );
                    })
                    ) : (
                        <p>Tidak ada customer</p>
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default ManageBooking;
