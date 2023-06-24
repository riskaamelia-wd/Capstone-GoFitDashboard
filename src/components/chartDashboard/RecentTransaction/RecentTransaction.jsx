import ikon_right from "../../../assets/img/ikon_right.svg"
import DataRecentTransaction from "./DataTransaction"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const RecentTransaction = () => {

    const token = useSelector((state) => state.tokenAuth.token_jwt);
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        axios.get('http://18.141.56.154:8000/admin/transactions', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response);
                setTransaction(response.data.data.slice(0, 4));
            })
            .catch((err) => {
                console.log(err);
            })
    }, [token])

    return (
        <div className="RecentTransaction" id="RecentTransaction">
            <div className="row mt-2">
                <div className="col-lg-8">
                    <p className="textRecent">Recent Transaction</p>
                </div>
                <div className="col-lg-3">
                    <Link to="/transaction" className="AllTransaction">
                        {/* navigate ke manage transaction */}
                        <span className="ViewAll">View all</span>
                        <img src={ikon_right} alt="View All" style={{ paddingLeft: "10px" }} />
                    </Link>
                    {/* <div className="AllTransaction">
                    </div> */}
                </div>
            </div>
            <div className="row">
                <DataRecentTransaction
                    transaction={transaction}
                />
            </div>
        </div>
    )
}

export default RecentTransaction