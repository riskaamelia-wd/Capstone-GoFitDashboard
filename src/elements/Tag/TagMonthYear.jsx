// import React from 'react'
import './Tag.css'
import { PropTypes } from 'prop-types';
import { useState } from 'react';
// import CloseIconPending from '../../assets/icons/close-pending.svg'; //1month
// import CloseIconPrimary from '../../assets/icons/close-primary-500.svg'; //1year
// import CloseIconSecondary from '../../assets/icons/close-white.svg'; //3month

const TagMonthYear = ({ duration }) => {
    const [showIcon, setShowIcon] = useState(false)
    // const CloseIcon = {
    //     oneMonth: CloseIconPending,
    //     threeMonth: CloseIconSecondary,
    //     oneYear: CloseIconPrimary
    // }

    const handleClik = () => {
        setShowIcon(!showIcon)
    }

    const handleClose = () => {
        setShowIcon(false)
    }

    return (
        <>
            {duration === '1 month' && (
                <>
                    <div
                        className={`tag tag-month`}
                        onClick={handleClik}
                        onMouseLeave={handleClose}
                    >
                        <span>{duration}</span>
                        {/* {showIcon && (
                        <img src={CloseIcon.oneMonth} alt="Close" className={`icon icon-month`} />
                        )} */}
                    </div>
                </>
                )
            }
            {
                duration == '3 month' && (
                    <>
                        <div
                            className={`tag tag-month-secondary`}
                            onClick={handleClik}
                            onMouseLeave={handleClose}
                        >
                            <span>{duration}</span>
                            {/* {showIcon && (
                            <img src={CloseIcon.threeMonth} alt="Close" className={`icon icon-month-secondary`} />
                            )} */}
                        </div>
                    </>
                )
            }
            {
                duration == '1 year' && (
                    <>
                        <div
                            className={`tag tag-year`}
                            onClick={handleClik}
                            onMouseLeave={handleClose}
                        >
                            <span>{duration}</span>
                            {/* {showIcon && (
                            <img src={CloseIcon.oneYear} alt="Close" className={`icon icon-year`} />
                            )} */}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default TagMonthYear

TagMonthYear.propTypes = {
    duration: PropTypes.string.isRequired,
}