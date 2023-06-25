import "../Dashboard/Dashboard.css"
import CardDashboard from "../../elements/Card/CardDashboard"
import img from "../../assets/img/arrows_more_up.svg"
import dashboard3 from "../../assets/img/db1.svg"
import dashboard4 from "../../assets/img/dashboard4.svg"
import OrderChart from "../../components/chartDashboard/OrderChart/OrderOfflineOnline"
import RecentTransaction from "../../components/chartDashboard/RecentTransaction/RecentTransaction"
import Income from "../../components/chartDashboard/IncomeOutcome/Income"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from "axios"

const Dashboard = () => {
    const token = useSelector((state) => state.tokenAuth.token_jwt);
    const [GymPlaces, setGymPlaces] = useState([]);
    const [membership, setMembership] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //get data untuk jumlah tempat gym
                const endpoint1 = axios.get("http://18.141.56.154:8000/locations", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                //get data untuk jumlah membership
                const endpoint2 = axios.get("http://18.141.56.154:8000/admin/memberships", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const [response1, response2] = await Promise.all([endpoint1, endpoint2]);

                const { data_shown: dataShown1, total_data: totalData1 } = response1.data.pagination;
                const { data_shown: dataShown2, total_data: totalData2 } = response2.data.pagination;

                const pageSize1 = dataShown1;
                const pageSize2 = dataShown2;

                const totalPages1 = Math.ceil(totalData1 / pageSize1);
                const totalPages2 = Math.ceil(totalData2 / pageSize2);

                let allData1 = [];
                let allData2 = [];

                for (let page = 1; page <= totalPages1; page++) {
                    const pageResponse = await axios.get(
                        `http://18.141.56.154:8000/locations?page=${page}&data_shown=${dataShown1}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const responseData = pageResponse.data.data;
                    allData1 = allData1.concat(responseData);
                }

                for (let page = 1; page <= totalPages2; page++) {
                    const pageResponse = await axios.get(
                        `http://18.141.56.154:8000/admin/memberships?page=${page}&data_shown=${dataShown2}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const responseData = pageResponse.data.data;
                    allData2 = allData2.concat(responseData);
                }
              
                setGymPlaces(allData1);
                setMembership(allData2);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [token]);

    //menghitung jumlah tempat gym
    const dataGymLength = GymPlaces ? GymPlaces.length : 0;
    console.log("Lokasi Gym:", dataGymLength);
    //menghitung jumlah membership
    const dataMembershipLength = membership ? membership.length : 0;
    console.log("Membership:", dataMembershipLength);

    return (
            <div className="container-fluid dashboard pt-2" id="dashboard">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row gy-2 gx-2">
                            <div className="col-lg-12">
                                <CardDashboard
                                    text1={"Total Partners"}
                                    text3={dataGymLength}
                                    text4={" Gym Places"}
                                    img1={img}
                                    text6={`+ ${dataGymLength}`}
                                    text7={" In all area"}
                                    img2={dashboard3}
                                />
                            </div>
                            <div className="col-lg-12">
                                <CardDashboard
                                    text1={"Total membership"}
                                    text3={dataMembershipLength}
                                    text5={" (Members)"}
                                    img1={img}
                                    text6={`+ ${dataMembershipLength} Member`}
                                    img2={dashboard4}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <RecentTransaction />
                        {/* <OrderChart /> */}
                    </div>
                </div>

                <div>
                    <div className="row mt-3 gx-4 gy-2">
                        <div className="col-lg-6">
                            <OrderChart />
                        </div>
                        <div className="col-lg-6">
                            <Income />
                        </div>

                    </div>
                </div>
            </div>
    )
}

export default Dashboard