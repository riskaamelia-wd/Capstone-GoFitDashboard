import './Card.css'

const ListMenu = ({img, judul, subJudul}) => {
    return(
        <div className='listMenu p-2 d-flex flex-row'>
            <img src={img} alt={judul} />
            <div className='ps-3 pe-3'>
            <p className="fs-3 m-0 fw-semibold">{judul}</p>
            <p className="m-0">{subJudul}</p>
            </div>
        </div>
    )
}

export default ListMenu