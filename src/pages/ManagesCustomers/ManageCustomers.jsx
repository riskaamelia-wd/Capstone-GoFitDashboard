import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../ManagesCustomers/ManageCustomers.css"
import Cover from "../../elements/Card/Cover";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import InputSearch from "../../elements/InputSearch/InputSearch";
import CardCustomers from "../../elements/Card/CardCustomers";
import CardDetailCustomers from "../../elements/Card/CardDetailCustomer";
import CardCustomerBooking from "../../components/CardCustomerBooking/CardCustomerBooking";

const ManageCustomers = () => {
    const token = useSelector((state) => state.tokenAuth);
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://18.141.56.154:8000/users?page=${currentPage}`, {
                    headers: {
                        Authorization: `Bearer ${token.token_jwt}`,
                    },
                });
                setData(response.data.data);
                setTotalPages(Math.ceil(response.data.pagination.total_data / response.data.pagination.data_shown));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentPage, token.token_jwt]);

    const handlePageChange = useCallback(
        (page) => {
            setCurrentPage(page);
        },
        [setCurrentPage]
    );

    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [customerActivities, setCustomerActivities] = useState();

    const getSelectedCustomer = () => {
        return data.find((customer) => customer.id === selectedCustomerId);
    };

    const handleCustomerClick = async (customerId) => {
        setSelectedCustomerId(customerId);
        setIsVisible(true);

        try {
            const response = await axios.get(`http://18.141.56.154:8000/admin/classes/tickets/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${token.token_jwt}`,
                },
            });
            setCustomerActivities(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredData = data.filter((customer) => {
        return customer.name.toLowerCase().includes(searchValue.toLowerCase());
    });

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
                            <InputSearch
                                id="search-customers"
                                placeholder="Search customers"
                                value={searchValue}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="col-12">
                            {filteredData.length > 0 ? (
                                <>
                                    {filteredData.map((customer, index) => {
                                        return (
                                            <CardCustomers
                                                onClick={(e) => {
                                                    handleCustomerClick(customer.id);
                                                    setIsVisible(true);
                                                }}
                                                key={index}
                                                image={`http://18.141.56.154:8000/${customer.profile_picture}`}
                                                name={customer.name}
                                                height={customer.height}
                                                weight={customer.weight}
                                                goal_weight={customer.goal_weight}
                                                training_level={customer.training_level}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <div></div>
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
                                    {customerActivities && (
                                        <CardCustomerBooking
                                            key={customerActivities.data?.id}
                                            image={customerActivities.data?.class_package?.class.image_banner}
                                            name={customerActivities.data?.class_package?.class.class_type + " class"}
                                            date={customerActivities.data?.class_package?.class.class_type === 'online' ? 'Private zoom with mentor' : 'offline class with trainer'}
                                            status={customerActivities.data?.status}
                                            onClick={''}
                                            data-bs-toggle="modal"
                                            data-bs-target="#detailClassCustomer"
                                        />
                                    )}

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

                                {currentPage < totalPages && filteredData.length > 0 && (
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
