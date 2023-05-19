// import React from 'react'
import './Tag.css'
import { PropTypes } from 'prop-types';
import CloseIcon from '../../assets/icons/close-done.svg';


const TagDone = ({cancel}) => {
    return (
        <>
        <div className='tag tag-done'>
            <span>
            Done
            </span>
            {
            cancel && (
                <img src={CloseIcon} alt="Close" className='icon icon-done'/>
            )
            }
        </div>        
        </>
    )
}

export default TagDone

TagDone.propTypes = {
    cancel: PropTypes.bool.isRequired
}