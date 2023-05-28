import './Card.css'

const CardTraining = ({img, text,className, classNameText, onClick}) => {

    return(
        <div className='card p-0 parentCardTraining' onClick={onClick}>
            <div className="p-0 cardTraining">
                <img 
                    src={img} 
                    className = {className? className : "rounded-top card-img-top"}
                />
            </div>
                <div className="card-body p-0 p-lg-3">
                    <p className={classNameText ? classNameText :'m-0 fs-3 fw-semibold'}>
                    {text}
                    </p>
                </div> 
        </div>
    )
}
export default CardTraining