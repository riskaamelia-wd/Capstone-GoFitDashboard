import Cover from "../../elements/Card/Cover";
import CardTraining from "../../elements/Card/CardTraining";
import imgCover from "../../assets/icons/Appreciation 1.svg";
import { useNavigate, useParams } from "react-router-dom";
import add from "../../assets/icons/add.svg";
import {trainingApi } from "../../api/Api";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from '../../api/useFetch'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../Config/FirebaseConfig';
import Loading from "../../components/Loading";
import ButtonComponent from "../../elements/Buttons/ButtonComponent";
import Training from "../../components/Form/Training";


const LevelDetail = () => {
  const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const [data, setData] = useState([]);
    const state = useParams();
    const [uploadingImg, setUploadingImg] = useState(0)
    const [training, setTraining] = useState({
      title : '',
      introduction:'',
      imgFile : null,
      workout:0,
      duration:0,
      category:state.level
    })
    let countText = training.introduction.length
    const { response, isLoading, fetchData } = useFetch({
        api: trainingApi,
        method: 'get',
        url: `/training?category=${state.level}`
    });

    useEffect(() => {
      if(response !== null){
          setData(response)
      }
    }, [response])
    console.log(response);
    
    const increment = (e, type) => {
      e.preventDefault()    
      setTraining({...training, [type] : training[type]+1})
    };
  
    const decrement = (e, type) => {
      e.preventDefault();
      if (training[type] > 0) {
        setTraining({ ...training, [type]: training[type] - 1 });
      }
    }

    
    const finder = data?.find(item => item.id === id)
    const onSubmitHandle = async (e) => {
      console.log('ds');
        e.preventDefault();
        const body = {title : '',
          introduction:training.introduction,
          imgFile : training.imgFile,
          workout:training.workout,
          duration:training.duration,
          category:training.category,
          title:training.title
        };
        if(window.confirm('Are you sure you want to submit?')){
            if(finder){
                await axios
                .put(`https://647612b1e607ba4797dd420e.mockapi.io/training/${id}`, body)
                .then(() => {
                    alert("Data edited successfully");
                    setTraining({
                        title : '',
                        introduction:'',
                        imgFile : null,
                        workout:0,
                        duration:0,
                        category:state.level
                    });
                    handleClose();
                    window.location.reload()
                    fetchData();
                })
                .catch((err) => {
                    console.log(err);
                });
            } else {
                await axios
                .post(`https://647612b1e607ba4797dd420e.mockapi.io/training`, body)
                .then(() => {
                    alert("Data added successfully");
                    window.location.reload()
                    handleClose()
                    fetchData();
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        };
    };
    const HandleDelete = async (id) => {
        await axios
        .delete(`https://647612b1e607ba4797dd420e.mockapi.io/training/${id}`)
        .then(() => {
            alert("Data deleted successfully!");
            fetchData();
        })
        .catch((e) => {
            console.log(e);
        });
    };
    const handleClose = () => {
        setShow(false);
        setTraining({
            title : '',
            introduction:'',
            imgFile : null,
            workout:0,
            duration:0,
            category:state.level
        });
        setId(null);
    };
    const generalView = () => {
        return (
        <>
            {isLoading ?
            
            <Loading />
            : 
            
            <div className="row mt-5 p-0 m-0 mb-5">
              {data?.length > 0 ? (
                  data?.map((item, id) => {
                  return (
                      <div key={id} className="col-md-4 col-12">
                      <CardTraining
                        navigate={() =>
                          navigate(
                            `/levelDetail/${state.level}/${item.id}/workoutDetail`,
                            {
                              state: {
                                workout: data.title,
                                level: state.level,
                              },
                            }
                          )
                        }
                          img={item.imgFile}
                          text={item.title}
                          onDelete={() => HandleDelete(item.id)}
                          onEdit={() => {
                              setShow(true);
                              setId(item.id);
                              console.log(item);
                              setTraining({
                                  title : item.title,
                                  introduction:item.introduction,
                                  imgFile : item.imgFile,
                                  workout:item.workout,
                                  duration:item.duration,
                                  category:item.category
                              });
                          }}
                      />
                      </div>
                  );
                  }))
                
            : (
                <p className="text-center mt-5">No data available</p>
            )}
            </div>
            }

            <Training
            show={show}
            handleClose={handleClose}
            countText={countText}
            title={(e) => {
              setTraining((filledState) => ({
                ...filledState,
                title: e.target.value,
              }));
            }}
            introduction={(e) => {
              setTraining((filledState) => ({
                ...filledState,
                introduction: e.target.value,
              }));
            }}
            imgFileChange={(e)=>{
              let image = e.target.files[0];
              if(image && image.type.match('image.*')){
                  const storageRef = ref(storage, `/files/${image.name}`)
                  const uploadImg = uploadBytesResumable(storageRef, image)
                  uploadImg.on(
                      'state_Changed',
                      (snapshot) => {
                          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                          setUploadingImg(percent)
                      },
                      (err) => {
                          console.log(err.message);
                      },
                      () => {
                          getDownloadURL(uploadImg.snapshot.ref)
                          .then(url =>{
                              setTraining({...training, imgFile:url})
                              setUploadingImg(0)
                          }) 
                          .catch(err => {
                              console.log(err.message);
                          })
                      }
                  )
              } else {
                  alert('please select an image file ( jpg, png, gif )')
                  e.target.value = null
                  image = e.target.value
              }
            }}
            titleValue={training.title}
            imgFileValue={training?.imgFile}
            introductionValue={training.introduction}
            workoutValue={training?.workout}
            durationValue={training?.duration}
            incrementDuration={(e) => increment(e, 'duration')}
            incrementWorkout={(e) => increment(e, 'workout')}
            decrementDuration={(e) => decrement(e, 'duration')}
            decrementWorkout={(e) => decrement(e, 'workout')}
            uploadingImg={uploadingImg}
            onSubmitHandle={onSubmitHandle}
            />
        </>
        );
    };
    return (
      <div className="container mt-5" id="container">
          <div
            className="container-fluid p-0 mb-5"
            style={{ backgroundColor: "var(--Neutral-White-0)" }}>
            <Cover
              img={imgCover}
              text={"Training"}
              list1={"Home"}
              list2={state.level}
            />            
                {isLoading ? (
                <Loading/>)
                : 
                (
                generalView()
                )}
          </div>
          <div style={{ position: "fixed", bottom: "5vw", right: "5vw" }}>
            <ButtonComponent
                // imgBtn={add}
                onClick={() => {
                  setShow(true);
                }}
                imgUrlEnd={add}
                imgClassName={'text-center pe-2'}
                className={"btn rounded-circle bg-popUp"}
            />
          </div>
      </div>
    );
};


export default LevelDetail;
