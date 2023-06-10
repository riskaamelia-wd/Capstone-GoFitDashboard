import Cover from "../../elements/Card/Cover";
import CardTraining from "../../elements/Card/CardTraining";
import abs from '../../assets/img/abs.svg'
import imgCover from '../../assets/icons/Appreciation 1.svg'
import { useNavigate, useParams } from "react-router-dom";
import add from '../../assets/icons/add.svg'
import AddTraining from "../../components/Form/Training";
import { useSelector } from "react-redux";
import { classApi, trainingApi } from "../../api/Api";
import useAxios from "../../api/UseAxios";
import { useEffect, useState } from "react";
import axios from "axios";

const LevelDetail = () => {
    const navigate = useNavigate()
    const state = useParams()

    const { response, isLoading } = useAxios({
        api: trainingApi,
        method: 'get',
        url: `/training?category=${state.level}`,
    });

    console.log(response);

    const training = useSelector((state) =>state.training)
    const [data, setData] = useState([])


    useEffect(() => {
        if(response !== null){
            setData(response)
        }
    },[response])

    
    const handleDelete = async (id) => {
        try{
            if (window.confirm('Are you sure you want to delete?')) {
                await axios.delete(`https://647612b1e607ba4797dd420e.mockapi.io/training/${id}`);
                setData((prevClasses) =>
                  prevClasses.filter((onlineClass) => onlineClass.id !== id)
                );
                console.log('Data deleted successfully');
              }
            } catch (error) {
              console.log(error);
            }
    }

    const handleEdit= (id) => {
        console.log(id,' id');
        navigate(`/levelDetail/${state.level}/${id}`
        ,
        {state:{
            data:id,
            level:state.level
        }}
        )
    }
    const combinedArray = data.concat(training);

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
                    combinedArray?.length > 0 ? (
                        combinedArray?.map((data, id) =>{
                            return(
                                <div 
                                    key={id}
                                    className="col-md-4 col-12"
                                >
                                    <CardTraining
                                        navigate={() => 
                                            navigate(`/levelDetail/${state.level}/${data.id}/workoutDetail`, 
                                        {state:{
                                            workout:data.title,
                                            level:state.level
                                        }})}
                                        img={data.imgFile}
                                        text={data.title}
                                        onDelete={() => handleDelete(data.id)}
                                        onEdit={() => handleEdit(data.id)}
                                    />
                                </div>
                            )
                        })
                    )
                    :
                    (
                        <p className="text-center mt-5">No data available</p>
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