const CardTraining = ({img, text,className, classNameText, styleImg}) => {

    return(
        <div className="card p-0">
        <img 
            src={img} 
            className = {className? className : "rounded-top card-img-top"}
            style={styleImg? styleImg : {maxWidth:'100%'}}
        />
        <div className="card-body">
            <p className={classNameText ? classNameText :'m-0 fs-3 fw-semibold'}>
            {text}
            </p>
        </div> 
        </div>
    )
}
export default CardTraining