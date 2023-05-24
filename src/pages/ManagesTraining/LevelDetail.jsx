import Cover from "../../elements/Card/Cover";
import CardTraining from "../../elements/Card/CardTraining";
import PopUp from "../../components/PopUp/PopUp";
import abs from '../../assets/img/abs.svg'
import imgCover from '../../assets/icons/Appreciation 1.svg'
import { useNavigate } from "react-router-dom";
import add from '../../assets/icons/add.svg'

const LevelDetail = () => {
    const navigate = useNavigate()
    return(
        <div className="container-fluid" style={{backgroundColor:'var(--Neutral-White-0)'}}>
            <Cover
                img={imgCover}
                text={'Training'}
                list1={'Home'}
                list2={'Advanced'}
            />
            <div className="d-flex flex-row row  mt-5 mb-5">
                <div className="col-4 d-flex justify-content-center mb-5" onClick={()=>navigate('/workoutDetail')}>
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5" onClick={()=>navigate('/workoutDetail')}>
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5" onClick={()=>navigate('/workoutDetail')}>
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
                <div className="col-4 d-flex justify-content-center mb-5" onClick={()=>navigate('/workoutDetail')}>
                    <CardTraining
                        img={abs}
                        text={'Abs'}
                    />
                </div>
            </div>
            <div style={{position:'fixed', bottom:'5vw', right:'5vw'}}>
                <PopUp
                    imgBtn={add}
                    className={'btn rounded-circle bg-popUp p-3'}
                />
            </div>
        </div>
    )
}

export default LevelDetail