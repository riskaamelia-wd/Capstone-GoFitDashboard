import React, { useState } from 'react';
import '../InputSearch/InputSearch.css';
import search from "../../assets/icons/search.svg";

const SearchTopBar = ({ type, name, id, onChange, value, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleIconClick = () => {
    setIsVisible(true);
  };

  return (
    <>
      <div className="search-container">
        <img src={search} className='icon-search' onClick={handleIconClick} />
        {isVisible && (
          <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            className="search"
            onChange={onChange}
            value={value}
          />
        )}
      </div>
    </>
  );
};

export default SearchTopBar;
