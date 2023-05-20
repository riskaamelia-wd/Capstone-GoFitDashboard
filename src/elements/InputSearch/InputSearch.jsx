import '../InputSearch/InputSearch.css';
import search from "../../assets/icons/search.svg";

// eslint-disable-next-line react/prop-types
const InputSearch = ({type, name, id, onChange, value, placeholder}) => {
    return(
        <>
            <div className="search-container">
                <img src={search} className='icon-search'/>
                <input 
                    type={type} 
                    name={name}
                    id={id}
                    placeholder={placeholder}                
                    className = "search"
                    onChange={onChange}
                    value={value}  
                />
            </div>
        </>
    )
}

export default InputSearch