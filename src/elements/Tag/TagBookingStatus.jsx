import { PropTypes } from 'prop-types';
import './Tag.css'

const TagBookingStatus = ({status}) => {
    
    return (
        <> 
            <div className={`tag tag-${status == 'booked'? 'booked': 'booking-canceled'}`}>
                <span>
                    {status == 'booked'? 'Booked' : 'Booking canceled'}
                </span>
            </div>        
        </>
    )
}

export default TagBookingStatus

TagBookingStatus.propTypes = {
    status: PropTypes.string.isRequired
}