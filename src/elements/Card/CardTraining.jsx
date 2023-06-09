import './Card.css'
import PopUpNewClass from "../../components/Form/Training"
import { useState } from 'react'

const CardTraining = ({img, text,className, classNameText, navigate, onDelete}) => {
    
    const [show, setShow] =useState(false)
    const handleClickBtn=() => {
        setShow(prevShow => !prevShow)
    }

    return(
        <>
         <div className="z-0 position-absolute">
            <div 
                style={{
                    zIndex:'3', 
                    position:'absolute', 
                    right:'0',
                    borderRadius:'5px'
                }}>
            <div 
                className="d-flex flex-column" 
                style={{width:'129px'}}
            >
                <button 
                    onClick={handleClickBtn} 
                    style={{
                        textDecoration:'none', 
                        color:'white',
                        width:'100%',
                    }} 
                    className="btn radius text-end btn-link fs-4 fw-bold text-hover"
                    >
                    {show? '...':'...'}
                </button>
                {
                    show && (
                    <div 
                        style={{ 
                            width:'100%', backgroundColor:'var(--Neutral-White-100)'
                        }}
                    >
                        <PopUpNewClass
                            text={'Edit'}
                            title={'Edit Folder'}
                            className={'btn btn-link pe-5 text-decoration-none text-black fw-semibold'}
                        />
                        <p className=" ps-3 p-2 mb-1 cursor fw-semibold" style={{color:'red'}} onClick={onDelete}>Delete</p>
                    </div>
                    )
                }
            </div>
            </div>
            <div 
                className='card p-0 parentCardTraining'
                
                onClick={navigate}>
                <div className="p-0 cardTraining">
                    <img 
                        src={img} 
                        className = {className? className : "rounded-top card-img-top"}
                        style={{height:'42vh'}}
                    />
                </div>
                    <div className="card-body p-1 p-lg-3">
                        <p className={classNameText ? classNameText :'m-0 fs-3 fw-semibold'}>
                        {text}
                        </p>
                    </div> 
                </div>
            </div>
        </>
    )
}
export default CardTraining