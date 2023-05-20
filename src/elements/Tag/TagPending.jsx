// import React from 'react'
import './Tag.css'
import { PropTypes } from 'prop-types';
import CloseIcon from '../../assets/icons/close-pending.svg';


const TagPending = ({cancel}) => {
    return (
        <>
        <div className='tag tag-pending'>
            <span>
            Pending
            </span>
            {
            cancel && (
                <img src={CloseIcon} alt="Close" className='icon icon-pending'/>
            )
            }
        </div>        
        </>
    )
}

export default TagPending

TagPending.propTypes = {
    cancel: PropTypes.bool.isRequired
}