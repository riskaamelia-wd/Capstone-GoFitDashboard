import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const OrderChart = () => {
    const token = useSelector((state) => state.tokenAuth.token_jwt);
    const [order, setOrder] = useState([]);
    const [onlineClass, setOnlineClass] = useState(0);
    const [offlineClass, setOfflineClass] = useState(0);
    const [selectedOption, setSelectedOption] = useState("Weekly");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://18.141.56.154:8000/admin/classes/tickets", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { data_shown, total_data } = response.data.pagination;

                const pageSize = data_shown;
                const totalPages = Math.ceil(total_data / pageSize);
                let allData = [];

                for (let page = 1; page <= totalPages; page++) {
                    const pageResponse = await axios.get(
                        `http://18.141.56.154:8000/admin/classes/tickets?page=${page}&data_shown=${data_shown}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const responseData = pageResponse.data.data;
                    allData = allData.concat(responseData);
                }
                setOrder(allData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [token]);


    useEffect(() => {
        calculatedPercentage();
    }, [order, selectedOption]);
    console.log(order);
    const calculatedPercentage = () => {
        let filteredOrder = order;

        if (selectedOption === "Weekly") {
            // Filter order data based on weekly option
            filteredOrder = filteredOrder.filter(
                (item) => item?.class_package?.period === "weekly"
            );
        } else if (selectedOption === "Monthly") {
            // Filter order data based on monthly option
            filteredOrder = filteredOrder.filter(
                (item) => item?.class_package?.period === "monthly"
            );
        }
        console.log(filteredOrder);
        const onlineClasses = filteredOrder.filter(
            (item) => item.class_package.class.class_type === "online"
        );
        const offlineClasses = filteredOrder.filter(
            (item) => item.class_package.class.class_type === "offline"
        );

        setOnlineClass(onlineClasses.length);
        setOfflineClass(offlineClasses.length);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const series = [offlineClass, onlineClass];

    const options = {
        chart: {
            fontFamily: "Josefin Sans",
            type: "pie",
        },
        colors: ["#FF7F00", "#FFC166"],
        dataLabels: {
            style: {
                fontWeight: 700,
            },
            background: {
                foreColor: "#000000",
                borderRadius: 0,
                padding: 0,
            },
        },
        labels: ["Offline class", "Online class"],
        legend: {
            position: "bottom",
            fontSize: 16,
            fontWeight: 500,
            offsetY: 0,
            markers: {
                width: 16,
                height: 16,
                radius: 26,
            },
        },
    };

    return (
        <>
            <div className="orderChart" id="orderChart">
                <div className="row">
                    <div className="col-lg-8 col-sm-12">
                        <p className="textOrderChart">Application Order Chart</p>
                    </div>
                    <div className="col-4">
                        <div>
                            <select
                                className="dropdown"
                                value={selectedOption}
                                onChange={handleOptionChange}
                                id="orderChart"
                            >
                                <option className="selectOrder" value="Weekly">
                                    Weekly
                                </option>
                                <option className="selectOrder" value="Monthly">
                                    Monthly
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row"  style={{paddingLeft:"10%"}}>
                    <div id="chartOfflineOnline">
                        <ReactApexChart
                            options={options}
                            series={series}
                            type="pie"
                            width={"90%"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderChart;
