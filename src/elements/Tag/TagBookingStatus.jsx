import { PropTypes } from 'prop-types';
import './Tag.css'

const TagBookingStatus = ({status}) => {
    
    return (
        <> 
            <div className={`tag tag-${status}`}>
                <span>
                    {status}
                </span>
            </div>        
        </>
    )
}

export default TagBookingStatus

TagBookingStatus.propTypes = {
    status: PropTypes.string.isRequired
}