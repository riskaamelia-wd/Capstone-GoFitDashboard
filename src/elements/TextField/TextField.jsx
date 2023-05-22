import './TextField.css'

const TextField = ({label, type, name, id, onChange, value, placeholder, classNameLabel}) => {
    return(
        <>
            <label htmlFor={label} className={classNameLabel}>
                {label}
            </label> <br />
            <input 
                type={type} 
                name={name}
                id={id}
                placeholder={placeholder}                className='form-control borderInput col-12'
                onChange={onChange}
                value={value}  
            />
        </>
    )
}

export default TextField