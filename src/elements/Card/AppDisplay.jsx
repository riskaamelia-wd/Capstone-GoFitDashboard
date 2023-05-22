import './Card.css'

const AppDisplay = ({img, judul, subJudul}) => {
    return(
        <div className="appDisplay p-2">
            <img className="rounded-circle" width={'80vw'} src={img} alt={judul} />
            <p className="fs-4 m-0 fw-semibold" style={{color:'var(--primary-600)'}}>{judul}</p>
            <p className="fs-5 m-0" style={{color:'var(--primary-900'}}>{subJudul}</p>
        </div>
    )
}

export default AppDisplay