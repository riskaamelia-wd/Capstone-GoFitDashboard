import '../InputSearch/InputSearch.css';
import search from "../../assets/icons/search.svg";

const InputSearch = ({type, name, id, onChange, value, placeholder, width, height}) => {
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
                    style={{ width: `${width}px`, height: `${height}px` }}
                    onChange={onChange}
                    value={value}  
                />
            </div>
        </>
    )
}

export default InputSearch

/* 
Cara Penggunaan
    <InputSearch
        placeholder="Search..."
        width={500}
        height={30}
    />
*/