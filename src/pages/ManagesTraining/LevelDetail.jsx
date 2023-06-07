import Cover from "../../elements/Card/Cover";
import CardTraining from "../../elements/Card/CardTraining";
import abs from '../../assets/img/abs.svg'
import imgCover from '../../assets/icons/Appreciation 1.svg'
import { useNavigate, useParams } from "react-router-dom";
import add from '../../assets/icons/add.svg'
import AddTraining from "../../components/PopUp/AddTraining";
import { useSelector } from "react-redux";

const LevelDetail = () => {
    const navigate = useNavigate()
    const state = useParams()

    const data = useSelector((state) =>state.training)
    console.log(data);
    
    
    const dataCard = [
        {
            img:abs,
            text:'Abs'
        }, 
        {
            img:abs,
            text:'Arm'
        },
        {
            img:abs,
            text:'Leg'
        }
    ]

    return(
        <div className="container-fluid" style={{backgroundColor:'var(--Neutral-White-0)'}}>
            <Cover
                img={imgCover}
                text={'Training'}
                list1={'Home'}
                list2={state.level}
            />
            <div className="row mt-5 mb-5">
                {
                    data.length > 0 ? (
                        data?.map((data, id) =>{
                            return(
                                <div 
                                    key={id} 
                                    className="col-4 d-flex justify-content-center mb-5"
                                    style={{height:'51vh'}} 
                                >
                                    <CardTraining
                                        navigate={() => navigate('/workoutDetail', {state:{workout:data.text, level:level}})}
                                        img={data.imgFile}
                                        text={data.title}
                                    />
                                </div>
                            )
                        })
                    )
                    :
                    (
                        <p className="text-center mt-5">Belum ada data training yang tersedia</p>
                    )
                }
            </div>
            <div style={{position:'fixed', bottom:'5vw', right:'5vw'}}>
                <AddTraining
                    count={'0'}
                    imgBtn={add}
                    className={'btn rounded-circle bg-popUp p-3'}
                />
            </div>
        </div>
    )
}

export default LevelDetail