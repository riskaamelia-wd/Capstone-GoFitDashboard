import TagText from "../Tag/TagText"
import './Card.css'
const ListRecomended = ({img, text, icon, date, btn}) => {

    return(
        <div className="d-flex justify-content-between p-2">
            <div className="d-flex flex-row gap-3">
                <img src={img} style={{borderRadius:'15%'}} width={'60px'} alt="" />
                <div>
                    <p className="mb-1 fw-bolder">{text}</p>
                    {
                        date? 
                        <p>{date}</p> 
                        : 
                        <TagText
                            text={'Beginner'}
                        />
                    }
                </div>
            </div>
            {
                btn ?
                <button>{btn}</button>
                :
                <img src={icon} width={'20px'} className="deleteSvg" alt="" />
            }
        </div>
    )
}

export default ListRecomended