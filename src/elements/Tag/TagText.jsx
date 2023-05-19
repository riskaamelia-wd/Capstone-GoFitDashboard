// import React from 'react'
import './Tag.css'
import { PropTypes } from 'prop-types';
import CloseIcon from '../../assets/icons/close-primary.svg';


const TagText = ({text, cancel}) => {
  return (
    <>
      <div className='tag tag-text'>
        <span>
          {text}
        </span>
        {
          cancel && (
            <img src={CloseIcon} alt="Close" className='icon icon-text'/>
          )
        }
      </div>        
    </>
  )
}

export default TagText

TagText.propTypes = {
  text: PropTypes.string,
  cancel: PropTypes.bool.isRequired
}