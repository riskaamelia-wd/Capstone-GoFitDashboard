import React, {useState} from "react";
import Button from 'react-bootstrap/Button'
import {Modal} from 'react-bootstrap'
import TextField from "../../elements/TextField/TextField";
import brokenImage from '../../assets/icons/broken_image_gray.svg'
import './PopUp.css'
import Textarea from "../../elements/TextField/Textarea";
import AddLess from "../AddLess/AddLess";

export default function PopUpNewClass({body,name, text, id, onChangeInput, valueInput, imgBtn, btnText, onClick,className, classNameBtn, onChangeTeaxtarea, count, incrementLong, incrementMuch, decrementLong, decrementMuch, qtyLong, qtyMuch }) {
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
                <Modal.Body className="modalBody">
                {/* {body} */}
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
                    <div className="styleTextarea col-12 mt-4 m-0">
                        <Textarea
                            classNameLabel={'fw-semibold mb-3'}
                            label={'Introduction'}
                            name={'intro'}
                            id={'intro'}
                            classNameTextarea={'form-control rounded-3 borderInput'}
                            onChange={onChangeTeaxtarea}
                            count={`${count} / 200 word`}
                        />
                    </div>
                    <div>
                        <p className="fw-semibold">Info</p>
                        <div className="row">
                            <div className="col-7">
                                <p>How long will it take?</p>
                                <div className="d-flex flex-row">
                                    <AddLess
                                        decrement={decrementLong}
                                        increment={incrementLong}
                                        qty={qtyLong}
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
                                    decrement={decrementMuch}
                                    increment={incrementMuch}
                                    qty={qtyMuch}   
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant={'btn me-4 fw-semibold'} onClick={handleClose}>
                    Close
                </Button>
                <Button variant={'btn fw-semibold'} onClick={onClick}>Create</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}