import Cover from "../../elements/Card/Cover";
import imgCover from '../../assets/icons/Appreciation 1.svg'
import ColumnChart from "../../components/Chart/ColumnChart"
import './ManagesTraining.css'
import { useEffect, useState } from "react";
import add from '../../assets/icons/add.svg'
import { useParams } from "react-router-dom";
import { trainingApi } from "../../api/Api";
import VideoTraining from "../../components/Form/VideoTraining";
import useFetch from "../../api/useFetch";
import Loading from "../../components/Loading";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../Config/FirebaseConfig';
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import axios from 'axios'

const WorkoutDetail = () => {
    const param = useParams()

    
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const [data, setData] = useState([]);
    const [workout, setWorkout] = useState([])
    const [error, setError] = useState('')
    const [maxData, setMaxData] = useState(0)
    const [fill, setFill] =useState(true)
    const [uploadingVideo, setUploadingVideo] = useState('')
    

    const dataColumnChart = [
        {
            name: 'Easy',
            data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43],
          }, {
            name: 'Usual',
            data: [13, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 27]
          }, {
            name: 'Exhausted',
            data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14]
          }
    ]

    const {response, isLoading, fetchData} = useFetch({
        api: trainingApi,
        method: 'get',
        url:`/training/${param.id}/videoTraining?category=${param.level}`
    })
    
    const [videoTraining, setVideoTraining] = useState({
        video:null,
        title:'',
        description:''
    })

    console.log(param.id);

    const [isDivDisabled, setIsDivDisabled] = useState(false)
    
    const handleFill=() => {
        setFill(prevFill => !prevFill)
    }

    const BtnFill = ({ className, onClick }) => {
        return(
            <button 
                onClick={onClick}
                className={className}>
            </button>
        )
    }
    useEffect(() => {
        if(response !== null){
            setData(response)
            setMaxData(response?.[0]?.category?.workout)
            if (data?.length >= maxData){
                setIsDivDisabled(true)
                setError('the data has reached the limit')
            } else {
                setError('')
                setIsDivDisabled(false)
            }
        }
    }, [response, isDivDisabled, data])

    const handleClose = () => {
        setShow(false);
        setVideoTraining({
            video:null,
            title:'',
            description:''
        });
        setId(null);
    };
    const finder = data.find(item => item.id === id)
    const onSubmitHandle = async (e) => {
        e.preventDefault();
        const body = {
            video: videoTraining.video,
            title: videoTraining.title,
            description: videoTraining.description,
        };
        if(window.confirm('Are you sure you want to submit?')){
            if(finder){
                await axios
                .put(`https://647612b1e607ba4797dd420e.mockapi.io/training/${param.id}/videoTraining/${id}`, body)
                .then(() => {
                    window.location.reload()
                    alert("Data edited successfully");
                    setVideoTraining({
                        video:null,
                        title:'',
                        description:''
                    });
                    handleClose();
                    fetchData();
                })
                .catch((err) => {
                    console.log(err);
                });
            } else {
                await axios
                .post(`https://647612b1e607ba4797dd420e.mockapi.io/training/${param.id}/videoTraining`, body)
                .then(() => {
                    window.location.reload()
                    alert("Data added successfully");
                    
                    setVideoTraining({
                        video:null,
                        title:'',
                        description:''
                    });
                    handleClose()
                    fetchData();
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        };
    }

    const combinedArray = data.concat(workout);
    const generalView = () => {
        return(
            <>
                {data?.length > 0 ? (
                    data?.map((data, id) => {
                        return(
                            <tr key={id}>
                                <td>
                                    <BtnFill
                                        className={fill? "notFillBox" : 'fillBox'}
                                        disabled={true}
                                        onClick={handleFill}
                                    />
                                </td>
                                <td>{data.title}</td>
                                <td>{data.click}</td>
                                <td>{data.previous}</td>
                                <td>{data.next}</td>
                                <td>{data.skipRest}</td>
                                <td>
                                    <div
                                        onClick={() => {
                                            setShow(true)
                                            setId(data.id)
                                            console.log(data.id, ' set id');
                                            setVideoTraining({
                                                video:data?.video,
                                                title:data?.title,
                                                description:data?.description
                                            })
                                        }}>
                                            
                            <div className="d-flex flex-row mb-3">
                                <ButtonComponent
                                    className={
                                        "link-underline"
                                    }
                                    id={"addVideoTraining"}
                                    onClick={() => {
                                    setShow(true);
                                    }}
                                    imgClassName={'ps-2'}
                                    buttonName={"Edit"}
                                />
                            </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                )
                :
                (
                    <tr><td colSpan={7} className="text-center">No data available</td></tr>
                )}

                <VideoTraining
                    show={show}
                    uploadingVideo={uploadingVideo}
                    handleClose={handleClose}
                    videoValue={videoTraining?.video}
                    descriptionValue={videoTraining?.description}
                    description={(e) => {
                        setVideoTraining((filledState) => ({
                            ...filledState,
                            description: e.target.value,
                        }));
                    }}
                    title={(e) => {
                        setVideoTraining((filledState) => ({
                            ...filledState,
                            title: e.target.value,
                        }));
                    }}
                    titleValue={videoTraining?.title}
                    videoChange={(e) => {
                        let videoFile = e.target.files[0];
                        if(videoFile && videoFile.type.match('video/*')){
                            const storageRef = ref(storage, `/files/${videoFile.name}`)
                            const uploadImg = uploadBytesResumable(storageRef, videoFile)
                            uploadImg.on(
                                'state_Changed',
                                (snapshot) => {
                                    const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                                    setUploadingVideo(percent)
                                },
                                (err) => {
                                    console.log(err.message);
                                },
                                () => {
                                    getDownloadURL(uploadImg.snapshot.ref)
                                    .then(url =>{
                                        setVideoTraining((filledState) => ({
                                            ...filledState,
                                            video: url,
                                        }));
                                        setUploadingVideo(0)
                                    }) 
                                    .catch(err => {
                                        console.log(err.message);
                                    })
                                }
                            )
                        } else {
                            alert('please select an video file ( mp4, webm, m4v )')
                            e.target.value = null
                            videoFile = e.target.value
                        }
                    }}
                    onSubmitHandle={onSubmitHandle}
                />
            </>
        )
    }
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
                        {error && <small className="text-danger mt-2">{error}</small>}
                        <div 
                        style={{pointerEvents : isDivDisabled ? 'none' : 'auto'}}
                        >
                            
                            <div className="d-flex flex-row mb-3">
                                <ButtonComponent
                                    className={
                                        "add"
                                    }
                                    id={"addPackage"}
                                    onClick={() => {
                                    setShow(true);
                                    }}
                                    imgUrlEnd={add}
                                />
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <thead className="border-top border-bottom">
                            <tr>
                                <th><BtnFill
                                    className={fill? "notFillBox" : 'fillBox'}
                                    onClick={handleFill}
                                /></th>
                                <th>Name</th>
                                <th>Click</th>
                                <th>Previous</th>
                                <th>Next</th>
                                <th>Skip Rest</th>
                                <th>Video</th>
                            </tr>
                        </thead>
                        <tbody>
                            { isLoading ?
                                <Loading />
                                : 
                                generalView()
                            }
                        </tbody>
                    </table>
                </div>
            </div>   
        </div>
    )
}

export default WorkoutDetail