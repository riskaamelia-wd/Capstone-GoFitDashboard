

const AddLess = ({increment, decrement, qty}) => {
    return(
        <div className="d-flex flex-row">
            <button className="rounded p-0 fw-bolder d-flex justify-content-center  align-items-center mt-1" style={{ height:'20px',
                width:'20px',border:'none', backgroundColor:'var(--primary-200)', color:'var(--primary-600'
            }}
             onClick={decrement}
            >
                -
            </button>
            <p className="rounded ms-1 me-1 text-center mb-0 border" style={{height:'30px', width:'30px'}}>{qty}</p>
            <button             className="p-0  rounded fw-bolder d-flex justify-content-center align-items-center mt-1" style={{
                width:'20px',height:'20px',
                border:'none', backgroundColor:'var(--primary-200)', 
                color:'var(--primary-600'}}
                onClick={increment}
            >
                +
            </button>
        </div>
    )
}

export default AddLess