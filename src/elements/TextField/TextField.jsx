
const TextField = ({className, label, type, name, id, onChange, value, placeholder, classNameLabel}) => {
    return(
        <>
            <label htmlFor={label} className={classNameLabel}>
                {label}
            </label> <br />
            <input 
                type={type} 
                name={name}
                id={id}
                placeholder={placeholder}                className={className}
                onChange={onChange}
                value={value}  
            />
        </>
    )
}

export default TextField

/*
penggunaan

    - JSX -

<TextField
    label='Name'
    placeholder='name'
    name='name'
    type='text'
    id='name'
    className='form-control borderInput'
    classNameDiv='bg-success'
/>

    - CSS -
    
.borderInput {
  border:1px solid var(--primary-500) !important;
}
*/