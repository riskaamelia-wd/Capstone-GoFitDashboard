import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../ManagesCustomers/ManageCustomers.css"
import Cover from "../../elements/Card/Cover";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import InputSearch from "../../elements/InputSearch/InputSearch";
import CardCustomers from "../../elements/CardCustomers/CardCustomers";
import CardDetailCustomers from "../../elements/CardCustomers/CardDetailCustomer";
import CardCustomerBooking from "../../components/CardCustomerBooking/CardCustomerBooking";

const ManageCustomers = () => {
    const token = useSelector((state) => state.tokenAuth);
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState([]);
    const [DetailData, setDetailData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const getData = useCallback(async () => {
        await axios
            .get(`http://18.141.56.154:8000/admin/classes/tickets?page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${token.token_jwt}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setData(response.data.data);
                setTotalPages(Math.ceil(response.data.pagination.total_data / response.data.pagination.data_shown));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentPage, token.token_jwt]);


    useEffect(() => {
        getData();
    }, [currentPage, getData]);

    const handlePageChange = (page) => {
        console.log('Page changed:', page);
        setCurrentPage(page);
        console.log('Current page:', page);
    };

    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    /// Mendapatkan data customer berdasarkan id
    const getSelectedCustomer = () => {
        return data.find((customer) => customer.user?.id === selectedCustomerId);
    };

    // Mendapatkan kelas yang dimiliki oleh pengguna tertentu
    const getUserClasses = (user) => {
        const userClasses = data.filter((booking) => booking.user?.id === user?.user?.id);
        return userClasses;
    };
    console.log(totalPages);

    return (
        <>
            <div className="container manage-customer" id="manageCustomers">
                <Cover text={"Manage Customers"} list1={"Home"} img={imgCover} />

                <div className="row p-3 all-customers">
                    <div className={isVisible ? "col-4" : "col-12"}>
                        <div className="col-12">
                            <h2 className="text-customers">Customers</h2>
                        </div>
                        <div className="col-12 py-3">
                            <InputSearch id="search-customers" placeholder="Search customers" />
                        </div>

                        <div className="col-12">
                            {data.length > 0 ? (
                                <>
                                    {data.map((customer, index) => {
                                        return (
                                            <CardCustomers
                                                onClick={(e) => {
                                                    setSelectedCustomerId(customer.user?.id);
                                                    setIsVisible(true);
                                                }}
                                                key={index}
                                                image={`http://18.141.56.154:8000/${customer.user.profile_picture}`}
                                                name={customer.user?.name}
                                                height={customer.user?.height}
                                                weight={customer.user?.weight}
                                                goal_weight={customer.user?.goal_weight}
                                                training_level={customer.user?.training_level}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <div>Data Kosong</div>
                            )}
                        </div>
                    </div>

                    {isVisible && (
                        <div className="col-lg-8">
                            <h2 className="text-customers">Details</h2>
                            <CardDetailCustomers customer={getSelectedCustomer()} setData={setData} />

                            {getSelectedCustomer() && (
                                <>
                                    <h3 className="mt-2" style={{ fontWeight: "600", fontSize: "24px", color: "#606060" }}>Activities</h3>
                                    {getUserClasses(getSelectedCustomer()).map((booking) => (
                                        <CardCustomerBooking
                                            key={booking.id}
                                            image={booking.user?.profile_picture}
                                            name={booking.class_package?.class.class_type + " class"}
                                            date={booking.class_package?.class.class_type === 'online' ? 'Private zoom with mentor' : 'offline class with trainer'}
                                            status={booking.status}
                                            onClick={''}
                                            data-bs-toggle="modal"
                                            data-bs-target="#detailClassCustomer"
                                        />
                                    ))}
                                </>
                            )}


                        </div>
                    )}

                    {/* Pagination */}
                    <div id="paginationCustomer">
                        {totalPages > 0 && (
                            <div className="pagination">
                                {currentPage > 1 ? (
                                    <button
                                        className="previousCustomer"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        Previous
                                    </button>
                                ) : (
                                    <button
                                        className="previousCustomer disabled"
                                        disabled
                                    >
                                        Previous
                                    </button>
                                )}

                                {currentPage < totalPages && (
                                    <p className="page-text">{currentPage}</p>
                                )}

                                {currentPage < totalPages && (
                                    <button
                                        className="nextCustomer"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

};

export default ManageCustomers;
