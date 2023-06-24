import '../ChartDashboard.css'
import React from 'react';
import Chart from 'react-apexcharts';
import income from "../../../assets/img/ikon_income.svg"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from "axios"
const Income = () => {

    const token = useSelector((state) => state.tokenAuth.token_jwt);
    const [incomeData, setIncomeData] = useState([]);
    const [monthlyAmount, setMonthlyAmount] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://18.141.56.154:8000/admin/transactions", {
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
                        `http://18.141.56.154:8000/admin/transactions?page=${page}&data_shown=${data_shown}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const responseData = pageResponse.data.data;
                    allData = allData.concat(responseData);
                }
                setIncomeData(allData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        const calculateMonthlyAmount = () => {
            const monthlyAmountData = Array(12).fill(0);

            incomeData.forEach(item => {
                const updatedAt = new Date(item.metadata.updated_at);
                const month = updatedAt.getMonth();
                monthlyAmountData[month] += item.amount;
            });
            setMonthlyAmount(monthlyAmountData);
            // Menghitung nilai total
            const total = monthlyAmountData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            setTotalAmount(total);
        };

        calculateMonthlyAmount();
    }, [incomeData]);

    const options = {
        chart: {
            id: 'area-chart',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            selection: {
                enabled: false
            },
            pan: {
                enabled: false
            },
            resetZoom: {
                enabled: false
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
                show: false
            },
            labels: {
                style: {
                    fontSize: '10px'
                }
            },
            axisTicks: {
                show: false,
                showAlways: false
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '10px'
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            colors: ['#0D6A50']
        },
    };

    const series = [
        {
            name: 'Rp',
            data: monthlyAmount,
            strokeColor: '#0D6A50'
        }
    ];

    return (
        <div className="IncomeDashboard" id="IncomeDashboard">
            <div style={{ display: "flex" }} className="">
                <span style={{ fontWeight: "600", fontSize: "4vh" }}>Income</span>
                <div className="detailIncome" style={{ marginLeft: "55%" }}>
                    <img src={income} alt="income" />
                    <span style={{ fontWeight: "500", fontSize: "60%" }}>+Rp 2.000.000</span>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginLeft: "5px", fontWeight: "600", fontSize: "3vh" }}>{totalAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
            </div>

            <Chart
                options={options}
                series={series}
                type="area"
                height={"100%"}
                width={"100%"}
                className="area-chart-income mt-1"
                style={{ marginTop: "-20px" }}
            />
        </div>
    );
}

export default Income

