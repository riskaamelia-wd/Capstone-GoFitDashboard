import React, {useEffect, useState} from "react";
import Form from "../Modal/Form";
import useAxios from "../../api/UseAxios";
import { trainingApi } from "../../api/Api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import video from '../../assets/icons/videocam_gray.svg'
import add from '../../assets/icons/add.svg'

export default function VideoTraining({className, imgBtn, text}) {

    const location = useLocation()
    const state = location.state
    const param = useParams()
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [workout, setWorkout] = useState([])
    const [data, setData] = useState({
        video:null,
        title:'',
        description:''
    })

    const {response, isLoading} = useAxios({
        api: trainingApi,
        method: 'get',
        url:`/training/${param.id}/videoTraining/${param.idWorkout}`
    })

    useEffect(() => {
        if(param.idWorkout !== '' && param.idWorkout !== null && param.idWorkout !== undefined && response !== null){
            setData(response)
            setWorkout(response)
        }
    }, [response])

    const reset = () => {
        setData({
            video:null,
            title:'',
            description:''
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        if(name === "video"){
            const file = e.target.files[0];
            setData((data) => ({
                ...data,
                video: URL.createObjectURL(file)
            }));
        } else{
            setData({
                ...data, [name] : value
            })
        }
        console.log(data, ' data video training');
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(workout, ' wo');
        console.log(data, ' da');
        console.log(param.idWorkout, ' pa');
        if(window.confirm('Are you sure you want to submit?')){
            if (param.idWorkout !== undefined &&  (workout?.id === data?.id)){
                trainingApi.put(`/training/${param.id}/videoTraining/${param.idWorkout}`,{
                    title : data.title,
                    introduction:data.introduction,
                    imgFile : data.imgFile,
                    workout:data.workout,
                    duration: data.duration
                })
                .then((res) => {
                    navigate(`/levelDetail/${param.level}/${param.id}/workoutDetail`)
                    alert('edited')
                    window.location.reload()
                })
                .catch((err) => {
                    alert(err.message)
                    // window.location.reload()
                })
            } else {
                trainingApi.post(`/training/${param.id}/videoTraining`,{
                    video:data.video,
                    title:data.title,
                    description:data.description
                })
                .then((res) => {
                    // dispatch(addTraining(data))
                    alert('Added')
                    // setShow(false)
                    //get data
                    console.log(data);
                    window.location.reload()
                })
                .catch((err) => {
                    alert(err.message)
                })
            }
            reset()
        }
    }

    return(
        <>
            <Form 
                className={className} 
                imgBtn={imgBtn}
                text={text}
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
            />
        </>
    )
}