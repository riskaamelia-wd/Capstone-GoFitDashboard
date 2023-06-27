/* eslint-disable react/prop-types */
import './Tag.css'

const TagRole = ({role}) => {
    
    return (
        <> 
            <div className={`tag tag-${role}`}>
                <span>
                    {role}
                </span>
            </div>        
        </>
    )
}

export default TagRole