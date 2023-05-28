import { useState } from "react"

const ButtonEditDelete = () => {
    const [show, setShow] =useState(false)
    const handleClickBtn=() => {
        setShow(prevShow => !prevShow)
    }
    return(
        <div className="p-0 d-flex align-items-end flex-column" style={{width:'130px'}}>
            <button onClick={handleClickBtn} style={{textDecoration:'none', color:'black'}} className="btn btn-link">{show? '...':'...'}</button>
            {
                show && (
                <div className="" style={{ width:'100%', backgroundColor:'var(--Neutral-White-100)'}}>
                    <p className="ps-2 m-2 mb-2" >hai</p>
                    <p className=" ps-2 m-2" style={{color:'red'}}>Delete</p>
                </div>
                )
            }
        </div>
    )
}

export default ButtonEditDelete