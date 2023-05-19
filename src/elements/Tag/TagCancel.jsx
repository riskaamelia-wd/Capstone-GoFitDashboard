// import React from 'react'
import './Tag.css'
import { PropTypes } from 'prop-types';
import CloseIcon from '../../assets/icons/close-cancel.svg';


const TagCancel = ({cancel}) => {
    return (
        <>
        <div className='tag tag-cancel'>
            <span>
            Cancel
            </span>
            {
            cancel && (
                <img src={CloseIcon} alt="Close" className='icon icon-cancel'/>
            )
            }
        </div>        
        </>
    )
}

export default TagCancel

TagCancel.propTypes = {
    cancel: PropTypes.bool.isRequired
}