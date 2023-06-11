import './TextField.css'

const TextField = ({label, type, name, id, onChange, value, placeholder,classNameInput, classNameLabel, defaultValue}) => {
    return(
        <>
            <label htmlFor={name} className={classNameLabel}>
                {label}
            </label> <br />
            <input 
                type={type} 
                name={name}
                id={id}
                placeholder={placeholder}                className={
                    `${classNameInput} form-control borderInput col-12`
                }
                onChange={onChange}
                value={value}  
                defaultValue={defaultValue}
            />
        </>
    )
}

export default TextField