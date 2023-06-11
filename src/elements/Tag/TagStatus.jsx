import { useState } from 'react'
import { PropTypes } from 'prop-types';
// import CloseIconDone from '../../assets/icons/close-done.svg';
// import CloseIconPending from '../../assets/icons/close-pending.svg';
// import CloseIconCancel from '../../assets/icons/close-cancel.svg';
import './Tag.css'

const TagStatus = ({status}) => {
    const [showIcon, setShowIcon] = useState(false)
    // const CloseIcon = {
    //     done: CloseIconDone,
    //     pending: CloseIconPending,
    //     cancel: CloseIconCancel
    // }

    const handleClik = () => {
        setShowIcon(!showIcon)
    }

    const handleClose = () => {
        setShowIcon(false)
    }
    
    return (
        <> 
            <div 
                className={`tag tag-${status}`}
                onClick={handleClik}
                onMouseLeave={handleClose}>
                <span>
                    {status}
                </span>
                {/* {
                    showIcon && (
                        <img src={CloseIcon[status]} alt="Close" className={`icon icon-${status}`}/>
                    )
                } */}
            </div>        
        </>
    )
}

export default TagStatus

TagStatus.propTypes = {
    status: PropTypes.string
}