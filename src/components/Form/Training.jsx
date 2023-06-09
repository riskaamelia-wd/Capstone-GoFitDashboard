import './Form.css'
import React, {useRef, useState} from "react";
import Button from 'react-bootstrap/Button'
import {Modal} from 'react-bootstrap'
import TextField from "../../elements/TextField/TextField";
import brokenImage from '../../assets/icons/broken_image_gray.svg'
import Textarea from "../../elements/TextField/Textarea";
import AddLess from "../AddLess/AddLess";
import { useDispatch } from "react-redux";
import { addTraining } from "../../redux/Slice/trainingSlice";

export default function Training({title, text, imgBtn, className }) {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    //   const [data, setData] = useState([])
    const [data, setData] = useState({
        title : '',
        introduction:'',
        imgFile : null,
        workout:0,
        duration:0
    })
    let countText = data.introduction.length
    const dispatch = useDispatch()


    const increment = (e, type) => {
        e.preventDefault()    
        const updatedData = ({...data, [type] : data[type]+1})
        console.log(updatedData);
        setData(updatedData)
      };
    
      const decrement = (e, type) => {
        e.preventDefault();
        if (data[type] > 0) {
          const updatedData = { ...data, [type]: data[type] - 1 };
          console.log(updatedData);
          setData(updatedData);
        }
      }
      
    const handleInput = (e) => {
        const {name, value} = e.target
        if(name === 'introduction'){
            setData({...data, [name] : value})
        }

        setData({...data, [name] : value})
        console.log(data, ' Data Training');
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure you want to submit?')){
            dispatch(addTraining(data))
            alert('Added')
            setShow(false)
        }

    }

    const handleImg = (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        setData((prevState) => ({
            ...prevState,
            imgFile: URL.createObjectURL(file)
        }));
        console.log(data.imgFile);
    }
    
    return(
        <>
            <Button 
                variant={className}
                onClick={handleShow}>
                <img src={imgBtn} alt="" />
                {text}
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBody">
                {/* {body} */}
                <form onSubmit={handleSubmit}>
                    <div className=" mb-4 box" style={{borderRadius:'20px'}}>
                        <label  
                            style={{
                                borderRadius:'20px',
                                cursor:'pointer',
                                backgroundImage:`url(${brokenImage})`,
                                backgroundRepeat:'no-repeat',
                                height:'fit-content',
                                width:'100%',
                                backgroundPosition:'center'
                            }}>
                            <input 
                                type="file" 
                                onChange={handleImg}         
                                name="image"
                            />
                            <img 
                                // width={'100%'} 
                                src={data.imgFile} 
                                height={'200px'}
                                style={{width:'fit-content'}} 
                                
                            alt="" />
                        </label>
                    </div>
                       

                        <TextField
                            placeholder={'Input title'}
                            type={'text'}
                            name={'title'}
                            id={'title'}
                            onChange={handleInput}
                            value={data.title}
                        />
                        <div>
                    
                        </div>
                        <div className="styleTextarea col-12 mt-4 m-0">
                            <Textarea
                                classNameLabel={'fw-semibold mb-3'}
                                label={'Introduction'}
                                name={'introduction'}
                                id={'introduction'}
                                classNameTextarea={'form-control rounded-3 borderInput'}
                                maxLength={200}
                                onChange={handleInput}
                                count={`${countText} / 200 word`}
                                // count={`${count} / 200 word`}
                            />
                        </div>
                        <div>
                        <p className="fw-semibold">Info</p>
                        <div className="row">
                            <div className="col-7">
                                <p>How long will it take?</p>
                                <div className="d-flex flex-row">
                                    <AddLess
                                        decrement={(e) => decrement(e, 'workout')}
                                        increment={(e) => increment(e, 'workout')}
                                        qty={data.workout}
                                    />
                                    <select className="form-select selectTextarea" aria-label="Default select example">
                                    <option selected value={'Minutes'}>Minutes</option>
                                    <option value="Hours">Hours</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-5">
                                <p>How much workouts?</p>
                                <AddLess
                                    decrement={(e) => decrement(e, 'duration')}
                                    increment={(e) => increment(e, 'duration')}
                                    qty={data.duration}   
                                />
                            </div>
                        </div>
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button 
                    variant={'btn me-4 fw-semibold'} 
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button 
                    variant={'btn fw-semibold'} 
                    onClick={handleSubmit}
                    type={"submit"}
                >
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}