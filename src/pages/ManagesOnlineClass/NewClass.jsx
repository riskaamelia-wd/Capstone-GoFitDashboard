import Cover from "../../elements/Card/Cover"
import imgCover from '../../assets/icons/Appreciation 1.svg'
import CardTraining from "../../elements/Card/CardTraining"
import abs from '../../assets/img/abs.svg'
import PopUp from "../../components/PopUp/PopUp"
import add from '../../assets/icons/add.svg'
import './OnlineClass.css'
import { useNavigate } from "react-router-dom"

const NewClass = () => {
    const navigate = useNavigate()

    return(
        <>
            <Cover
                text={'Manage Online Class'}
                list1={'Home'}
                list3={'New Class'}
                img={imgCover}
            />
            <div className='d-flex flex-row justify-content-around mt-5 mb-5'>
                <div className="mb-5" onClick={()=> navigate('/DataClass')}>
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="mb-5" onClick={()=> navigate('/DataClass')}>
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="mb-5" onClick={()=> navigate('/DataClass')}>
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
            </div>
            <div style={{position:'fixed', bottom:'5vw', right:'5vw'}}>
                <PopUp
                    imgBtn={add}
                    className={'btn rounded-circle popUp p-3'}
                />
            </div>
        </>
    )
}

export default NewClass