import ikon_right from "../../../assets/img/ikon_right.svg"
import DataRecentTransaction from "./DataTransaction"
import income from "../../../assets/img/Income.svg"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const RecentTransaction = () => {

    const token = useSelector((state) => state.tokenAuth.token_jwt);
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        axios
            .get("http://18.141.56.154:8000/admin/classes/tickets", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setTransaction(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);

    return (
        <div className="RecentTransaction" id="RecentTransaction">
            <div className="row mt-2">
                <div className="col-lg-8">
                    <p className="textRecent">Recent Transaction</p>
                </div>
                <div className="col-lg-3">
                    <Link to="/ManageTransaction" className="AllTransaction">
                        {/* navigate ke manage transaction */}
                        <span className="ViewAll">View all</span>
                        <img src={ikon_right} alt="View All" style={{paddingLeft:"10px"}}/>
                    </Link>
                    {/* <div className="AllTransaction">
                    </div> */}
                </div>
            </div>
            <div className="row">
                <DataRecentTransaction 
                    img={income}
                    costTransaction={"+Rp.150.000"}
                    costMember={"David Gunawan"}
                    costDate={"23 June"}
                    costTime={"08:00 AM"}
                />
                <DataRecentTransaction 
                    img={income}
                    costTransaction={"+Rp.150.000"}
                    costMember={"David Gunawan"}
                    costDate={"23 June"}
                    costTime={"08:00 AM"}
                />
                <DataRecentTransaction 
                    img={income}
                    costTransaction={"+Rp.150.000"}
                    costMember={"David Gunawan"}
                    costDate={"23 June"}
                    costTime={"08:00 AM"}
                />
            </div>
        </div>
    )
}

export default RecentTransaction