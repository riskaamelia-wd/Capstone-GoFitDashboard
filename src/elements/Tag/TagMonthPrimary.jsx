// import React from 'react'
import './Tag.css'
import { PropTypes } from 'prop-types';
import CloseIcon from '../../assets/icons/close-pending.svg';


const TagMonthPrimary = ({month, cancel}) => {
    return (
        <>
        <div className='tag tag-month'>
            <span>
            {month} month
            </span>
            {
            cancel && (
                <img src={CloseIcon} alt="Close" className='icon icon-month'/>
            )
            }
        </div>        
        </>
    )
}

export default TagMonthPrimary

TagMonthPrimary.propTypes = {
    month: PropTypes.string.isRequired,
    cancel: PropTypes.bool.isRequired
}