import income from "../../../assets/img/Income.svg"

const DataRecentTransaction = ({ transaction }) => {
   
    //function convert date dari bentuk dd/mm/yyyy ke mount date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate;
    }

    //function convert waktu dari 24 jam ke AM/PM
    function formatTime(dateString) {
        const date = new Date(dateString);
        const options = { hour: 'numeric', minute: 'numeric' };
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedTime;
    }

    return (
        <>
            {
                transaction.map((transaction) => {
                    return (
                        <div className="DataTransaction mt-1" id="DataTransaction">
                            <div className="row">
                                <div className="col-lg-2 col-sm-2">
                                    <img src={income} alt="" />
                                </div>
                                <div className="col-lg-5 col-sm-5">
                                    <span className="CostTransaction">+{transaction.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                    <p className="CostMember">{transaction.product}</p>
                                </div>
                                <div className="col-lg-5 col-sm-5" style={{ paddingLeft: "20%" }}>
                                    <span className="CostDate">{formatDate(transaction.metadata.updated_at)}</span>
                                    <p className="CostDate">{formatTime(transaction.metadata.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );

}

export default DataRecentTransaction