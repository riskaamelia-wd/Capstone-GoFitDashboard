import "../Dashboard/Dashboard.css"
import CardDashboard from "../../elements/Card/CardDashboard"
import img from "../../assets/img/arrows_more_up.svg"
import dashboard1 from "../../assets/img/db1.svg"
import dashboard2 from "../../assets/img/db2.svg"
import dashboard3 from "../../assets/img/db1.svg"
import dashboard4 from "../../assets/img/dashboard4.svg"
import OrderChart from "../../components/chartDashboard/OrderChart/OrderOfflineOnline"
import SpendingCost from "../../components/chartDashboard/SpendingCost/SpendingCost"
import RecentTransaction from "../../components/chartDashboard/RecentTransaction/RecentTransaction"
import Income from "../../components/chartDashboard/IncomeOutcome/Income"
import Outcome from "../../components/chartDashboard/IncomeOutcome/Outcome"
import WalletBalance from "../../components/chartDashboard/WalletBalance/WalletBalance"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from "axios"

const Dashboard = () => {
    const token = useSelector((state) => state.tokenAuth.token_jwt);
    const [GymPlaces, setGymPlaces] = useState([]);
    const [membership, setMembership] = useState([]);


    useEffect(() => {
        const fetchData = () => {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            axios
                .get("http://18.141.56.154:8000/locations", { headers })
                .then((response) => {
                    setGymPlaces(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            axios
                .get("http://18.141.56.154:8000/admin/memberships", { headers })
                .then((response) => {
                    setMembership(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchData();
    }, [token]);

    const dataGymLength = GymPlaces.data ? GymPlaces.data.length : 0;
    console.log("Lokasi Gym:", dataGymLength);

    const dataMembershipLength = membership.data ? membership.data.length : 0;
    console.log("Membership:", dataMembershipLength);

    return (
        <>
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

                <div className="">
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

        </>
    )
}

export default Dashboard