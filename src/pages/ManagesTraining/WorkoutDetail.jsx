import Cover from "../../elements/Card/Cover";
import imgCover from '../../assets/icons/Appreciation 1.svg'
import ColumnChart from "../../components/Chart/ColumnChart"
import './ManagesTraining.css'
import Textarea from "../../elements/TextField/Textarea";
import { useEffect, useState } from "react";
import AddLess from "../../components/AddLess/AddLess";
import check from '../../assets/icons/check_success.svg'
import trash from '../../assets/icons/delete_danger.svg'
import PopUp from "../../components/Form/VideoTraining";
import video from '../../assets/icons/videocam_gray.svg'
import add from '../../assets/icons/add.svg'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../api/UseAxios";
import { trainingApi } from "../../api/Api";
import VideoTraining from "../../components/Form/VideoTraining";

const WorkoutDetail = () => {
    const location = useLocation()
    const state = location.state
    const param = useParams()
    const navigate = useNavigate()

    
     const [workout, setWorkout] = useState([])
    //  const workout = useSelector((state) =>state.training)
    // const textareaCount = data.description.length

    const dataColumnChart = [
        {
            name: 'Easy',
            data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43]
          }, {
            name: 'Usual',
            data: [13, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 27]
          }, {
            name: 'Exhausted',
            data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14]
          }
    ]

    const {response, isLoading} = useAxios({
        api: trainingApi,
        method: 'get',
        url:`/training/${param.id}/videoTraining?category=${param.level}`
    })
    console.log(response, ' response workout');

    
    const [data, setData] = useState([])
    useEffect(() => { 
        if(response !== null){
            setData(response)
        }
    }, [response])

    

    const handleEditVideo= (idWorkout) => {
        console.log(idWorkout,' id');
        navigate(`/levelDetail/${param.level}/${param.id}/workoutDetail/${idWorkout}`
        ,
        {state:{
            idWorkout:idWorkout,
            level:param.level
        }}
        )
    }

    const combinedArray = data.concat(workout);
    // const combinedArray = workout ? data.concat(workout) : data;
    // let combinedArray;

    // if (Array.isArray(data) && Array.isArray(workout)) {
    //   combinedArray = data.concat(workout);
    // } else if (Array.isArray(data)) {
    //   combinedArray = data;
    // } else if (Array.isArray(workout)) {
    //   combinedArray = workout;
    // } else {
    //   combinedArray = [];
    // }

    return(
        <div className="container-fluid">
            <Cover
                img={imgCover}
                text={'Training'}
                list1={'Home'}
                list2={param.level}
                list3={data[0]?.category.title}
            />
            <ColumnChart
                series={dataColumnChart}
            /> 
            <div className="workoutDetailData row d-flex justify-content-around">
                <div className="col-11 mt-5">
                    <div className="d-flex flex-row justify-content-between add">
                        <p className="fs-2 fw-bold">                                
                        <td>{data[0]?.category.title} {param.level}</td>
                        </p>
                        <VideoTraining
                            imgBtn={add}
                            className={'add'}
                        />
                        {/* <PopUp 
                            className={'add'} 
                            imgBtn={add}
                            idImg={'video'}
                            nameImg={'video'}
                            textImg={'Input Video'}
                            inputImg={video}
                            nameInput={'title'}
                            idInput={'title'}
                            placeholderInput={'Arm Cirles'}
                            idTextarea={'description'}
                            nameTextarea={'description'}
                            placeholderTextarea={'Detail Workout'}
                            maxLength={200}
                            // count={`${textareaCount} / 200 word`}
                            valueInput={data.title}
                            valueImg={data.video}
                            valueTextarea={data.description}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        /> */}
                        {/* <img src={add} width={'14px'} className="me-5" alt="" /> */}
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th><input type="checkbox"/></th>
                                <th>Name</th>
                                <th>Click</th>
                                <th>Previous</th>
                                <th>Next</th>
                                <th>Skip Rest</th>
                                <th>Video</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.length > 0 ? (
                                    data?.map((data, id) => {
                                        return(
                                            <tr key={id}>
                                                <td><input type="checkbox"/></td>
                                                <td>{data.title}</td>
                                                <td>{data.click}</td>
                                                <td>{data.previous}</td>
                                                <td>{data.next}</td>
                                                <td>{data.skipRest}</td>
                                                <td><div onClick={()=>handleEditVideo(data.id)}>
                                                    <VideoTraining
                                                        text={'Edit'}
                                                        className={'link-underline'}
                                                    />
                                                        {/* <PopUp 
                                                        className={'link-underline'} 
                                                        text={'Edit'}
                                                        textImg={'Input Video'}
                                                        inputImg={video}
                                                        nameInput={'title'}
                                                        idInput={'title'}
                                                        placeholderInput={'Arm Cirles'}
                                                        idTextarea={'description'}
                                                        nameTextarea={'description'}
                                                        placeholderTextarea={'Detail Workout'}
                                                        maxLength={200}
                                                        // count={`${textareaCount} / 200 word`}
                                                        valueInput={data.title}
                                                        valueImg={data.video}
                                                        valueTextarea={data.description}
                                                        onChange={handleChange}
                                                        onSubmit={handleSubmit}
                                                    /> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                                :
                                (
                                    <tr><td colSpan={7} className="text-center">No data available</td></tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>   
        </div>
    )
}

export default WorkoutDetail