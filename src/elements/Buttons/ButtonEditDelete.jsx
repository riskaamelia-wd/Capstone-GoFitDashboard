import { useState } from "react"

const ButtonEditDelete = ({handleEdit, handleDelete}) => {
    const [show, setShow] =useState(false)
    const handleClickBtn=() => {
        setShow(prevShow => !prevShow)
    }
    return(
        <div className="p-0 d-flex align-items-end flex-column" style={{width:'130px'}}>
            <button onClick={handleClickBtn} style={{textDecoration:'none', color:'white'}} className="btn btn-link fw-bolder fs-3">{show? '. . .':'. . .'}</button>
            {
                show && (
                <div className="" style={{ width:'100%', backgroundColor:'var(--Neutral-White-100)'}}>
                    <p style={{cursor:'pointer'}} className="ps-2 m-2 mb-2" onClick={handleEdit}>Edit</p>
                    <p className=" ps-2 m-2" onClick={handleDelete} style={{color:'red', cursor:'pointer'}}>Delete</p>
                </div>
                )
            }
        </div>
    )
}

export default ButtonEditDelete