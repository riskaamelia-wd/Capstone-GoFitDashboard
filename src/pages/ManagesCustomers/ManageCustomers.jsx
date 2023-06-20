import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
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

    const getData = useCallback(
        async () => {
            await axios
            .get("http://18.141.56.154:8000/admin/classes/tickets", {
                headers: {
                    Authorization: `Bearer ${token.token_jwt}`,
                },
            })
            .then((response) => {
                console.log(response.data.data);
                setData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }, []
    )

    useEffect(() => {
        getData();
    }, []);

    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    const getSelectedCustomer = () => {
        return data.find((customer) => customer.user?.id === selectedCustomerId);
    };

    // Mendapatkan kelas yang dimiliki oleh pengguna tertentu
    const getUserClasses = (user) => {
        const userClasses = data.filter((booking) => booking.user?.id === user?.user?.id);
        return userClasses;
      };
      

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
                            />
                        </div>

                        <div className="col-12">
                            {data.length > 0 ? (
                                data.map((customer) => {
                                    return (
                                        <CardCustomers
                                            onClick={(e) => {
                                                setSelectedCustomerId(customer.user?.id);
                                                setIsVisible(true);
                                            }}
                                            key={customer.user?.id}
                                            image={`http://18.141.56.154:8000/${customer.user.profile_picture}`}
                                            name={customer.user?.name}
                                            height={customer.user?.height}
                                            weight={customer.user?.weight}
                                            goal_weight={customer.user?.goal_weight}
                                            training_level={customer.user?.training_level}
                                        />
                                    );
                                })
                            ) : (
                                <div>Data Kosong</div>
                            )}
                        </div>
                    </div>

                    {isVisible ? (
                        <>
                            <div className="col-lg-8">
                                <h2 className="text-customers">Details</h2>
                                <CardDetailCustomers customer={getSelectedCustomer()} setData={setData}/>

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
                                                data-bs-toggle="modal"
                                                data-bs-target="#detailClass"
                                            />
                                        ))}
                                    </>
                                )}


                            </div>
                        </>
                    ) : (
                        <> </>
                    )}
                </div>
            </div>
            {/* <div
                className="modal fade"
                id="detailClass"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog detail-class">
                    <div className="content-detailclass">

                        <p style={{ fontWeight: "400", fontSize: "16px", color: "#000000", paddingTop: "4%" }}>
                        </p>
                    </div>

                </div>
            </div> */}
            {/* <PopUP /> */}
        </>
    );
};

export default ManageCustomers;
