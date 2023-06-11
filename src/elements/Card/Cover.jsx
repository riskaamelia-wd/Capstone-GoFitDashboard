const Cover = ({list2, list3, text, list1, img}) => {
    return(
        <div className="d-flex justify-content-between rounded-4 p-4 flex-row" style={{backgroundColor:'#FFDB99'}}>
            <div>
                <p className="fs-2 fw-semibold m-0" style={{color:'var(--primary-900)'}}>{text}</p>
                <div className="d-flex flex-row fs-4">
                    <p>{list1}</p>
                    <ul className="d-flex flex-row ">
                        {
                            list2 ?
                            <li className="me-4">{list2}</li>
                            :
                            <p></p>

                        }{
                            list3 ?
                            <li className="ms-2">{list3}</li>
                            :
                            <p></p>
                        }
                    </ul>
                </div>
            </div>
            <img src={img} width={'90vh'} alt={text} />
        </div>
    )
}

export default Cover