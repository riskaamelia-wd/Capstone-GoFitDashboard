// import React from 'react'
import './Tag.css'
import { PropTypes } from 'prop-types';
import CloseIcon from '../../assets/icons/close-white.svg';


const TagMonthSecondary = ({month, cancel}) => {
    return (
        <>
        <div className='tag tag-month-secondary'>
            <span>
            {month} month
            </span>
            {
            cancel && (
                <img src={CloseIcon} alt="Close" className='icon icon-month-secondary'/>
            )
            }
        </div>        
        </>
    )
}

export default TagMonthSecondary

TagMonthSecondary.propTypes = {
    month: PropTypes.string.isRequired,
    cancel: PropTypes.bool.isRequired
}