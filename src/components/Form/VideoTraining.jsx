import './Form.css'
import React, {useState} from "react";
import Button from 'react-bootstrap/Button'
import {Modal} from 'react-bootstrap'
import TextField from "../../elements/TextField/TextField";
import video from '../../assets/icons/videocam_gray.svg'
import Textarea from "../../elements/TextField/Textarea";

export default function VideoTraining({name, text, id, onChangeInput, valueInput, imgBtn, onClick,className}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [image, setImage] = useState()
  const [imageFile, setImageFile] = useState()

  const handleImg = (event) => {
    // setImage({[e.target.name] : e.target.files[0]})
    // console.log(image);
    // if (event.target.files && event.target.files[0]) {
    //     setImage({image: URL.createObjectURL(event.target.files[0])});
    //   }
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          setImageFile(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    if (event.target.name === "image"){
          setImage({[event.target.name] : URL.createObjectURL(event.target.files[0]).image})
      }
      console.log(image);
  }
    return(
        <>
            <style type="text/css">
                {
                    `
                    .btn-closebtn{
                        color: var(--primary-500);
                        border: 1px solid var(--primary-500);
                        border-radius:8px;
                        padding-right:34px;
                        padding-left:34px
                      }
                      
                      .btn-createbtn{
                        background-color: var(--primary-500);
                        color: var(--primary-100);
                        border-radius:8px;
                        padding-right:34px;
                        padding-left:34px
                      }
                      `
                }
            </style>
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
                <Modal.Title>New parts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {/* {body} */}
                <div className=" mb-4 box">
                    <label  
                        style={{
                            cursor:'pointer',
                        }}>
                            <div style={{marginBottom:'-230px'}}>

                            <img src={video} alt="" />
                            <p className="mt-3" style={{color:'var(--Neutral-White-800)'}}>Input Video</p>
                            </div>
                        <input 
                            type="file" 
                            onChange={handleImg} 
                            style={{
                                width:'100%', 
                                display:'none'
                            }} 
                            // value={image}
                            
                            name="image"
                        />
                        <img 
                            // width={'100%'} 
                            src={imageFile} 
                            height={'200px'}
                            style={{width:'fit-content'}} 
                            
                        alt="" />
                    </label>
                </div>
                    <TextField
                        placeholder={'Input title'}
                        type={'text'}
                        name={name}
                        id={id}
                        onChange={onChangeInput}
                        value={valueInput}
                    />
                    <div className="styleTextarea">
                        <Textarea
                        
                        classNameTextarea={'form-control rounded-3 borderInput'}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant='closebtn' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='createbtn' onClick={onClick}>Create</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}