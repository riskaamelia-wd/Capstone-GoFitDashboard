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