// import React from 'react'
import './Tag.css'
import { PropTypes } from 'prop-types';
import CloseIcon from '../../assets/icons/close-primary-500.svg';


const TagYear = ({year, cancel}) => {
    return (
        <>
        <div className='tag tag-year'>
            <span>
            {year} Year
            </span>
            {
            cancel && (
                <img src={CloseIcon} alt="Close" className='icon icon-year'/>
            )
            }
        </div>        
        </>
    )
}

export default TagYear

TagYear.propTypes = {
    year: PropTypes.string.isRequired,
    cancel: PropTypes.bool.isRequired
}