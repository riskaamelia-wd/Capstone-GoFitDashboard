// import React from 'react'
import './Tag.css'
import { PropTypes } from 'prop-types';
import CloseIcon from '../../assets/icons/close-primary.svg';
import { useState } from 'react';


const TagText = ({ text }) => {
  const [showIcon, setShowIcon] = useState(false)

  const handleClik = () => {
    setShowIcon(!showIcon)
}

const handleClose = () => {
    setShowIcon(false)
}

  return (
    <> 
        <div 
            className={`tag tag-text`}
            onClick={handleClik}
            onMouseLeave={handleClose}>
            <span>
                {text}
            </span>
            {
                showIcon && (
                    <img src={CloseIcon} alt="Close" className={`icon icon-text`}/>
                )
            }
        </div>        
    </>
  )
}

export default TagText

TagText.propTypes = {
  text: PropTypes.string.isRequired
}